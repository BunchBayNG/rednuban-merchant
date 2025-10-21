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
import { Filter, Search, ChevronLeft, ChevronRight, Eye, Download } from "lucide-react";
import { useState, useEffect } from "react";
import Empty from "@/components/svg Icons/Empty";
import AuditTrailDetailsModal from "./AuditTrailDetailsModal";
import { BsThreeDots } from "react-icons/bs";
import Loader from "@/components/svg Icons/loader";

interface AuditLog {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  userId: string;
  userName: string;
  email: string;
  userRole: string;
  userIpAddress: string;
  merchantName: string;
  merchantOrganization: string;
  merchantOrgId: string;
  event: string;
  userType: string;
  description: string;
  deleted: boolean;
}

interface AuditResponse {
  statusCode: number;
  status: boolean;
  message: string;
  data: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: AuditLog[];
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
  };
}

export default function AuditTrailTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [data, setData] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAuditLogs = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: (currentPage - 1).toString(),
        size: itemsPerPage.toString(),
        search: searchTerm,
        status: filterStatus,
        sortBy: "createdAt",
        sortOrder: "DESC",
      });

      const url = `/api/audit-log?${params.toString()}`;
      console.log("Fetching audit logs", { url, queryParams: Object.fromEntries(params) });

      try {
        const response = await fetch(`${url}&cacheBust=${Date.now()}`, {
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        let result: AuditResponse;
        const text = await response.text();
        try {
          result = JSON.parse(text);
        } catch (error) {
          console.log(error)
          console.error("Invalid JSON response", { status: response.status, text: text.slice(0, 100) });
          throw new Error(`Invalid response: Not JSON (status ${response.status})`);
        }

        console.log("Audit logs response", {
          status: response.status,
          body: JSON.stringify(result, null, 2),
        });

        if (!response.ok) {
          throw new Error(`API error: ${result.message || "Unknown"} (status ${result.statusCode})`);
        }

        if (!result.status) {
          throw new Error(result.message || `Failed to fetch audit logs (status ${response.status})`);
        }

        setData(result);
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any 
      catch (err: any) {
        console.error("Error fetching audit logs", {
          message: err.message || "Unknown error",
        });
        setError(err.message || "Failed to fetch audit logs");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, [currentPage, searchTerm, filterStatus]);

  const totalPages = data?.data.totalPages || 1;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push(...[currentPage - 1, currentPage]);
      else pages.push(2);
      if (currentPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const handleExportDetails = async (log: AuditLog) => {
    try {
      console.log(`Export details for:`, log);
      // Add export functionality here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full relative">
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
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="SUCCESS">SUCCESS</SelectItem>
                    <SelectItem value="FAILED">FAILED</SelectItem>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative w-[300px]">
            <Input
              placeholder="Search User, Merchant, Event..."
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
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1 || loading}
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
                  disabled={page === "..." || page === currentPage || loading}
                >
                  {page}
                </Button>
              )}
            </span>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <SelectItem key={page} value={page.toString()}>
                  {page}
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
            <TableHead>User</TableHead>
            <TableHead>User Role</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                <div className="relative w-17 p-4 h-17 mx-auto my-5">
                  <div className="absolute inset-0 border-4 border-transparent border-t-[#C80000] rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center m-3 justify-center">
                    <Loader />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-red-500">
                Error: {error}
              </TableCell>
            </TableRow>
          ) : data?.data.content.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                <div className="text-center flex flex-col items-center gap-4 m-3 p-3">
                  <Empty />
                  <p className="text-muted-foreground">No audit logs found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data?.data.content.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{item.userName}</TableCell>
                <TableCell>{item.userRole}</TableCell>
                <TableCell>{item.merchantName || "N/A"}</TableCell>
                <TableCell>{item.event}</TableCell>
                <TableCell>
                  {item.description || item.event} 
                  {item.deleted ? "(Deleted)" : item.userIpAddress ? "(IP: " + item.userIpAddress + ")" : ""}
                </TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <BsThreeDots className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedLog(item)}>
                        <Eye/> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportDetails(item)}>
                        <Download/> Export Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      <AuditTrailDetailsModal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        log={selectedLog}
        setSelectedLog={setSelectedLog}
        logs={data?.data.content || []}
      />
    </div>
  );
}