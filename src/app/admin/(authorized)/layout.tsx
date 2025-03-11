"use client"
import Sidebar from '@/components/layout/Sidebar'
import { ReactNode } from "react";
import { 
    LayoutDashboard, 
    Briefcase, 
    Users, 
    CreditCard, 
    Receipt, 
    Wallet, 
    LogOut 
  } from "lucide-react";
  
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "company", label: "Interview Delegation", icon: Briefcase }, 
    { id: "interviewers", label: "Interviewers", icon: Users },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "payments", label: "Payments", icon: Receipt },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "logout", label: "Logout", icon: LogOut }
  ];
  
export default function CompanyLayout({children}:{children:ReactNode}){
  return <>
  <Sidebar navItems={navItems}/>
  {children}
    
  </>
}