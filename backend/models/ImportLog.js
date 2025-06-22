import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  url:String,
  timestamp: Date,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [{ job: String, reason: String }]
});

const ImportLog = mongoose.model('ImportLog', logSchema, 'import_logs');

export default ImportLog;