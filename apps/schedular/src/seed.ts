import { PrismaClient } from '@prisma/client';
import { HttpMethod } from "@prisma/client";
const prisma = new PrismaClient();

async function seedAPIs() {
  const apiData = [];

  for (let i = 0; i < 500; i++) {
    const checkInterval = 30
    const lastCheck = new Date()
    const nextCheck = new Date(lastCheck.getTime() + checkInterval * 1000);

    apiData.push({
      url: 'https://agribazar-1.onrender.com',
      name: `api${i+1}`,
      checkInterval,
      lastCheck,
      nextCheck,
      method: HttpMethod.GET,
      live: true,
      lastLive: new Date(),
      userId: 1,
    });
  }

  console.log('Seeding 500 APIs...');
  await prisma.aPI.createMany({
    data: apiData,
    skipDuplicates: true,
  });

  console.log('Seeding complete.');
  await prisma.$disconnect();
}

seedAPIs().catch((error) => {
  console.error('Error during seeding:', error);
  prisma.$disconnect();
  process.exit(1);
});
