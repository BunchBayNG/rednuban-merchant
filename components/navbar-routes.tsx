"use client";

import { SearchInput } from "./SearchInput";
import Notification from "./svg Icons/Notification";

interface Customer {
  sN: string;
  customerName: string; // Changed from merchantName
  code: string;
  accountName: string;
  accountNumber: string;
  primaryContact: string;
  status: string;
  noOfUsers: number;
  createdAt: string;
}

interface NavbarRoutesProps {
  customers: Customer[];
}

export const NavbarRoutes = ({ customers }: NavbarRoutesProps) => {
  return (
    <div className="flex items-center justify-between gap-6 w-full p-4">
      <div className="hidden md:block max-w-md pl-4">
        <h1 className="font-semibold">Merchant Service</h1>
      </div>
      <div className="flex items-center gap-3">
        <SearchInput transactions={[]} vnubans={[]} customers={customers} />
        <Notification />
      </div>
    </div>
  );
};