import ImportLogsPage from "@/components/importLogsPage";
import { fetchImportLogs,fetchDashboardCardCounts } from "@/lib/api";
export default async function Home() {
   const ImportData = await fetchImportLogs(1,10);
   const CardData = await fetchDashboardCardCounts();
  return (
    <div>
      <ImportLogsPage importData={ImportData} CardData={CardData}/>
    </div>
  );
}
