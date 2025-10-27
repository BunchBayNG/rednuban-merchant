"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filter, Search, ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import StaffDetailsModal from "./StaffDetailsModal";
import Empty from "@/components/svg Icons/Empty";
import Loading from "@/components/Loading";

// API Response Interface
interface StaffResponse {
  statusCode: number;
  status: boolean;
  message: string;
  data: Staff[];
}

// Staff Interface based on API docs
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

export default function StaffTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [staff, setStaff] = useState<Staff[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Fetch staff data from API
  const fetchStaff = async () => {
    setLoading(true);
    setError(null);
    try {
      // You'll need to get the merchantAdminId from your auth context or props
      const merchantAdminId = "your-merchant-admin-id"; // Replace with actual ID
      
      const params = new URLSearchParams({
        merchantAdminId,
        page: currentPage.toString(),
        size: pageSize.toString(),
        search: searchTerm,
        status: filterStatus,
      }).toString();

      console.log("Fetching staff with params:", params);
      const res = await fetch(`/api/staff?${params}`);
      const data: StaffResponse = await res.json();
      console.log("Staff API Response:", JSON.stringify(data, null, 2));

      if (res.ok && data.status) {
        // Map API response to table format
        const mappedStaff = data.data.map((staffMember, index) => ({
          ...staffMember,
          sN: currentPage * pageSize + index + 1,
          fullName: `${staffMember.firstName} ${staffMember.lastName}`,
          role: staffMember.userType,
          status: staffMember.enabled ? "Enabled" : "Disabled",
          // These fields might need to come from a different endpoint
          lastLogin: "2024-01-01 10:00 AM", // Placeholder - update with actual data
          ipAddress: "192.168.1.1", // Placeholder
          deviceInfo: "Chrome, Windows", // Placeholder
          lastUpdated: new Date().toLocaleDateString(), // Placeholder
        }));

        setStaff(mappedStaff);
        // If API supports pagination, use these:
        // setTotalPages(data.data.totalPages || 1);
        // setTotalElements(data.data.totalElements || mappedStaff.length);
        
        // For now, assuming simple pagination
        setTotalPages(Math.ceil(mappedStaff.length / pageSize));
        setTotalElements(mappedStaff.length);
      } else {
        setError(data.message || `Failed to fetch staff (Status: ${res.status})`);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
      setError("Failed to fetch staff due to network or server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [currentPage, searchTerm, filterStatus]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      if (currentPage > 2) pages.push(currentPage - 1, currentPage);
      else pages.push(1);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages - 1);
    }
    return pages;
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 
      ? names[0][0] + names[names.length - 1][0] 
      : names[0][0] || "";
  };

  // Handle enable/disable staff
  const handleToggleStatus = async (staffId: string, currentStatus: boolean) => {
    try {
      // You'll need to implement this API call
      console.log(`Toggling status for staff ${staffId} from ${currentStatus}`);
      // await fetch(`/api/v1/users/toggle-status`, {
      //   method: "POST",
      //   body: JSON.stringify({ staffId, enabled: !currentStatus }),
      // });
      
      // Refresh data after status change
      fetchStaff();
    } catch (error) {
      console.error("Error toggling staff status:", error);
    }
  };

  return (
    <div className="w-full relative">
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      
      <div className="flex justify-between items-center mb-4 space-x-4">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 bg-[#F8F8F8] dark:bg-background">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white dark:bg-background border rounded-lg shadow-lg p-4">
              <DropdownMenuItem>
                <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value)}>
                  <SelectTrigger className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Enabled">Enabled</SelectItem>
                    <SelectItem value="Disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative w-[300px]">
            <Input
              placeholder="Search Full Name, Email, Role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10 bg-[#F8F8F8] dark:bg-background border-0"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {getPageNumbers().map((page, index) => (
            <span key={index}>
              {page === "..." ? (
                <span className="px-2">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(Number(page))}
                  disabled={page === "..." || page === currentPage}
                >
                  {Number(page) + 1}
                </Button>
              )}
            </span>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span>Go to Page:</span>
          <Select
            value={currentPage.toString()}
            onValueChange={(value) => setCurrentPage(parseInt(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={currentPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
                <SelectItem key={page} value={page.toString()}>
                  {page + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-[#F5F5F5] dark:bg-background">
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <Loading />
              </TableCell>
            </TableRow>
          ) : staff.length > 0 ? (
            staff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell>{staffMember.sN}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage 
                      src={staffMember.logoUrl || "/images/avatar-placeholder.jpg"} 
                      alt={staffMember.fullName} 
                    />
                    <AvatarFallback>{getInitials(staffMember.fullName)}</AvatarFallback>
                  </Avatar>
                  <span>{staffMember.fullName}</span>
                </TableCell>
                <TableCell>{staffMember.email}</TableCell>
                <TableCell>{staffMember.role}</TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <span
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ 
                        backgroundColor: staffMember.status === "Enabled" ? "#4CAF50" : "#FF4444" 
                      }}
                    />
                    <span style={{ 
                      color: staffMember.status === "Enabled" ? "#4CAF50" : "#FF4444" 
                    }}>
                      {staffMember.status}
                    </span>
                  </span>
                </TableCell>
                <TableCell>{staffMember.lastLogin}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <BsThreeDots className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedStaff(staffMember)}>
                        <Eye className="w-4 h-4 mr-2" /> View
                      </DropdownMenuItem>
                      {staffMember.enabled ? (
                        <DropdownMenuItem 
                          onClick={() => handleToggleStatus(staffMember.id, true)}
                        >
                          <Eye className="w-4 h-4 mr-2" /> Disable
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          onClick={() => handleToggleStatus(staffMember.id, false)}
                        >
                          <Eye className="w-4 h-4 mr-2" /> Enable
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => console.log("Download", staffMember.id)}>
                        <Download className="w-4 h-4 mr-2" /> Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="text-center flex flex-col items-center gap-4 m-3 p-3">
                  <Empty />
                  <p className="text-muted-foreground">No staff found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <StaffDetailsModal
        isOpen={!!selectedStaff}
        onClose={() => setSelectedStaff(null)}
        staff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
        staffList={staff}
      />
    </div>
  );
}