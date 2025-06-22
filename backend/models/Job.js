import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobid:String,
  guid: { type: String, unique: true },
  title: String,
  link: String,
  pubDate: Date,
  description: String,
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;