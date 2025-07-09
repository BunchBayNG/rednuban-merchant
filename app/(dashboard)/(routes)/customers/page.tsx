"use client";

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, {useState} from 'react'
import { MetricCard } from './_components/MetricCard';
// import { Card, CardContent } from '@/components/ui/card';
import { ExportModal } from '../dashboard/_components/ExportModal';
import CustomerChart from './_components/CustomerChart';
import { FiUserPlus } from "react-icons/fi";


interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative';
  period: string;
}

export default function CustomerPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const secondaryMetrics: DashboardMetric[] = [
    {
      id: 'distinctive-vnubans',
      title: 'Total Customers ',
      value: '0',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'pending-notifications',
      title: 'Active vNUBANs',
      value: '0',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'successful-amount',
      title: 'Total Transaction Value by Customers',
      value: '₦0',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    }
  ];

  const fieldOptions = [
    ...secondaryMetrics.map((metric) => ({
      label: metric.title,
      value: metric.id,
    })),
    { label: "S/N", value: "sN" },
    { label: "Customer", value: "customer" },
    { label: "vNUBAN", value: "vNUBAN" },
    { label: "Status", value: "status" },
    { label: "Total Value", value: "total value" },
    { label: "Total Transactions", value: "total transactions" },
    { label: "Last Activity", value: "last activity" },
    { label: "Action", value: "action" },
  ];

  const handleExport = (data: {
    dateRangeFrom: string;
    dateRangeTo: string;
    format: string;
    fields: Record<string, boolean>;
  }) => {
    console.log("Export data:", data);
    // Placeholder: Integrate with backend to export data as CSV or Excel
  };

  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-medium">Customers</h1>

        <div  className="flex items-center space-x-2">
        <Button variant={"outline"}>Add Customer <FiUserPlus /></Button>
        <Button
          onClick={() => setIsExportModalOpen(true)}
          className=" hover:bg-[#A60000]  rounded-md"
        >
          Export
          <Download className="h-4 w-4 ml-2" />
        </Button>
        </div>
      </div>

      <div className="max-w-7xl">
      <div className="space-y-8">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {secondaryMetrics.map((metric) => (
                    <MetricCard key={metric.id} metric={metric} />
                  ))}
                </div>
                <div>
            <CustomerChart />
          </div>
          {/* <Card >
      <CardContent>
      <TransactionTable />
      </CardContent>
      </Card> */}
          </div>
          </div>
             <ExportModal
                  isOpen={isExportModalOpen}
                  onClose={() => setIsExportModalOpen(false)}
                  onExport={handleExport}
                  fieldOptions={fieldOptions}
                />
    </div>
  )
}

