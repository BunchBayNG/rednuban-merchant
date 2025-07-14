"use client";

import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./Mobile-sidebar";

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

interface NavbarProps {
  customers: Customer[];
}

export const Navbar = ({ customers }: NavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm bg-card">
      <MobileSidebar />
      <NavbarRoutes customers={customers} />
    </div>
  );
};