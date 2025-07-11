"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { vnubanHistoryData1 } from "@/lib/mockData";
import { Eye } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";

// interface vNUBANHistory {
//   sN: number;
//   vnuban: string;
//   status: string;
//   totalTransactions: number;
//   totalValue: number;
//   lastUsed: string;
//   createdAt: string;
// }

export default function VnubanHistoryTable() {
  return (
    <div className="w-full relative">
      <Table>
        <TableHeader className="bg-[#F5F5F5] dark:bg-background">
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>vNUBAN</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Transactions</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vnubanHistoryData1.map((history) => (
            <TableRow key={history.sN}>
              <TableCell>{history.sN}</TableCell>
              <TableCell>{history.vnuban}</TableCell>
              <TableCell>
                <span className="flex items-center">
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: history.status === "Active" ? "#4CAF50" : "#FF4444" }}
                  />
                  <span style={{ color: history.status === "Active" ? "#4CAF50" : "#FF4444" }}>
                    {history.status}
                  </span>
                </span>
              </TableCell>
              <TableCell>{history.totalTransactions}</TableCell>
              <TableCell>₦{history.totalValue.toFixed(2)}</TableCell>
              <TableCell>{history.lastUsed}</TableCell>
              <TableCell>{history.createdAt}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <BsThreeDots className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => console.log("View", history.sN)}>
                      <Eye /> View
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