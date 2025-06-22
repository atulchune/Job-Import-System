import { fetcher } from './fetcher';

export const fetchImportLogs = async (page:number,limit:number) => {
  return fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/import_logs?page=${page}&limit=${limit}`);
};
export const fetchDashboardCardCounts = async () => {
  return fetcher(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard_counts`);
};
