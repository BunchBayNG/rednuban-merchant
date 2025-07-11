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
import { transactionData1 } from "@/lib/mockData";
import { Eye } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";

// interface Transaction {
//   sN: number;
//   amount: number;
//   status: string;
//   transactionId: string;
//   timestamp: string;
// }

export default function TransactionsTable() {
  return (
    <div className="w-full relative">
      <Table>
        <TableHeader className="bg-[#F5F5F5] dark:bg-background">
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionData1.map((transaction) => (
            <TableRow key={transaction.sN}>
              <TableCell>{transaction.sN}</TableCell>
              <TableCell>₦{transaction.amount.toFixed(2)}</TableCell>
              <TableCell>
                <span className="flex items-center">
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: transaction.status === "Completed" ? "#4CAF50" : transaction.status === "Pending" ? "#FF9800" : "#FF4444" }}
                  />
                  <span style={{ color: transaction.status === "Completed" ? "#4CAF50" : transaction.status === "Pending" ? "#FF9800" : "#FF4444" }}>
                    {transaction.status}
                  </span>
                </span>
              </TableCell>
              <TableCell>{transaction.transactionId}</TableCell>
              <TableCell>{transaction.timestamp}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <BsThreeDots className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => console.log("View", transaction.sN)}>
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