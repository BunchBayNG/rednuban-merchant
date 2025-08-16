"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React, { useState } from "react";
import { MerchantsChart } from "./_components/MerchantCard";
import { TransactionFlowChart } from "./_components/TransactionFlowChart";
// import RevenueChart from "./_components/RevenueChart";
import { ExportModal } from "./_components/ExportModal";
import TransactionTable from "../transactions/_components/TransactionTable";
import { MetricCard } from "./_components/ MetricCard";
import { Card, CardContent } from "@/components/ui/card";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: "positive" | "negative";
  period: string;
}

export default function DashboardPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const secondaryMetrics: DashboardMetric[] = [
    {
      id: "distinctive-vnubans",
      title: "Total Distinctive vNUBANs",
      value: "0",
      change: 22.7,
      changeType: "positive",
      period: "Last 30 days",
    },
    {
      id: "generated-vnubans",
      title: "Total vNUBANs",
      value: "0",
      change: 22.7,
      changeType: "positive",
      period: "Last 30 days",
    },
    {
      id: "processed-transactions",
      title: "Processed Transactions Value",
      value: "₦0",
      change: 22.7,
      changeType: "positive",
      period: "Last 30 days",
    },
    {
      id: "active-vnubans",
      title: "Total Dynamic vNUBANs",
      value: "₦0",
      change: 22.7,
      changeType: "positive",
      period: "Last 30 days",
    },
  ];

  const fieldOptions = [
    ...secondaryMetrics.map((metric) => ({
      label: metric.title,
      value: metric.id,
    })),
    { label: "Merchants vNUBAN Summary", value: "merchantsVNUBANSummary" },
    { label: "Merchants Total Transaction Flow", value: "merchantsTotalTransactionFlow" },
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
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <div className="max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-sm font-medium">Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setIsExportModalOpen(true)} className="">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {secondaryMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MerchantsChart />
            <TransactionFlowChart />
          </div>
          <div>
            
          </div>
          <Card >
      <CardContent>
      <div className="flex justify-between items-center font-medium mb-2">
              <h3 className="text-sm">Recent Transactions</h3>
              <Link href="/transactions" className="text-[#C80000] flex items-center gap-1">View All <IoIosArrowForward/></Link>
            </div>
      <TransactionTable dashboardMode={true} />
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
  );
}