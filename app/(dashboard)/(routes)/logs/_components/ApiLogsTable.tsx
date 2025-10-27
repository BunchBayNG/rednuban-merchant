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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, ChevronLeft, ChevronRight, CalendarIcon, Download, Eye } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import ApiLogDetailsModal from "./ApiLogDetailsModal";
import Empty from "@/components/svg Icons/Empty";

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

interface ApiResponse {
  status: boolean;
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    content: any[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
}

export function ApiLogsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    fromDate: undefined as Date | undefined,
    toDate: undefined as Date | undefined,
    status: "All",
    sortBy: "default",
  });
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);
  const [apiLogsData, setApiLogsData] = useState<ApiLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // Fetch API logs data
  const fetchApiLogs = async (page: number = currentPage) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
        page: (page - 1).toString(),
        size: itemsPerPage.toString(),
        sortBy: filter.sortBy !== "default" ? getSortField(filter.sortBy) : "createdAt",
        sortOrder: filter.sortBy !== "default" ? getSortOrder(filter.sortBy) : "DESC",
        search: searchTerm || "",
        startDate: filter.fromDate ? filter.fromDate.toISOString().split('T')[0] : "",
        endDate: filter.toDate ? filter.toDate.toISOString().split('T')[0] : "",
        status: filter.status !== "All" ? getStatusFilter(filter.status) : "",
      });

      // Remove empty parameters
      Array.from(queryParams.entries()).forEach(([key, value]) => {
        if (!value) queryParams.delete(key);
      });

      const response = await fetch(`/api/reports/api-logs?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch API logs');
      }

      const data: ApiResponse = await response.json();
      
      if (data.status && data.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any 
        const transformedData = data.data.content.map((item: any, index: number) => ({
          sN: (page - 1) * itemsPerPage + index + 1,
          logId: item.id || item.logId || `log-${index}`,
          merchantCode: item.merchantOrgId || item.merchantCode || "N/A",
          requestTimestamp: item.requestTimestamp || item.createdAt || new Date().toISOString(),
          responseTimestamp: item.responseTimestamp || item.updatedAt || new Date().toISOString(),
          service: item.service || item.endpoint || "Unknown",
          responseStatus: item.responseStatus || item.statusCode || 200,
          timestamp: item.timestamp || item.createdAt || new Date().toISOString(),
          user: item.user || item.userId || "Unknown User",
          email: item.email || "unknown@example.com",
          transactionReference: item.transactionReference || item.transactionId || "N/A",
          customerReference: item.customerReference || item.customerId || "N/A",
          clientIP: item.clientIP || item.ipAddress || "0.0.0.0",
          requestPayload: item.requestPayload || item.requestBody || "{}",
          responseBody: item.responseBody || item.response || "{}",
        }));
        
        setApiLogsData(transformedData);
        setTotalItems(data.data.totalElements || transformedData.length);
        setTotalPages(data.data.totalPages || Math.ceil(transformedData.length / itemsPerPage));
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      console.error('Error fetching API logs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch API logs');
      setApiLogsData([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to map frontend filters to API parameters
  const getSortField = (sortBy: string): string => {
    switch (sortBy) {
      case "merchant-newest":
      case "merchant-oldest":
        return "merchantOrgId";
      case "request-newest":
      case "request-oldest":
        return "createdAt";
      case "status-low-high":
      case "status-high-low":
        return "responseStatus";
      default:
        return "createdAt";
    }
  };

  const getSortOrder = (sortBy: string): string => {
    switch (sortBy) {
      case "merchant-newest":
      case "request-newest":
      case "status-high-low":
        return "DESC";
      case "merchant-oldest":
      case "request-oldest":
      case "status-low-high":
        return "ASC";
      default:
        return "DESC";
    }
  };

  const getStatusFilter = (status: string): string => {
    switch (status) {
      case "200s":
        return "200";
      case "400s":
        return "400";
      case "500s":
        return "500";
      default:
        return "";
    }
  };

  // Fetch data when component mounts or filters change
  useEffect(() => {
    fetchApiLogs(1); // Reset to first page when filters change
  }, [searchTerm, filter]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchApiLogs(page);
  };

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

  const handleResetDate = () => setFilter((prev) => ({ ...prev, fromDate: undefined, toDate: undefined }));
  const handleResetStatus = () => setFilter((prev) => ({ ...prev, status: "All" }));
  const handleResetSort = () => setFilter((prev) => ({ ...prev, sortBy: "default" }));
  const handleResetAll = () => {
    setFilter({ fromDate: undefined, toDate: undefined, status: "All", sortBy: "default" });
    setSearchTerm("");
  };

  const handleApplyFilters = () => {
    fetchApiLogs(1);
  };

  function DatePicker({ id, date, onSelect, placeholder }: { id: string; date: Date | undefined; onSelect: (date: Date | undefined) => void; placeholder: string }) {
    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState<Date | undefined>(date);

    const handleSelect = (selectedDate: Date | undefined) => {
      onSelect(selectedDate);
      if (selectedDate) setMonth(selectedDate);
      setOpen(false);
    };

    return (
      <div className="flex flex-col gap-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              className="w-full justify-start text-left font-normal pl-3 pr-10 py-2 border rounded-md text-sm bg-[#F8F8F8] dark:bg-gray-700"
            >
              <span>{date ? date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : placeholder}</span>
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-30" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              month={month}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  const handleViewLog = (log: ApiLog) => {
    setSelectedLog(log);
    setIsDetailsModalOpen(true);
  };

  const handleDownloadLog = async (log: ApiLog) => {
    try {
      // Implement download functionality here
      console.log("Downloading log:", log.logId);
      // You can create a blob and download it, or make an API call to export
    } catch (error) {
      console.error("Error downloading log:", error);
    }
  };

  return (
    <div className="w-full relative">
      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-lg">Loading...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-4"
            onClick={() => fetchApiLogs()}
          >
            Retry
          </Button>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 space-x-4">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 bg-[#F8F8F8] dark:bg-background">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-84 bg-white dark:bg-background border rounded-lg shadow-lg p-4">
              <DropdownMenuLabel>Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Date Range</label>
                    <Button variant="link" className="text-red-500 p-0 h-auto" onClick={handleResetDate}>
                      Reset
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <label htmlFor="from-date" className="text-xs text-gray-400 dark:text-gray-100">
                        From:
                      </label>
                      <DatePicker
                        id="from-date"
                        date={filter.fromDate}
                        onSelect={(date) => setFilter((prev) => ({ ...prev, fromDate: date }))}
                        placeholder="YY/MM/DD"
                      />
                    </div>
                    <div className="relative flex-1">
                      <label htmlFor="to-date" className="text-xs text-gray-400 dark:text-gray-100">
                        To:
                      </label>
                      <DatePicker
                        id="to-date"
                        date={filter.toDate}
                        onSelect={(date) => setFilter((prev) => ({ ...prev, toDate: date }))}
                        placeholder="YY/MM/DD"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Sort By</label>
                    <Button variant="link" className="text-red-500 p-0 h-auto" onClick={handleResetSort}>
                      Reset
                    </Button>
                  </div>
                  <Select
                    value={filter.sortBy}
                    onValueChange={(value) => setFilter((prev) => ({ ...prev, sortBy: value }))}
                  >
                    <SelectTrigger className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded">
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="merchant-newest">Merchant code (Newest First)</SelectItem>
                      <SelectItem value="merchant-oldest">Merchant code (Oldest First)</SelectItem>
                      <SelectItem value="request-newest">Request Timestamp (Newest First)</SelectItem>
                      <SelectItem value="request-oldest">Request Timestamp (Oldest First)</SelectItem>
                      <SelectItem value="status-low-high">Response Status (Low to High)</SelectItem>
                      <SelectItem value="status-high-low">Response Status (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Status</label>
                    <Button variant="link" className="text-red-500 p-0 h-auto" onClick={handleResetStatus}>
                      Reset
                    </Button>
                  </div>
                  <Select
                    value={filter.status}
                    onValueChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="200s">200s</SelectItem>
                      <SelectItem value="400s">400s</SelectItem>
                      <SelectItem value="500s">500s</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={handleResetAll}>
                    Reset All
                  </Button>
                  <Button className="bg-red-500 text-white hover:bg-red-600" onClick={handleApplyFilters}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative w-[300px]">
            <Input
              placeholder="Search Merchant Code..."
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
            onClick={() => handlePageChange(currentPage - 1)}
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
                  onClick={() => handlePageChange(Number(page))}
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
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span>Go to Page:</span>
          <Select
            value={currentPage.toString()}
            onValueChange={(value) => handlePageChange(parseInt(value))}
            disabled={loading}
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
      <div>
        <Table>
          <TableHeader className="bg-[#F5F5F5] dark:bg-background">
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Merchant Code</TableHead>
              <TableHead>Request Timestamp</TableHead>
              <TableHead>Response Timestamp</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Response Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiLogsData.length > 0 ? (
              apiLogsData.map((item) => (
                <TableRow key={item.logId}>
                  <TableCell>{item.sN}</TableCell>
                  <TableCell>{item.merchantCode}</TableCell>
                  <TableCell>{new Date(item.requestTimestamp).toLocaleString()}</TableCell>
                  <TableCell>{new Date(item.responseTimestamp).toLocaleString()}</TableCell>
                  <TableCell>{item.service}</TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <span
                        className="w-2 h-2 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            item.responseStatus >= 200 && item.responseStatus < 300 ? "#4CAF50" : // 200s (green)
                            item.responseStatus >= 400 && item.responseStatus < 500 ? "#FF8C00" : // 400s (orange)
                            item.responseStatus >= 500 && item.responseStatus < 600 ? "#FF4444" : "#000000", // 500s (red)
                        }}
                      />
                      <span
                        style={{
                          color:
                            item.responseStatus >= 200 && item.responseStatus < 300 ? "#4CAF50" : // 200s (green)
                            item.responseStatus >= 400 && item.responseStatus < 500 ? "#FF8C00" : // 400s (orange)
                            item.responseStatus >= 500 && item.responseStatus < 600 ? "#FF4444" : "#000000", // 500s (red)
                        }}
                      >
                        {item.responseStatus}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <BsThreeDots className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleViewLog(item)}>
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownloadLog(item)}>
                          <Download className="w-4 h-4 mr-2" /> Download
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                <div className="text-center flex flex-col items-center gap-4 m-3 p-3">
                  <Empty />
                  <p className="text-muted-foreground">No Api Logs found</p>
                </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ApiLogDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        log={selectedLog}
        setSelectedLog={setSelectedLog}
        logs={apiLogsData}
      />
    </div>
  );
}