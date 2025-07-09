"use client";

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, {useState} from 'react'
import { MetricCard } from './_components/MetricCard';
import TransactionsChart from './_components/TransactionsChart';
import { Card, CardContent } from '@/components/ui/card';
import TransactionTable from './_components/TransactionTable';
import { ExportModal } from '../dashboard/_components/ExportModal';

interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative';
  period: string;
}

export default function TransactionPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const secondaryMetrics: DashboardMetric[] = [
    {
      id: 'distinctive-vnubans',
      title: 'Total Transactions',
      value: '0',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'pending-notifications',
      title: 'Successful Transactions',
      value: '0',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'successful-amount',
      title: 'Total Value Processed',
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
    { label: "Amount", value: "amount" },
    { label: "Status", value: "status" },
    { label: "Transaction ID", value: "transactionID" },
    { label: "Timestamp", value: "timestamp" },
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
        <h1 className="text-sm font-medium">Transactions</h1>
        <Button
          onClick={() => setIsExportModalOpen(true)}
          className=" hover:bg-[#A60000]  rounded-md"
        >
          Export
          <Download className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="max-w-7xl">
      <div className="space-y-8">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {secondaryMetrics.map((metric) => (
                    <MetricCard key={metric.id} metric={metric} />
                  ))}
                </div>
                <div>
            <TransactionsChart />
          </div>
          <Card >
      <CardContent>
      <TransactionTable />
      </CardContent>
      </Card>
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

