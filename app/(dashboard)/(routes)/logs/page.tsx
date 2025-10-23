"use client";

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { ExportModal } from '../dashboard/_components/ExportModal';
// import { LogsChart } from './_components/LogsChart'
import { ApiLogsTable } from './_components/ApiLogsTable';




export default function AuditPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);



  const fieldOptions = [
    { label: "S/N", value: "sN" },
    { label: "Customer", value: "customer" },
    { label: "vNUBAN", value: "vNUBAN" },
    { label: "Status", value: "status" },
    { label: "Total Value", value: "total value" },
    { label: "Total Transactions", value: "total transactions" },
    { label: "Last Activity", value: "last activity" },
    { label: "Action", value: "action" },
  ];

  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-medium">Api Logs</h1>

        <Button
          onClick={() => setIsExportModalOpen(true)}
          className=" hover:bg-[#A60000]  rounded-md"
        >
          Export
          <Download className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="max-w-7xl">
        <div className="space-y-6">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className='px-0'>
              <CardContent className='flex flex-col justify-between items-center h-full'>
                <div className=" w-full pb-8 h-[100px]">
                  <p className="text-xs text-[#A5A5A5]">Total Requests</p>
                  <h3 className="font-medium pt-3">1,234</h3>
                </div>
                <div className="border-t w-full pb-8 h-[100px]">
                  <p className="text-xs pt-3 text-[#A5A5A5]">Successful Requests</p>
                  <h3 className="font-medium pt-3">1,234</h3>
                </div>
                <div className="border-t w-full pb-8 h-[100px]">
                  <p className="text-xs pt-3 text-[#A5A5A5]">Average Response Time</p>
                  <h3 className="font-medium pt-3">245 ms</h3>
                </div>
              </CardContent>
            </Card>
            <LogsChart />
          </div> */}
          <div>
          </div>
          <Card >
            <CardContent>
              <ApiLogsTable />
            </CardContent>
          </Card>
        </div>
      </div>
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
       endpointPrefix="api-logs"
        fieldOptions={fieldOptions}
      />
    </div>
  )
}

