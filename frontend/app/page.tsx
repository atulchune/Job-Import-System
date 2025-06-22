import ImportLogsPage from "@/components/importLogsPage";
import { fetchImportLogs,fetchDashboardCardCounts } from "@/lib/api";
export default async function Home() {
   const ImportData = await fetchImportLogs(1,10);
   const CardData = await fetchDashboardCardCounts();
   console.log(ImportData,"ImportData",CardData,"CardData")
  return (
    <div>
      <ImportLogsPage importData={ImportData} CardData={CardData}/>
    </div>
  );
}
