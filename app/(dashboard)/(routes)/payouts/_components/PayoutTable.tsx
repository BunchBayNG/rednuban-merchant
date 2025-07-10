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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Filter, Search, ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import { useState, useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import Retry from "@/components/svg Icons/Retry";
import Empty from "@/components/svg Icons/Empty";
import { payoutsData } from "@/lib/mockData";
import PayoutDetailsModal from "./PayoutDetailsModal";

interface Payout {
  sN: number;
  recipientName: string;
  vNUBAN: string;
  amount: number;
  status: string;
  payoutId: number;
  dateRequested: string;
  transactionRef: string;
  paymentReference: string;
  merchantOrgId: string;
  updatedAt: string;
}

export default function PayoutTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);

  const filteredPayouts = useMemo(() => {
    return payoutsData.filter((payouts) => {
      const matchesSearch =
        payouts.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payouts.vNUBAN.includes(searchTerm) ||
        payouts.status.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? payouts.status.toLowerCase() === filterStatus.toLowerCase() : true;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const paginatedPayouts = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredPayouts.slice(start, start + pageSize);
  }, [filteredPayouts, currentPage]);

  const totalPages = Math.ceil(filteredPayouts.length / pageSize);

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
                    <SelectItem value="Successful">Successful</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative w-[300px]">
            <Input
              placeholder="Search Recipient, vNUBAN, Status..."
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
            <TableHead>Recipient Name</TableHead>
            <TableHead>vNUBAN</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payout ID</TableHead>
            <TableHead>Date Requested</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPayouts.length > 0 ? (
            paginatedPayouts.map((payout) => (
              <TableRow key={payout.sN}>
                <TableCell>{payout.sN}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{getInitials(payout.recipientName)}</AvatarFallback>
                  </Avatar>
                  <span>{payout.recipientName}</span>
                </TableCell>
                <TableCell>{payout.vNUBAN}</TableCell>
                <TableCell>₦{payout.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <span
                      className="w-2 h-2 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          payout.status === "Successful"
                            ? "#4CAF50"
                            : payout.status === "Processing"
                              ? "#FF8C00"
                              : "#FF4444",
                      }}
                    />
                    <span
                      style={{
                        color:
                          payout.status === "Successful"
                            ? "#4CAF50"
                            : payout.status === "Processing"
                              ? "#FF8C00"
                              : "#FF4444",
                      }}
                    >
                      {payout.status}
                    </span>
                  </span>
                </TableCell>
                <TableCell>{payout.payoutId}</TableCell>
                <TableCell>{payout.dateRequested}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <BsThreeDots className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedPayout(payout)}>
                        <Eye /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log("Download", payout.sN)}>
                        <Download /> Download
                      </DropdownMenuItem>
                      {payout.status === "Failed" && (
                        <DropdownMenuItem onClick={() => console.log("Retry", payout.sN)}>
                          <Retry /> Retry
                        </DropdownMenuItem>
                      )}
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
                  <p className="text-muted-foreground">No payouts found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PayoutDetailsModal
        isOpen={!!selectedPayout}
        onClose={() => setSelectedPayout(null)}
        payout={selectedPayout}
        setSelectedPayout={setSelectedPayout}
        payouts={payoutsData}
      />
    </div>
  );
}