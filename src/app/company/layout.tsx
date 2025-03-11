"use client"
import Sidebar from '@/components/layout/Sidebar'
import { ReactNode } from "react";
import { Calendar, CreditCard, LayoutDashboard, Receipt, UserCircle, Users, Wallet } from 'lucide-react';
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "delegation", label: "Interview Delegation", icon: Calendar },
  { id: "interviewers", label: "Interviewers", icon: Users },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "payments", label: "Payments", icon: Receipt },
  { id: "wallet", label: "Wallet", icon: Wallet },
];
export default function CompanyLayout({children}:{children:ReactNode}){
  return <>
  <Sidebar navItems={navItems}/>
  {children}
    
  </>
}