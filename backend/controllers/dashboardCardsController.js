import ImportLog from '../models/ImportLog.js';

export const getDashboardCardCounts = async (req, res) => {
  try {
    const logs = await ImportLog.find();

    let totalFetched = 0;
    let newJobs = 0;
    let updatedJobs = 0;
    let failedJobs = 0;

    logs.forEach((log) => {
      totalFetched += log.totalFetched || 0;
      newJobs += log.newJobs || 0;
      updatedJobs += log.updatedJobs || 0;
      failedJobs += (log.failedJobs?.length || 0);
    });

    res.status(200).json({
      totalFetched,
      newJobs,
      updatedJobs,
      failedJobs,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard counts', error: error.message });
  }
};
