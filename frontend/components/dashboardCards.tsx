import React from 'react'
import {
  RefreshCw,
  TrendingUp,
  Database,
  AlertCircle,
} from "lucide-react"
import { CardCounts } from '@/types/importRecord'
type Props = {
  CardData:CardCounts
}
const DashboardCards = ({CardData}:Props) => {
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{CardData?.totalFetched ?? 0}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Records</p>
                <p className="text-3xl font-bold text-green-600">{CardData?.newJobs ?? 0}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Updated</p>
                <p className="text-3xl font-bold text-orange-600">{CardData?.updatedJobs ?? 0}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <RefreshCw className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-3xl font-bold text-red-600">{CardData?.failedJobs ?? 0}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
  )
}

export default DashboardCards
