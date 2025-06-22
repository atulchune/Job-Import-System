import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './utils/db.js';
import fetchJobsFromFeeds from './utils/fetchJobs.js';
import startCron from './cron.js';
import './queue/jobWorker.js'; // Start the Bull queue worker
import importLogRoutes from './routes/importLogRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/', importLogRoutes);
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    // Start job fetch and cron schedule
    await fetchJobsFromFeeds(); // Initial fetch
    startCron(); 

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
