"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { customerData} from "@/lib/mockData";
import TransactionsTable from "../../_components/TransactionsTable";
import VnubanHistoryTable from "../../_components/VnubanTable";

interface Customer {
  sN: number;
  customerName: string;
  vnuban: string;
  status: string;
  totalValue: number;
  totalTransactions: number;
  lastActivity: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CustomerProfilePage({ params }: PageProps) {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const { id } = await params;
      const foundCustomer = customerData.find((c) => c.sN.toString() === id);
      setCustomer(foundCustomer || null);
    };
    fetchCustomer();
  }, [params]);

  if (!customer) {
    return (
      <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-red-500 mb-4">Customer not found</div>
        <Button onClick={() => router.push("/customers")}>Back to Customers</Button>
      </div>
    );
  }

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FaLongArrowAltLeft
            className="bg-[#F5F5F5] dark:bg-card p-1 w-5 h-5 cursor-pointer"
            onClick={() => router.push("/customers")}
          />
          <h1 className="text-sm font-medium">
            <span className="text-[#A5A5A5]">Customers/</span>Customer Profile
          </h1>
        </div>
        <Button>
          Export
          <Download className="h-4 w-4 ml-2" />
        </Button>
      </div>
      <div className="w-full flex justify-between mb-4">
        <div className="w-[30%] border rounded-t-lg bg-card">
          <div className="flex items-center gap-2 pl-4 py-4 border-b">
            <Avatar>
              <AvatarFallback>{getInitials(customer.customerName)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{customer.customerName}</p>
            </div>
          </div>
          <div className="pl-4">
            <div className="flex flex-col gap-2 mb-3 mt-2">
              <span className="text-xs text-[#A5A5A5]">Status</span>
              <span
                className={`ml-2 text-sm ${customer.status === "Active" ? "text-green-500" : "text-red-500"}`}
              >
                {customer.status}
              </span>
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <span className="text-xs text-[#A5A5A5]">vNUBAN</span>
              <p className="text-sm">{customer.vnuban}</p>
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <span className="text-xs text-[#A5A5A5]">Total Value</span>
              <p className="text-sm">₦{customer.totalValue.toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <span className="text-xs text-[#A5A5A5]">Total Transactions</span>
              <p className="text-sm">{customer.totalTransactions}</p>
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <span className="text-xs text-[#A5A5A5]">Last Activity</span>
              <p className="text-sm">{customer.lastActivity}</p>
            </div>
          </div>
        </div>
        <div className="w-[68%] border rounded-t-lg">
          <div className="flex items-center justify-between gap-2 px-2 py-4 border-b bg-card">
            <div>
              <span className="text-xs text-[#A5A5A5]">Total vNUBANs Assigned</span>
              <p>1</p>
            </div>
            <div>
              <span className="text-xs text-[#A5A5A5]">Total Transactions</span>
              <p>{customer.totalTransactions}</p>
            </div>
            <div>
              <span className="text-xs text-[#A5A5A5]">Total Value Processed</span>
              <p>₦{customer.totalValue.toFixed(2)}</p>
            </div>
          </div>
          <div className="pl-3 pt-3 mt-4 border-t bg-card">
            <Tabs defaultValue="transactions">
              <TabsList className="dark:bg-background">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="vnuban-history">vNUBAN History</TabsTrigger>
              </TabsList>
              <TabsContent value="transactions">
                <TransactionsTable />
              </TabsContent>
              <TabsContent value="vnuban-history">
               <VnubanHistoryTable/>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}