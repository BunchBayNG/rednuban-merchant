"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

// Updated Staff interface to match API response
interface Staff {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  userType: string;
  phoneNumber: string;
  logoUrl: string;
  enabled: boolean;
  invitedUser: boolean;
  // Additional fields for table display
  sN: number;
  fullName: string;
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
    return names.length > 1 
      ? names[0][0] + names[names.length - 1][0] 
      : names[0][0] || "";
  };

  const handleExportDetails = () => {
    try {
      // Create export data with all staff information
      const exportData = {
        "Staff ID": staff.id,
        "Full Name": staff.fullName,
        "Email": staff.email,
        "Username": staff.username,
        "Role": staff.role,
        "Status": staff.status,
        "Phone Number": staff.phoneNumber,
        "Last Login": staff.lastLogin,
        "IP Address": staff.ipAddress,
        "Device Info": staff.deviceInfo,
        "Last Updated": staff.lastUpdated,
        "Invited User": staff.invitedUser ? "Yes" : "No",
      };

      // Convert to CSV format
      const csvContent = Object.entries(exportData)
        .map(([key, value]) => `${key},${value}`)
        .join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `staff-details-${staff.username}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success(`Export successful for ${staff.fullName}! Check your downloads.`);
      console.log(`Export completed for ${staff.fullName}`);
    } catch (error) {
      toast.error("Export failed. Please try again later.");
      console.error("Export error:", error);
    }
  };

  const handleToggleStatus = async () => {
    try {
      // You'll need to implement the actual API call here
      console.log(`Toggling status for staff ${staff.id} from ${staff.enabled}`);
      
      // Mock API call - replace with actual implementation
      // const response = await fetch(`/api/v1/users/toggle-status`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     staffId: staff.id,
      //     enabled: !staff.enabled,
      //   }),
      // });

      // if (response.ok) {
      //   toast.success(`Staff ${!staff.enabled ? 'enabled' : 'disabled'} successfully!`);
      //   onClose(); // Close modal after successful operation
      // } else {
      //   throw new Error('Failed to update status');
      // }

      toast.success(`Staff ${!staff.enabled ? 'enabled' : 'disabled'} successfully!`);
      onClose();
    } catch (error) {
      toast.error("Failed to update staff status. Please try again.");
      console.error("Toggle status error:", error);
    }
  };

  const currentIndex = staffList.findIndex((s) => s.id === staff.id);
  const prevStaff = currentIndex > 0 ? staffList[currentIndex - 1] : null;
  const nextStaff = currentIndex < staffList.length - 1 ? staffList[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevStaff) setSelectedStaff(prevStaff);
  };

  const handleNext = () => {
    if (nextStaff) setSelectedStaff(nextStaff);
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "N/A";
    // Simple formatting - you can enhance this based on your needs
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
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

          {/* Navigation and Serial Number */}
          <div className="flex justify-between border-b border-[#F8F8F8] dark:border-[#2A2A2A] py-3">
            <span className="text-red-500 font-medium text-sm">
              S/N: <span className="text-primary text-sm font-light">{staff.sN}</span>
            </span>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrev} 
                disabled={!prevStaff}
                className="disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNext} 
                disabled={!nextStaff}
                className="disabled:opacity-50"
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
                  <AvatarImage 
                    src={staff.logoUrl || "/images/avatar-placeholder.jpg"} 
                    alt={staff.fullName} 
                  />
                  <AvatarFallback>{getInitials(staff.fullName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{staff.fullName}</p>
                  <p className="text-xs text-gray-500">{staff.email}</p>
                  <p className="text-xs text-gray-500">@{staff.username}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Button 
                  className="bg-red-500 text-white hover:bg-red-600 ml-auto"
                  onClick={() => console.log("Edit profile", staff.id)}
                >
                  Edit Profile
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-[#F5F5F5] dark:bg-card rounded-sm">
                      <BsThreeDots />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleExportDetails}>
                      <Download className="w-4 h-4 mr-2" /> Export Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleToggleStatus}>
                      <Eye className="w-4 h-4 mr-2" /> 
                      {staff.enabled ? 'Disable' : 'Enable'} Staff
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
                <span style={{ color: staff.enabled ? "#4CAF50" : "#FF4444" }}>
                  <span 
                    className="w-2 h-2 rounded-full mr-2 inline-block" 
                    style={{ backgroundColor: staff.enabled ? "#4CAF50" : "#FF4444" }} 
                  />
                  {staff.enabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>

          {/* Staff Details */}
          <div className="space-y-4">
            <h3 className="text-xs text-gray-500">Staff Details</h3>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium min-w-[100px]">Staff ID:</p>
                <p className="text-gray-600">{staff.id}</p>
              </div>
              <div className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium min-w-[100px]">Phone:</p>
                <p className="text-gray-600">{formatPhoneNumber(staff.phoneNumber)}</p>
              </div>
              <div className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium min-w-[100px]">Last Login:</p>
                <p className="text-gray-600">{staff.lastLogin || "Never logged in"}</p>
              </div>
              <div className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium min-w-[100px]">IP Address:</p>
                <p className="text-gray-600">{staff.ipAddress || "N/A"}</p>
              </div>
              <div className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2">
                <p className="font-medium min-w-[100px]">Device Info:</p>
                <p className="text-gray-600">{staff.deviceInfo || "N/A"}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-medium min-w-[100px]">Invited User:</p>
                <p className="text-gray-600">{staff.invitedUser ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 text-sm space-y-4">
            <h3 className="text-gray-500 text-xs">Footer</h3>
            <div>
              <div className="flex gap-2">
                <p className="font-medium min-w-[100px]">Last Updated:</p>
                <p className="text-gray-600">{staff.lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}