"use client"
import React, { useEffect } from 'react'
import { useState } from "react"
import { CardCounts, ImportLogsResponse } from '@/types/importRecord'
import DashboardCards from './dashboardCards'
import Pagination from './pagenation'
import { fetchImportLogs } from '@/lib/api'
type Props = {
    importData: ImportLogsResponse
    CardData: CardCounts
}
const ImportLogsPage = ({ importData, CardData }: Props) => {
    const [importHistory, setImportHistory] = useState<ImportLogsResponse>(importData)
    const [currentPage, setCurrentPage] = useState<number>(1);
    useEffect(() => {
        const getLogs = async () => {
            try {
                const data:ImportLogsResponse = await fetchImportLogs(currentPage, 10);
                setImportHistory(data);
            } catch (error) {
                console.error('Failed to fetch import logs', error);
            }
        };
        getLogs();
    }, [currentPage]);
    return (
        <div>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-900">Job Import System</h1>
                    <p className="text-gray-600 mt-1">Monitor and manage job data imports from external APIs</p>
                </div>
                <div className='m-5'>
                    <DashboardCards CardData={CardData} />
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 m-5 px-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Import History</h2>
                            <p className="text-gray-600 text-sm mt-1">Track all job import operations and their results</p>
                    </div>
                    <div className="h-screen overflow-y-scroll">
                        <table className="w-full h-screen overflow-y-scroll">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        File Name / URL
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        New
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Updated
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Failed
                                    </th>
                                </tr>
                            </thead>
                            {
                                importHistory?.data?.length > 0 ?
                                    <tbody className="bg-white h-screen divide-y divide-gray-200 overflow-y-scroll">
                                        {
                                            importHistory && importHistory?.data.map((record) => (
                                                <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <div className="text-sm font-medium text-gray-900 ">{record.url}</div>
                                                            <div className="text-xs text-gray-500 truncate ">{record._id}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{record.totalFetched}</td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{record.newJobs}</td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-orange-600">{record.updatedJobs}</td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-red-600">{record.failedJobs.length}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    :
                                    <tbody className=" h-8 divide-gray-200 overflow-y-scroll">
                                        <tr className="hover:bg-gray-50 transition-colors h-8">
                                            <td
                                                className="px-6 py-4 text-sm font-semibold text-red-600 text-center"
                                                colSpan={5}
                                            >
                                                No records found.
                                            </td>
                                        </tr>
                                    </tbody>
                            }
                        </table>
                    </div>
                    <div className='m-5'>
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} record_per_page={importData?.data?.length} total_event_list={importData?.totalRecords} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImportLogsPage
