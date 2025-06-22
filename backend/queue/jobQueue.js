import Bull from 'bull';
import dotenv from 'dotenv';

dotenv.config();

const jobQueue = new Bull('job-import', process.env.REDIS_URL);

export default jobQueue;