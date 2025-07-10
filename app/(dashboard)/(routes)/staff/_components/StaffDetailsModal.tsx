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

interface Staff {
  sN: number;
  fullName: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  ipAddress: string;
  deviceInfo: string;
  lastUpdated: string;
}

interface StaffDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff | null;
  setSelectedStaff: (staff: Staff | null) => void;
  staffList: Staff[];
}

export default function StaffDetailsModal({
  isOpen,
  onClose,
  staff,
  setSelectedStaff,
  staffList,
}: StaffDetailsModalProps) {
  if (!staff || !isOpen) return null;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0] || "";
  };

  const handleExportDetails = () => {
    try {
      toast.success(`Export successful for ${staff.fullName}! Check your downloads.`);
      console.log(`Mock export for ${staff.fullName}`);
      onClose();
    } catch (error) {
      toast.error("Export failed. Please try again later.");
      console.error(error);
    }
  };

  const currentIndex = staffList.findIndex((s) => s.sN === staff.sN);
  const prevStaff = currentIndex > 0 ? staffList[currentIndex - 1] : null;
  const nextStaff = currentIndex < staffList.length - 1 ? staffList[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevStaff) setSelectedStaff(prevStaff);
  };

  const handleNext = () => {
    if (nextStaff) setSelectedStaff(nextStaff);
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
              <h2 className="text-sm font-semibold">Staff Details</h2>
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
              S/N: <span className="text-primary text-sm font-light">{staff.sN}</span>
            </span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePrev} disabled={!prevStaff}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext} disabled={!nextStaff}>
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
                  <AvatarImage src="/images/avatar-placeholder.jpg" alt={staff.fullName} />
                  <AvatarFallback>{getInitials(staff.fullName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{staff.fullName}</p>
                  <p className="text-xs text-gray-500">{staff.email}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Button className="bg-red-500 text-white hover:bg-red-600 ml-auto">Edit Profile</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-[#F5F5F5] dark:bg-card rounded-sm">
                      <BsThreeDots />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleExportDetails}>
                      <Download /> Export Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex justify-between text-sm border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-1">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Role</span>
                <span>{staff.role}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Status</span>
                <span style={{ color: staff.status === "Enabled" ? "#4CAF50" : "#FF4444" }}>
                  <span className="w-2 h-2 rounded-full mr-2 inline-block" style={{ backgroundColor: staff.status === "Enabled" ? "#4CAF50" : "#FF4444" }} />
                  {staff.status}
                </span>
              </div>
            </div>
          </div>
          {/* Staff Details */}
          <div className="space-y-4">
            <h3 className="text-xs text-gray-500">Staff Details</h3>
            <div className="flex flex-col gap-4 text-sm">
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium">Last Login:</p>
                <p>{staff.lastLogin}</p>
              </span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium">IP Address:</p>
                <p>{staff.ipAddress}</p>
              </span>
              <span className="flex gap-2">
                <p className="font-medium">Device Info:</p>
                <p>{staff.deviceInfo}</p>
              </span>
            </div>
          </div>
          {/* Footer */}
          <div className="mt-auto pt-4 text-sm space-y-4">
            <h3 className="text-gray-500 text-xs">Footer</h3>
            <div>
              <span className="flex gap-2">
                <p className="font-medium">Last Updated:</p>
                <p>{staff.lastUpdated}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}