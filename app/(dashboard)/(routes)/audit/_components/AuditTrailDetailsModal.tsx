"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Toaster, toast } from "sonner";


interface AuditLog {
  sN: number;
  staff: string;
  activity: string;
  description: string;
  status: string;
  timestamp: string;
  userType: string;
  merchantName: string;
  merchantId: string;
}

interface AuditTrailDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: AuditLog | null;
  setSelectedLog: (log: AuditLog | null) => void;
  logs: AuditLog[];
}

export default function AuditTrailDetailsModal({ isOpen, onClose, log, setSelectedLog, logs }: AuditTrailDetailsModalProps) {
  if (!log || !isOpen) return null;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  const handleExportDetails = () => {
    try {
      toast.success(`Export successful for Log S/N ${log.sN}! Check your downloads.`);
      console.log(`Mock export for Log S/N ${log.sN}`);
      onClose();
    } catch (error) {
      toast.error("Export failed. Please try again later.");
      console.error(error);
    }
  };

  const currentIndex = logs.findIndex((l) => l.sN === log.sN);
  const prevLog = currentIndex > 0 ? logs[currentIndex - 1] : null;
  const nextLog = currentIndex < logs.length - 1 ? logs[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevLog) setSelectedLog(prevLog);
  };

  const handleNext = () => {
    if (nextLog) setSelectedLog(nextLog);
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
              <h2 className="text-sm font-semibold">Audit Trail Details</h2>
              <p className="text-xs text-gray-500 mb-4">Get complete oversight on platform operations</p>
            </div>
            <div>
              <Button variant="ghost" className="p-0 h-auto" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between border-b border-[#F8F8F8] dark:border-[#2A2A2A] py-3">
            <span className="text-red-500 font-medium text-sm">
              S/N: <span className="text-primary text-sm font-light">{log.sN}</span>
            </span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePrev} disabled={!prevLog}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext} disabled={!nextLog}>
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
                  <AvatarFallback>{getInitials(log.staff)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{log.staff}</p>
                  <p className="text-xs text-gray-500">{log.staff.toLowerCase().replace(/\s/g, '') + "@gmail.com"}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Button className="bg-red-500 text-white hover:bg-red-600">View Profile</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-[#F5F5F5] dark:bg-card rounded-sm">
                      <BsThreeDots />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem><Eye /> Log Audit Trail</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportDetails}><Download /> Export Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex justify-between text-sm border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-1">
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Activity</span><span>{log.activity}</span></div>
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Status</span><span style={{ color: log.status === "Succeeded" ? "#4CAF50" : "#FF4444" }}>{log.status}</span></div>
            </div>
          </div>
          {/* Transaction Details */}
          <div className="space-y-4">
            <h3 className="text-xs text-gray-500">Transaction Details</h3>
            <div className="flex flex-col gap-4 text-sm">
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">Timestamp:</p><span>{log.timestamp}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">Description:</p><span>{log.description}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">User Type:</p><span>{log.userType}</span></span>
              <span className="flex gap-2"><p className="font-medium">Merchant Name:</p><span>{log.merchantName}</span></span>
              <span className="flex gap-2"><p className="font-medium">Merchant ID:</p><span>{log.merchantId}</span></span>
            </div>
          </div>
          {/* Footer */}
          <div className="space-y-4 pt-6">
            <h3 className="text-xs text-gray-500">Footer</h3>
            <div>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] text-sm pb-2"><p className="font-medium">Last Recorded:</p><span>{log.timestamp}</span></span>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}