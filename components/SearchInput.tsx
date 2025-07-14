"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchModal from "./SearchModal";

interface Transaction {
  sN: number;
  id: number;
  transactionId: string;
  customerName: string;
  customerOrgId: string;
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

interface VNUBAN {
  sN: number;
  id: number;
  customerName: string;
  customerOrgId: string;
  vnuban: string;
  accountName: string;
  vnubanType: string;
  status: string;
  productType: string | null;
  customerReference: string;
  provisionDate: string;
  updatedAt: string;
}

interface Customer {
  sN: string;
  customerName: string;
  code: string;
  accountName: string;
  accountNumber: string;
  primaryContact: string;
  status: string;
  noOfUsers: number;
  createdAt: string;
}

interface SearchInputProps {
  transactions: Transaction[];
  vnubans: VNUBAN[];
  customers: Customer[];
}

export const SearchInput = ({ transactions: initialTransactions, vnubans: initialVnubans, customers: initialCustomers }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [vnubans, setVnubans] = useState<VNUBAN[]>(initialVnubans);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await fetch("/api/reports/transactions?page=0&size=10&sortBy=createdAt&sortOrder=ASC", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken="))
              ?.split("=")[1]}`,
          },
        });
        const transactionData = await transactionResponse.json();
        if (transactionResponse.ok && transactionData.status) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedTransactions = transactionData.data.content.map((item: any) => ({
            sN: item.id || Math.random().toString(36).substr(2, 9),
            id: item.id || 0,
            transactionId: item.transactionId || "N/A",
            customerName: item.merchantName || "N/A",
            customerOrgId: item.merchantOrgId || "N/A",
            vnuban: String(item.accountNo || ""),
            amount: item.amount || 0,
            status: item.status || "Unknown",
            sessionId: item.sessionId || "N/A",
            reference: item.reference || "N/A",
            webhookStatus: item.webhookStatus || "N/A",
            transactionType: item.transactionType || "N/A",
            destinationAccountNumber: item.destinationAccountNumber || "N/A",
            destinationAccountName: item.destinationAccountName || "N/A",
            destinationBankName: item.destinationBankName || "N/A",
            ipAddress: item.ipAddress || "N/A",
            deviceName: item.deviceName || "N/A",
            processingTime: item.processingTime || 0,
            createdAt: item.createdAt
              ? new Date(item.createdAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
              : "N/A",
            updatedAt: item.updatedAt
              ? new Date(item.updatedAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
              : "N/A",
          }));
          setTransactions(mappedTransactions);
        }

        const vnubanResponse = await fetch("/api/reports/vnubans?page=0&size=10&sortBy=provisionDate&sortOrder=ASC", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie
              .split("; ")
              .find((row) => row.startsWith("accessToken="))
              ?.split("=")[1]}`,
          },
        });
        const vnubanData = await vnubanResponse.json();
        if (vnubanResponse.ok && vnubanData.status) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedVnubans = vnubanData.data.content.map((item: any) => ({
            sN: item.id || Math.random().toString(36).substr(2, 9),
            id: item.id || 0,
            customerName: item.merchantName || "N/A",
            customerOrgId: item.merchantOrgId || "N/A",
            vnuban: String(item.accountNo || ""),
            accountName: String(item.accountName || "N/A"),
            vnubanType: item.mode || "N/A",
            status: item.status || "Unknown",
            productType: item.productType || null,
            customerReference: String(item.initiatorRef || "N/A"),
            provisionDate: item.provisionDate
              ? new Date(item.provisionDate).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
              : "N/A",
            updatedAt: item.updatedAt
              ? new Date(item.updatedAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
              : "N/A",
          }));
          setVnubans(mappedVnubans);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    setSearchQuery(""); // Reset parent query on close to break potential sync
  }, [setSearchQuery]);

  return (
    <SearchModal
      searchQuery={searchQuery}
      isOpen={isModalOpen}
      onClose={handleClose}
      transactions={transactions}
      vnubans={vnubans}
      customers={initialCustomers}
      setSearchQuery={setSearchQuery}
      trigger={
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleInputClick}
            className="pl-10 pr-10 bg-[#F8F8F8] dark:bg-background border-none rounded-lg h-10 w-[400px] max-w-md focus:ring-2 focus:ring-gray-200 text-gray-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </form>
      }
    />
  );
};