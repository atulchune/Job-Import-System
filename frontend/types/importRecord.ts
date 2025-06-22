export interface FailedJob {
  job: string;
  reason: string;
}

export interface ImportLog {
  _id: string;
  timestamp: string; 
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: FailedJob[];
  __v: number;
  url:string;
}
export interface ImportLogsResponse {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  perPage: number;
  data: ImportLog[];
}

export interface CardCounts {
    totalFetched: number,
    newJobs: number,
    updatedJobs: number,
    failedJobs: number

}