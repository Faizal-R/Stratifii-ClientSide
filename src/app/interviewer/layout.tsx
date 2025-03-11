"use client";
import React, { ReactNode } from "react";
import { Calendar, CreditCard, LayoutDashboard, UserCircle, Wallet } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "interviews", label: "Interviews", icon: Calendar },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "payment", label: "Payment", icon: CreditCard },
];

const InterviewerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Sidebar navItems={navItems} />
      {children}
    </>
  );
};

export default InterviewerLayout;
