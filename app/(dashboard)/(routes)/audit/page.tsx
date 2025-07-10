"use client";

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { ExportModal } from '../dashboard/_components/ExportModal';
import { MetricCard } from './_components/MetricCard';
import AuditTrailTable from './_components/AuditTrailTable';


interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative';
  period: string;
}

export default function AuditPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const secondaryMetrics: DashboardMetric[] = [
    {
      id: 'distinctive-vnubans',
      title: 'Total Entries',
      value: '0',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'pending-notifications',
      title: 'Unique Users',
      value: '0',
      change: 22.7,
      changeType: 'positive',
      period: 'Last 30 days'
    },
    {
      id: 'Recent Actions',
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
    { label: "Staff", value: "staff" },
    { label: "Activity", value: "activity" },
    { label: "Description", value: "description" },
    { label: "Status", value: "status" },
    { label: "Timestamp", value: "timestamp" },
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
        <h1 className="text-sm font-medium">Audit Trails</h1>

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
          </div>
          <Card >
            <CardContent>
              <AuditTrailTable />
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

