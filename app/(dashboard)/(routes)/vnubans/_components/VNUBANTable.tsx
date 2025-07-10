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
import { Filter, ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import { useState, useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import Empty from "@/components/svg Icons/Empty";
import { vNUBANData } from "@/lib/mockData";
import VNUBANDetailsModal from "./VNUBANDetailsModal";

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

export default function VNUBANTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedVNUBAN, setSelectedVNUBAN] = useState<VNUBAN | null>(null);

  const filteredVNUBANs = useMemo(() => {
    return vNUBANData.filter((vn) => {
      const matchesSearch =
        vn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vn.vNUBAN.includes(searchTerm) ||
        vn.status.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? vn.status.toLowerCase() === filterStatus.toLowerCase() : true;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const paginatedVNUBANs = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredVNUBANs.slice(start, start + pageSize);
  }, [filteredVNUBANs, currentPage]);

  const totalPages = Math.ceil(filteredVNUBANs.length / pageSize);

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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="Search Customer, vNUBAN..."
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
            <TableHead>Customer Name</TableHead>
            <TableHead>vNUBAN</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Product Prefix</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>CreatedAt</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedVNUBANs.length > 0 ? (
            paginatedVNUBANs.map((item) => (
              <TableRow key={item.sN}>
                <TableCell>{item.sN}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/images/avatar-placeholder.jpg" alt="Customer Avatar" />
                    <AvatarFallback>{getInitials(item.customerName)}</AvatarFallback>
                  </Avatar>
                  <span>{item.customerName}</span>
                </TableCell>
                <TableCell>{item.vNUBAN}</TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <span
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: item.status === "Active" ? "#4CAF50" : "#FF4444" }}
                    />
                    <span style={{ color: item.status === "Active" ? "#4CAF50" : "#FF4444" }}>
                      {item.status}
                    </span>
                  </span>
                </TableCell>
                <TableCell>{item.productPrefix}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <BsThreeDots className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedVNUBAN(item)}>
                        <Eye /> View
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
                  <p className="text-muted-foreground">No vNUBANs found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <VNUBANDetailsModal
        isOpen={!!selectedVNUBAN}
        onClose={() => setSelectedVNUBAN(null)}
        vNUBAN={selectedVNUBAN}
        setSelectedVNUBAN={setSelectedVNUBAN}
        transactions={vNUBANData}
        currentPage={currentPage}
        totalElements={vNUBANData.length}
        filters={{ searchTerm, status: filterStatus }}
      />
    </div>
  );
}