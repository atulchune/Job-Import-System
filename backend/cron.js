import cron from "node-cron"
import fetchJobsFromFeeds from './utils/fetchJobs.js'

const startCron = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('🔁 Starting job fetch...');
    await fetchJobsFromFeeds();
  });
//   cron.schedule('*/2 * * * *', async () => {
//   console.log('⏰ Running scheduled job import...');
//   await fetchJobsFromFeeds();
// });
};
export default startCron;