"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Toaster, toast } from "sonner";
import { useState } from "react";

interface ApiLog {
  sN: number;
  logId: string;
  merchantCode: string;
  requestTimestamp: string;
  responseTimestamp: string;
  service: string;
  responseStatus: number;
  timestamp: string;
  user: string;
  email: string;
  transactionReference: string;
  customerReference: string;
  clientIP: string;
  requestPayload: string;
  responseBody: string;
}

interface ApiLogDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: ApiLog | null;
  setSelectedLog: (log: ApiLog | null) => void;
  logs: ApiLog[];
}

export default function ApiLogDetailsModal({
  isOpen,
  onClose,
  log,
  setSelectedLog,
  logs,
}: ApiLogDetailsModalProps) {
  const [isPayloadOpen, setIsPayloadOpen] = useState(false);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  if (!log || !isOpen) return null;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 
      ? names[0][0] + names[names.length - 1][0] 
      : names[0][0];
  };

  const currentIndex = logs.findIndex((l) => l.logId === log.logId);
  const prevLog = currentIndex > 0 ? logs[currentIndex - 1] : null;
  const nextLog = currentIndex < logs.length - 1 ? logs[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevLog) {
      setSelectedLog(prevLog);
    }
  };

  const handleNext = () => {
    if (nextLog) {
      setSelectedLog(nextLog);
    }
  };

  const handleExportDetails = async () => {
    if (!log) return;
    
    setExportLoading(true);
    try {
      // Call your export API endpoint
      const response = await fetch('/api/reports/api-logs/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logId: log.logId,
          // Include any other necessary parameters
        }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Handle the export response - this could be a download link or blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `api-log-${log.logId}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(`Export successful for Log ID ${log.logId}`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Export failed. Please try again later.");
    } finally {
      setExportLoading(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return timestamp;
    }
  };

  // Format JSON for display if possible
  const formatJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return jsonString; // Return as-is if not valid JSON
    }
  };

  // Get status color
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "#4CAF50";
    if (status >= 400 && status < 500) return "#FF8C00";
    if (status >= 500 && status < 600) return "#FF4444";
    return "#000000";
  };

  return (
    <div className="fixed inset-0 z-[50] flex justify-end my-3 mr-3">
      <div
        className="fixed inset-0 bg-[#140000B2] backdrop-blur-xs dark:bg-black/50"
        onClick={onClose}
      />
      <div
        className="h-full w-[45%] bg-background shadow-lg overflow-x-auto transform transition-transform duration-300 ease-in-out rounded-xl"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#F8F8F8] dark:border-[#2A2A2A]">
            <div className="flex flex-col gap-0">
              <h2 className="text-sm font-semibold">API Log Details</h2>
              <p className="text-xs text-gray-500 mb-4">Get complete oversight on platform operations</p>
            </div>
            <div>
              <Button variant="ghost" className="p-0 h-auto" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between border-b border-[#F8F8F8] dark:border-[#2A2A2A] py-3">
            <span className="text-red-500 font-medium text-sm">
              Log ID: <span className="text-primary text-sm font-light">{log.logId}</span>
            </span>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrev} 
                disabled={!prevLog}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNext} 
                disabled={!nextLog}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-4 py-3">
            <h3 className="text-xs text-gray-500">Summary Section</h3>
            <div className="flex items-center justify-between space-x-1 pb-5 border-b border-[#F8F8F8] dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <Avatar className="w-13 h-13">
                  <AvatarImage src="/images/avatar-placeholder.jpg" alt="User Avatar" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getInitials(log.user)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{log.user}</p>
                  <p className="text-xs text-gray-500">{log.email}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Button 
                  className="hover:bg-red-600 ml-auto"
                  onClick={() => console.log("View profile:", log.user)}
                >
                  View Profile
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-[#F5F5F5] dark:bg-card rounded-sm">
                      <BsThreeDots />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem 
                      onClick={handleExportDetails}
                      disabled={exportLoading}
                    >
                      <Download className="w-4 h-4 mr-2" /> 
                      {exportLoading ? "Exporting..." : "Export Details"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex justify-between text-sm border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-1">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Merchant Code</span>
                <span className="font-medium">{log.merchantCode}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Response Status</span>
                <span 
                  className="font-medium"
                  style={{ color: getStatusColor(log.responseStatus) }}
                >
                  {log.responseStatus}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Service</span>
                <span className="font-medium">{log.service}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Request Timestamp</span>
                <span className="font-medium">{formatTimestamp(log.requestTimestamp)}</span>
              </div>
            </div>
          </div>

          {/* Log Details */}
          <div className="space-y-4">
            <h3 className="text-xs text-gray-500">Log Details</h3>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex justify-between border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium">Response Timestamp:</p>
                <p>{formatTimestamp(log.responseTimestamp)}</p>
              </div>
              <div className="flex justify-between border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium">Transaction Reference:</p>
                <span className="font-mono text-xs">{log.transactionReference}</span>
              </div>
              <div className="flex justify-between border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium">Customer Reference:</p>
                <span className="font-mono text-xs">{log.customerReference}</span>
              </div>
            </div>
          </div>

          {/* Additional Metadata */}
          <div className="space-y-4 mt-6">
            <h3 className="text-xs text-gray-500">Additional Metadata</h3>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex justify-between">
                <p className="font-medium">Client IP:</p>
                <span className="font-mono text-xs">{log.clientIP}</span>
              </div>
              
              {/* Request Payload */}
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-normal pl-3 pr-10 py-2 border rounded-md text-sm bg-[#F8F8F8] dark:bg-gray-700"
                  onClick={() => setIsPayloadOpen(!isPayloadOpen)}
                >
                  <span>Request Payload</span>
                  <span className="ml-auto">{isPayloadOpen ? "▼" : "▶"}</span>
                </Button>
                {isPayloadOpen && (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto max-h-60 overflow-y-auto">
                    {formatJson(log.requestPayload)}
                  </pre>
                )}
              </div>

              {/* Response Body */}
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-normal pl-3 pr-10 py-2 border rounded-md text-sm bg-[#F8F8F8] dark:bg-gray-700"
                  onClick={() => setIsResponseOpen(!isResponseOpen)}
                >
                  <span>Response Body</span>
                  <span className="ml-auto">{isResponseOpen ? "▼" : "▶"}</span>
                </Button>
                {isResponseOpen && (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-x-auto max-h-60 overflow-y-auto">
                    {formatJson(log.responseBody)}
                  </pre>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 text-sm space-y-4">
            <h3 className="text-gray-500 text-xs">Footer</h3>
            <div>
              <div className="flex justify-between">
                <p className="font-medium">Last Updated:</p>
                <span>{formatTimestamp(log.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}