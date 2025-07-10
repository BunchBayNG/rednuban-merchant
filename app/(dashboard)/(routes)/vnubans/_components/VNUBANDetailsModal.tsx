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
import Deactivate from "@/components/svg Icons/Deactivate";
import Reactivate from "@/components/svg Icons/Reactivate";
// import { useState } from "react";

interface VNUBAN {
  sN: number;
  customerName: string;
  vNUBAN: string;
  status: string;
  productPrefix: string;
  type: string;
  createdAt: string;
  email: string;
  creationIP: string;
  deviceInfo: string;
  processingTime: string;
}

interface VNUBANDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vNUBAN: VNUBAN | null;
  setSelectedVNUBAN: (vnuban: VNUBAN | null) => void;
  transactions: VNUBAN[];
  currentPage: number;
  totalElements: number;
  filters: { searchTerm: string; status: string };
}

export default function VNUBANDetailsModal({
  isOpen,
  onClose,
  vNUBAN,
  setSelectedVNUBAN,
  transactions,
}: VNUBANDetailsModalProps) {
  if (!vNUBAN || !isOpen) return null;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0] || "";
  };

  const handleExportDetails = () => {
    try {
      toast.success(`Export successful for vNUBAN ${vNUBAN.vNUBAN}! Check your downloads.`);
      console.log(`Mock export for vNUBAN ${vNUBAN.vNUBAN}`);
      onClose();
    } catch (error) {
      toast.error("Export failed. Please try again later.");
      console.error(error);
    }
  };

  const handleStatusChange = (newStatus: "Active" | "Inactive") => {
    try {
      toast.success(`vNUBAN ${newStatus.toLowerCase()}d successfully`);
      setSelectedVNUBAN({ ...vNUBAN, status: newStatus });
    } catch (error) {
      toast.error(`Failed to ${newStatus.toLowerCase()} vNUBAN`);
      console.error(error);
    }
  };

  const currentIndex = transactions.findIndex((t) => t.vNUBAN === vNUBAN.vNUBAN);
  const prevVNUBAN = currentIndex > 0 ? transactions[currentIndex - 1] : null;
  const nextVNUBAN = currentIndex < transactions.length - 1 ? transactions[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevVNUBAN) setSelectedVNUBAN(prevVNUBAN);
  };

  const handleNext = () => {
    if (nextVNUBAN) setSelectedVNUBAN(nextVNUBAN);
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
              <h2 className="text-sm font-semibold">vNUBAN Details</h2>
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
              vNUBAN: <span className="text-primary text-sm font-light">{vNUBAN.vNUBAN || "N/A"}</span>
            </span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePrev} disabled={!prevVNUBAN}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext} disabled={!nextVNUBAN}>
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
                  <AvatarImage src="/images/avatar-placeholder.jpg" alt={vNUBAN.customerName} />
                  <AvatarFallback>{getInitials(vNUBAN.customerName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{vNUBAN.customerName || "N/A"}</p>
                  <p className="text-xs text-gray-500">N/A</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Button className="bg-red-500 text-white hover:bg-red-600 ml-auto">View Profile</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-[#F5F5F5] dark:bg-card rounded-sm">
                      <BsThreeDots />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {vNUBAN.status === "Active" ? (
                      <>
                        <DropdownMenuItem onClick={() => handleStatusChange("Inactive")}>
                          <Deactivate /> Deactivate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportDetails}>
                          <Download /> Export Data
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={() => handleStatusChange("Active")}>
                          <Reactivate /> Reactivate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportDetails}>
                          <Download /> Export Data
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex justify-between text-sm border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-1">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Status</span>
                <span style={{ color: vNUBAN.status === "Active" ? "#4CAF50" : "#FF4444" }}>
                  {vNUBAN.status || "N/A"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Created At</span>
                <span>{vNUBAN.createdAt || "N/A"} WAT</span>
              </div>
            </div>
          </div>
          {/* vNUBAN Details */}
          <div className="space-y-4">
            <h3 className="text-xs text-gray-500">vNUBAN Details</h3>
            <div className="flex flex-col gap-4 text-sm">
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium">Product Prefix:</p>
                <span>{vNUBAN.productPrefix || "N/A"}</span>
              </span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium">Type:</p>
                <span>{vNUBAN.type || "N/A"}</span>
              </span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium">Email:</p>
                <span>{vNUBAN.email || "N/A"}</span>
              </span>
              <span className="flex gap-2">
                <p className="font-medium">Creation IP:</p>
                <span>{vNUBAN.creationIP || "N/A"}</span>
              </span>
            </div>
          </div>
          {/* Footer */}
          <div className="mt-auto pt-4 text-sm space-y-4">
            <h3 className="text-gray-500 text-xs">Footer</h3>
            <div>
              <span className="flex gap-2">
                <p className="font-medium">Device Info:</p>
                <span>{vNUBAN.deviceInfo || "N/A"}</span>
              </span>
              <span className="flex gap-2">
                <p className="font-medium">Processing Time:</p>
                <span>{vNUBAN.processingTime || "N/A"}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}