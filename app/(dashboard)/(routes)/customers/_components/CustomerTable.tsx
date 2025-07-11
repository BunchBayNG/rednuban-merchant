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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Filter, Search, ChevronLeft, ChevronRight, Eye, CalendarIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { customerData } from "@/lib/mockData";
import { BsThreeDots } from "react-icons/bs";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { Range } from "react-range";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface Customer {
//   sN: number;
//   customerName: string;
//   vnuban: string;
//   status: string;
//   totalValue: number;
//   totalTransactions: number;
//   lastActivity: string;
// }



export default function CustomerTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    fromDate: undefined as Date | undefined,
    toDate: undefined as Date | undefined,
    minValue: 0,
    maxValue: 10000,
    status: "",
    sortBy: "default",
  });
  const itemsPerPage = 5;
  const router = useRouter();

  const filteredCustomers = useMemo(() => {
    return customerData.filter((customer) => {
      const matchesSearch =
        customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.vnuban.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate =
        (!filter.fromDate || new Date(customer.lastActivity) >= filter.fromDate) &&
        (!filter.toDate || new Date(customer.lastActivity) <= filter.toDate);
      const matchesValue = customer.totalValue >= filter.minValue && customer.totalValue <= filter.maxValue;
      const matchesStatus = !filter.status || customer.status === filter.status;
      return matchesSearch && matchesDate && matchesValue && matchesStatus;
    }).sort((a, b) => {
      switch (filter.sortBy) {
        case "customer-a-z":
          return a.customerName.localeCompare(b.customerName);
        case "customer-z-a":
          return b.customerName.localeCompare(a.customerName);
        case "total-value-high-low":
          return b.totalValue - a.totalValue;
        case "total-value-low-high":
          return a.totalValue - b.totalValue;
        case "last-activity-newest":
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        case "last-activity-oldest":
          return new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime();
        default:
          return 0;
      }
    });
  }, [searchTerm, filter]);

  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

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

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  const handleResetDate = () => setFilter((prev) => ({ ...prev, fromDate: undefined, toDate: undefined }));
  const handleResetValue = () => setFilter((prev) => ({ ...prev, minValue: 0, maxValue: 10000 }));
  const handleResetStatus = () => setFilter((prev) => ({ ...prev, status: "" }));
  const handleResetSort = () => setFilter((prev) => ({ ...prev, sortBy: "default" }));
  const handleResetAll = () =>
    setFilter({ fromDate: undefined, toDate: undefined, minValue: 0, maxValue: 10000, status: "", sortBy: "default" });

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
            <DropdownMenuContent className="w-84 bg-white dark:bg-background border rounded-lg shadow-lg p-4">
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="from-date"
                            variant="outline"
                            className="w-full justify-start text-left font-normal pl-3 pr-10 py-2 border rounded-md text-sm bg-[#F8F8F8] dark:bg-gray-700"
                          >
                            <span>
                              {filter.fromDate
                                ? filter.fromDate.toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "YY/MM/DD"}
                            </span>
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-30" align="start">
                          <Calendar
                            mode="single"
                            selected={filter.fromDate}
                            onSelect={(date) => setFilter((prev) => ({ ...prev, fromDate: date }))}
                            month={filter.fromDate}
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="relative flex-1">
                      <label htmlFor="to-date" className="text-xs text-gray-400 dark:text-gray-100">
                        To:
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="to-date"
                            variant="outline"
                            className="w-full justify-start text-left font-normal pl-3 pr-10 py-2 border rounded-md text-sm bg-[#F8F8F8] dark:bg-gray-700"
                          >
                            <span>
                              {filter.toDate
                                ? filter.toDate.toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "YY/MM/DD"}
                            </span>
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-30" align="start">
                          <Calendar
                            mode="single"
                            selected={filter.toDate}
                            onSelect={(date) => setFilter((prev) => ({ ...prev, toDate: date }))}
                            month={filter.toDate}
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Transaction Value Range</label>
                    <Button variant="link" className="text-red-500 p-0 h-auto" onClick={handleResetValue}>
                      Reset
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label htmlFor="min-value" className="text-xs text-gray-400 dark:text-gray-100">
                          Minimum Value:
                        </label>
                        <Input
                          id="min-value"
                          type="number"
                          value={filter.minValue}
                          onChange={(e) => setFilter((prev) => ({ ...prev, minValue: parseFloat(e.target.value) || 0 }))}
                          className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                          min="0"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="max-value" className="text-xs text-gray-400 dark:text-gray-100">
                          Maximum Value:
                        </label>
                        <Input
                          id="max-value"
                          type="number"
                          value={filter.maxValue}
                          onChange={(e) => setFilter((prev) => ({ ...prev, maxValue: parseFloat(e.target.value) || 10000 }))}
                          className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                          min="0"
                        />
                      </div>
                    </div>
                    <Range
                      step={100}
                      min={0}
                      max={10000}
                      values={[filter.minValue, filter.maxValue]}
                      onChange={(values) => setFilter((prev) => ({ ...prev, minValue: values[0], maxValue: values[1] }))}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "6px",
                            width: "100%",
                            backgroundColor: "#ccc",
                            borderRadius: "3px",
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: "16px",
                            width: "16px",
                            backgroundColor: "#C80000",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    />
                    <div className="flex justify-between text-xs">
                      <span>₦{filter.minValue.toFixed(2)}</span>
                      <span>₦{filter.maxValue.toFixed(2)}</span>
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
                      <SelectItem value="customer-a-z">Customer Name (A-Z)</SelectItem>
                      <SelectItem value="customer-z-a">Customer Name (Z-A)</SelectItem>
                      <SelectItem value="total-value-high-low">Total Value (High to Low)</SelectItem>
                      <SelectItem value="total-value-low-high">Total Value (Low to High)</SelectItem>
                      <SelectItem value="last-activity-newest">Last Activity (Newest First)</SelectItem>
                      <SelectItem value="last-activity-oldest">Last Activity (Oldest First)</SelectItem>
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
                      <SelectItem value="Active">
                        <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#4CAF50" }} />
                        Active
                      </SelectItem>
                      <SelectItem value="Inactive">
                        <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#FF4444" }} />
                        Inactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={handleResetAll}>
                    Reset All
                  </Button>
                  <Button className="bg-red-500 text-white hover:bg-red-600" onClick={() => {}}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative w-[300px]">
            <Input
              placeholder="Search Customer Name, vNUBAN..."
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
            disabled={currentPage === 1}
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
                  {page}
                </Button>
              )}
            </span>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-[#F5F5F5] dark:bg-background">
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>vNUBAN</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Total Transactions</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCustomers.map((customer) => (
            <TableRow key={customer.sN}>
              <TableCell>{customer.sN}</TableCell>
              <TableCell className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{getInitials(customer.customerName)}</AvatarFallback>
                </Avatar>
                <span>{customer.customerName}</span>
              </TableCell>
              <TableCell>{customer.vnuban}</TableCell>
              <TableCell>
                <span className="flex items-center">
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: customer.status === "Active" ? "#4CAF50" : "#FF4444" }}
                  />
                  <span style={{ color: customer.status === "Active" ? "#4CAF50" : "#FF4444" }}>
                    {customer.status}
                  </span>
                </span>
              </TableCell>
              <TableCell>₦{customer.totalValue.toFixed(2)}</TableCell>
              <TableCell>{customer.totalTransactions}</TableCell>
              <TableCell>{customer.lastActivity}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <BsThreeDots className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => router.push(`/customers/profile/${customer.sN}`)}>
                      <Eye /> View Profile
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}