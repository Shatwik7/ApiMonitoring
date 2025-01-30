import { Prisma, PrismaClient } from '@prisma/client';
import { splitIntoChunks } from './utils/splitIntoChunks';
import { Kafka2 } from './kafka/init';
import cron from 'node-cron';
import { error } from 'console';


const prisma = new PrismaClient();
const kafka = new Kafka2({
  clientId: 'scheduler-service',
  brokers: ['localhost:9093'],
});

/**
 * Interface for the API object.
 */
interface API {
  id: number;
  url: string;
  checkInterval: number;
  nextCheck: Date | null;
  live: boolean;
  userId: number;
  statusCode: number | null;
  request_timeout: number | null;
  domainExpiration: boolean | null;
  sslExpiration: boolean | null;
}


const producer = kafka.producer();


/**
 * Batch size for fetching API data from the database.
 */
const BATCH_SIZE =parseInt(process.env.BATCH_SIZE||"1000");

/**
 * Function to get the API data from the database based on the nextCheck.
 * @returns Array of API objects to process.
 */
async function getApi() : Promise<API[]> {
  try{
    const apiBatch = await prisma.aPI.findMany({
      select: {
        id: true,
        url: true,
        checkInterval: true,
        nextCheck: true,
        live :true,
        userId: true,
        method:true,
        statusCode: true,
        request_timeout: true,
        domainExpiration :true,  
        sslExpiration:true
      },
      where: { 
        OR:[
          {nextCheck: { lte: new Date() }},
          { nextCheck: null }
        ] 
      },
      take: BATCH_SIZE,
    });
    return apiBatch;
  }
  catch(error){
    console.error(error);
    throw error;
  }
}

/**
 * Updates the `nextCheck` field for a batch of APIs based on their `checkInterval`.
 * @param apiBatch - Array of API objects to update.
 */
async function updateNextCheck(apiBatch: API[]) {
  try {
    await prisma.$transaction(
      async (prisma) => {
        for (const api of apiBatch) {
          const nextCheck = new Date();
          nextCheck.setSeconds(nextCheck.getSeconds() + api.checkInterval);
          const result=await prisma.aPI.update({
            where: { id: api.id },
            data: { nextCheck:nextCheck },
          });
        }
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000, 
        timeout: 10000,
      }
    );
  } catch (error) {
    console.error('Error in bulk update transaction:', error);
  }
}



/**
 * Function to send the API data batch to Kafka
 * @param batch - Array of API objects to send to worker through Kafka.
 */
async function sendMessage(batch:API[]) {
  if(batch.length===0) return;
  const chunks=splitIntoChunks(batch,2);
  const messages = chunks.map((chunk,index) => ({
    value: JSON.stringify(chunk),
    partiton:index
  }));
  await producer.send({
    topic: 'api-monitoring-tasks',
    messages  : messages,
  });
  console.log(`Sent batch of ${batch.length} API URLs to Kafka`);
}

/**
 * Main function to start the scheduler.
 */
async function startScheduler() {
  await producer.connect();
  kafka.checkTopicsAndPartitions();
  console.log('Scheduler started, pushing API URLs to Kafka...');
  process.on('SIGINT', async () => {
    console.log('Shutting down scheduler...');
    await producer.disconnect();
    await prisma.$disconnect();
    process.exit(0);
  });
  const apiUrls = await getApi();
  if(apiUrls.length===0) return;
  await sendMessage(apiUrls);
  await updateNextCheck(apiUrls);
  producer.disconnect();
}


const job=cron.schedule("*/10 * * * * *", async function() {
  console.log('  \u001b[32m PROCESS START \u001b[30m ')
  try{
    await startScheduler();
  }catch(error){
    console.log(error);
    job.stop();
  }
});