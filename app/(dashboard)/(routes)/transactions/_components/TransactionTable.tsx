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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filter, ChevronLeft, ChevronRight, View, Download, CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import Empty from "@/components/svg Icons/Empty";
import TransactionDetailsModal from "./TransactionsDetailsModal";
import Loading from "@/components/Loading";

interface Transaction {
  sN: number;
  id: number;
  transactionId: string;
  merchantName: string;
  merchantOrgId: string;
  vnuban: string;
  amount: number;
  status: string;
  sessionId: string;
  reference: string;
  webhookStatus: string;
  transactionType: string;
  destinationAccountNumber: string;
  destinationAccountName: string;
  destinationBankName: string;
  ipAddress: string;
  deviceName: string;
  processingTime: number;
  createdAt: string;
  updatedAt: string;
}

interface TransactionResponse {
  statusCode: number;
  status: boolean;
  message: string;
  data: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: Transaction[];
    number: number;
    first: boolean;
    last: boolean;
  };
}

export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    transactionId: "",
    merchantName: "",
    merchantOrgId: "",
    vnuban: "",
    startDate: "",
    endDate: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "asc",
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: pageSize.toString(),
        sortBy: filter.sortBy || "createdAt",
        sortOrder: filter.sortOrder || "asc",
      };
      if (filter.transactionId) params.transactionId = filter.transactionId;
      if (filter.merchantName || searchTerm) params.merchantName = filter.merchantName || searchTerm;
      if (filter.merchantOrgId) params.merchantOrgId = filter.merchantOrgId;
      if (filter.vnuban) params.vnuban = filter.vnuban;
      if (filter.startDate) params.startDate = filter.startDate;
      if (filter.endDate) params.endDate = filter.endDate;
      if (filter.status) params.status = filter.status;

      const queryString = new URLSearchParams(params).toString();
      console.log("Frontend Request URL:", `/api/reports/transactions?${queryString}`);
      const res = await fetch(`/api/reports/transactions?${queryString}`);
      const data: TransactionResponse = await res.json();
      console.log("API Response:", JSON.stringify(data, null, 2));

      if (data.status) {
        const mappedTransactions = data.data.content.map((t, index) => ({
          sN: data.data.number * pageSize + index + 1,
          id: t.id || 0,
          transactionId: t.transactionId || "",
          merchantName: t.merchantName || "",
          merchantOrgId: t.merchantOrgId || "",
          vnuban: t.vnuban || "",
          amount: t.amount || 0,
          status: t.status || "",
          sessionId: t.sessionId || "",
          reference: t.reference || "",
          webhookStatus: t.webhookStatus || "",
          transactionType: t.transactionType || "",
          destinationAccountNumber: t.destinationAccountNumber || "",
          destinationAccountName: t.destinationAccountName || "",
          destinationBankName: t.destinationBankName || "",
          ipAddress: t.ipAddress || "",
          deviceName: t.deviceName || "",
          processingTime: t.processingTime || 0,
          createdAt: t.createdAt
            ? new Date(t.createdAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          updatedAt: t.updatedAt || "",
        }));
        setTransactions(mappedTransactions);
        setTotalPages(data.data.totalPages);
        setTotalElements(data.data.totalElements);
      } else {
        setError(data.message || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, filter, searchTerm]);

  // const paginatedTransactions = useMemo(() => transactions, [transactions]);

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
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  const handleResetDate = () => setFilter((prev) => ({ ...prev, startDate: "", endDate: "" }));
  const handleResetVNUBAN = () => setFilter((prev) => ({ ...prev, vnuban: "" }));
  const handleResetStatus = () => setFilter((prev) => ({ ...prev, status: "" }));
  const handleResetSort = () => setFilter((prev) => ({ ...prev, sortBy: "createdAt", sortOrder: "asc" }));
  const handleResetAll = () =>
    setFilter({
      transactionId: "",
      merchantName: "",
      merchantOrgId: "",
      vnuban: "",
      startDate: "",
      endDate: "",
      status: "",
      sortBy: "createdAt",
      sortOrder: "asc",
    });

  const handleApplyFilters = () => {
    // Filtering handled by API
  };

  function DatePicker({
    id,
    date,
    onSelect,
    placeholder,
  }: {
    id: string;
    date: string;
    onSelect: (date: string) => void;
    placeholder: string;
  }) {
    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState<Date | undefined>(date ? new Date(date) : undefined);

    const handleSelect = (selectedDate: Date | undefined) => {
      onSelect(selectedDate ? selectedDate.toISOString().split("T")[0] : "");
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
              <span>
                {date
                  ? new Date(date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
                  : placeholder}
              </span>
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-30" align="start">
            <Calendar
              mode="single"
              selected={date ? new Date(date) : undefined}
              onSelect={handleSelect}
              month={month}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

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
                      <label htmlFor="start-date" className="text-xs text-gray-400 dark:text-gray-100">
                        From:
                      </label>
                      <DatePicker
                        id="start-date"
                        date={filter.startDate}
                        onSelect={(date) => setFilter((prev) => ({ ...prev, startDate: date }))}
                        placeholder="YY/MM/DD"
                      />
                    </div>
                    <div className="relative flex-1">
                      <label htmlFor="end-date" className="text-xs text-gray-400 dark:text-gray-100">
                        To:
                      </label>
                      <DatePicker
                        id="end-date"
                        date={filter.endDate}
                        onSelect={(date) => setFilter((prev) => ({ ...prev, endDate: date }))}
                        placeholder="YY/MM/DD"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Transaction ID</label>
                    <Button
                      variant="link"
                      className="text-red-500 p-0 h-auto"
                      onClick={() => setFilter((prev) => ({ ...prev, transactionId: "" }))}
                    >
                      Reset
                    </Button>
                  </div>
                  <Input
                    value={filter.transactionId}
                    onChange={(e) => setFilter((prev) => ({ ...prev, transactionId: e.target.value }))}
                    placeholder="Transaction ID"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Merchant Name</label>
                    <Button
                      variant="link"
                      className="text-red-500 p-0 h-auto"
                      onClick={() => setFilter((prev) => ({ ...prev, merchantName: "" }))}
                    >
                      Reset
                    </Button>
                  </div>
                  <Input
                    value={filter.merchantName}
                    onChange={(e) => setFilter((prev) => ({ ...prev, merchantName: e.target.value }))}
                    placeholder="Merchant Name"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Merchant Org ID</label>
                    <Button
                      variant="link"
                      className="text-red-500 p-0 h-auto"
                      onClick={() => setFilter((prev) => ({ ...prev, merchantOrgId: "" }))}
                    >
                      Reset
                    </Button>
                  </div>
                  <Input
                    value={filter.merchantOrgId}
                    onChange={(e) => setFilter((prev) => ({ ...prev, merchantOrgId: e.target.value }))}
                    placeholder="Merchant Org ID"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">vNUBAN</label>
                    <Button variant="link" className="text-red-500 p-0 h-auto" onClick={handleResetVNUBAN}>
                      Reset
                    </Button>
                  </div>
                  <Input
                    value={filter.vnuban}
                    onChange={(e) => setFilter((prev) => ({ ...prev, vnuban: e.target.value }))}
                    placeholder="vNUBAN"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
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
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Successful">
                        <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#4CAF50" }} />
                        Successful
                      </SelectItem>
                      <SelectItem value="Pending">
                        <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#FF8C00" }} />
                        Pending
                      </SelectItem>
                      <SelectItem value="Failed">
                        <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#FF4444" }} />
                        Failed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Sort By</label>
                    <Button variant="link" className="text-red-500 p-0 h-auto" onClick={handleResetSort}>
                      Reset
                    </Button>
                  </div>
                  <Select
                    value={filter.sortBy + (filter.sortOrder === "asc" ? "" : "Desc")}
                    onValueChange={(value) =>
                      setFilter((prev) => ({
                        ...prev,
                        sortBy: value.includes("Desc") ? value.replace("Desc", "") : value,
                        sortOrder: value.includes("Desc") ? "desc" : "asc",
                      }))
                    }
                  >
                    <SelectTrigger className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="createdAt">Created At (Asc)</SelectItem>
                      <SelectItem value="createdAtDesc">Created At (Desc)</SelectItem>
                      <SelectItem value="merchantName">Merchant Name (Asc)</SelectItem>
                      <SelectItem value="merchantNameDesc">Merchant Name (Desc)</SelectItem>
                      <SelectItem value="amount">Amount (Asc)</SelectItem>
                      <SelectItem value="amountDesc">Amount (Desc)</SelectItem>
                      <SelectItem value="status">Status (Asc)</SelectItem>
                      <SelectItem value="statusDesc">Status (Desc)</SelectItem>
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

          <Input
            placeholder="Search Merchant, vNUBAN, Transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-10 bg-[#F8F8F8] dark:bg-background border-0 w-[300px]"
          />
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
            <TableHead>Customer</TableHead>
            <TableHead>vNUBAN</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8}>
               <Loading/>
              </TableCell>
            </TableRow>
          ) : transactions.length > 0 ? (
            transactions.map((item) => (
              <TableRow key={item.transactionId}>
                <TableCell>{item.sN}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/images/avatar-placeholder.jpg" alt="Avatar" />
                    <AvatarFallback>{getInitials(item.merchantName)}</AvatarFallback>
                  </Avatar>
                  <span>{item.merchantName}</span>
                </TableCell>
                <TableCell>{item.vnuban}</TableCell>
                <TableCell>₦{item.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <span
                      className="w-2 h-2 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          item.status === "SUCCESS"
                            ? "#4CAF50"
                            : item.status === "Pending"
                            ? "#FF8C00"
                            : "#FF4444",
                      }}
                    />
                    <span
                      style={{
                        color:
                          item.status === "SUCCESS"
                            ? "#4CAF50"
                            : item.status === "Pending"
                            ? "#FF8C00"
                            : "#FF4444",
                      }}
                    >
                      {item.status}
                    </span>
                  </span>
                </TableCell>
                <TableCell>{item.transactionId}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <BsThreeDots className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedTransaction(item)}>
                        <View /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Download", item.sN)}>
                        <Download /> Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8}>
                <div className="text-center flex flex-col items-center gap-4 m-3 p-3">
                  <Empty />
                  <p className="text-muted-foreground">No transactions found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TransactionDetailsModal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        transactions={transactions}
        currentPage={currentPage}
        totalElements={totalElements}
        filters={{
          transactionId: filter.transactionId,
          merchantName: filter.merchantName,
          merchantOrgId: filter.merchantOrgId,
          vnuban: filter.vnuban,
          startDate: filter.startDate,
          endDate: filter.endDate,
          status: filter.status,
          sortBy: filter.sortBy,
          sortOrder: filter.sortOrder,
          searchTerm,
        }}
      />
    </div>
  );
}