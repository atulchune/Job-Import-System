import axios from 'axios';
import { parseXmlToJson } from '../utils/parseXml.js';
import jobQueue from '../queue/jobQueue.js';

const feeds = [
  'https://jobicy.com/?feed=job_feed',
  'https://jobicy.com/?feed=job_feed&job_categories=data-science',
  'https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time',
  'https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france',
  'https://jobicy.com/?feed=job_feed&job_categories=design-multimedia',
  'https://jobicy.com/?feed=job_feed&job_categories=copywriting',
  'https://jobicy.com/?feed=job_feed&job_categories=business',
  'https://jobicy.com/?feed=job_feed&job_categories=management',
  // 'https://www.higheredjobs.com/rss/articleFeed.cfm',
];

// Helper: Normalize XML fields like { '#text': '...' } to simple strings
const normalizeValue = (val) => {
  if (typeof val === 'object' && val !== null && '#text' in val) {
    return val['#text'];
  }
  return val;
};

// Helper: Convert string to Date, or return null if invalid
const normalizeDate = (val) => {
  const parsed = new Date(val);
  return isNaN(parsed.getTime()) ? null : parsed;
};

// Clean and normalize job object
const cleanJob = (job,url) => {
  return {
    api_url:normalizeValue(url),
    jobid: normalizeValue(job.id),
    guid: normalizeValue(job.guid),
    title: normalizeValue(job.title),
    link: normalizeValue(job.link),
    pubDate: normalizeDate(job.pubDate),
    description: normalizeValue(job.description),
    creator: normalizeValue(job['dc:creator'] || job.creator),
    category: Array.isArray(job.category)
      ? job.category.map(normalizeValue)
      : job.category
        ? [normalizeValue(job.category)]
        : [],
    content: normalizeValue(job['content:encoded'] || job.content),
  };
};

const fetchJobsFromFeeds = async () => {
  let allJobs = [];

  for (const url of feeds) {
    try {
      const xml = (await axios.get(url)).data;
      const json = await parseXmlToJson(xml);

      const jobs = json.rss?.channel?.item || [];

      // Normalize each job item
      const cleanedJobs = jobs.map(job => cleanJob(job, url));
      for (const job of cleanedJobs) {
        await jobQueue.add(job);
      }
      allJobs.push(...cleanedJobs);
    } catch (err) {
      console.error(`❌ Error fetching from ${url}:`, err.message);
    }
  }
  // console.log(allJobs, "allJobs")
  // for (const job of allJobs) {
  //   await jobQueue.add(job);
  // }

  return allJobs;
};

export default fetchJobsFromFeeds;
