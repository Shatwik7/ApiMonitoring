import { Kafka } from "kafkajs";

export class Kafka2 extends Kafka{
    
    async checkTopicsAndPartitions() {
        const admin = this.admin();
        await admin.connect();
      
        const topic = 'api-monitoring-tasks';
        const topics = await admin.listTopics();
      
        if (!topics.includes(topic)) {
          await admin.createTopics({
            topics: [
              {
                topic,
                numPartitions: 2,
                replicationFactor: 1,
              },
            ],
          });
          console.log(`Topic ${topic} created with 2 partitions.`);
        } else {
          // Check the number of partitions for the existing topic
          const metadata = await admin.fetchTopicMetadata({ topics: [topic] });
          const partitionCount = metadata.topics[0].partitions.length;
      
          if (partitionCount < 2) {
            console.warn(
              `Topic ${topic} has ${partitionCount} partitions, but 2 are required.`
            );
            console.log('Updating the number of partitions...');
            await admin.createPartitions({
              topicPartitions: [
                {
                  topic,
                  count: 2,
                },
              ],
            });
            console.log(`Topic ${topic} updated to 2 partitions.`);
          } else {
            console.log(`Topic ${topic} already has ${partitionCount} partitions.`);
          }
        }
      
        await admin.disconnect();
      }
      
}
