import jobQueue from './jobQueue.js';
import Job from '../models/Job.js'
import ImportLog from '../models/ImportLog.js'

let stats = {
  url:"",
  total: 0,
  inserted: 0,
  updated: 0,
  failed: 0,
  failedJobs: [],
};

jobQueue.process(async (job) => {
  stats.total++;
  try {
    const { jobid, title, link, pubDate, description, guid,api_url } = job.data;
    stats.url = api_url
    const result = await Job.updateOne(
      { jobid },
      { jobid, title, link, pubDate, description, guid },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      stats.inserted++;
    } else {
      stats.updated++;
    }

  } catch (err) {
    stats.failed++;
    stats.failedJobs.push({ job: job.data.jobid || job.data.guid, reason: err.message });
  }
});

// When queue is drained, log the import summary
jobQueue.on('drained', async () => {
  await ImportLog.create({
    url:stats.url,
    timestamp: new Date(),
    totalFetched: stats.total,
    totalImported: stats.inserted + stats.updated,
    newJobs: stats.inserted,
    updatedJobs: stats.updated,
    failedJobs: stats.failedJobs,
  });
  console.log('✅ Import Log saved!');
  stats = { total: 0, inserted: 0, updated: 0, failed: 0, failedJobs: [] };
});
