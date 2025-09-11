"use client"
import Sidebar from '@/components/layout/Sidebar'
import { ReactNode, useState } from "react";
import { 
    LayoutDashboard, 
    Briefcase, 
    Users, 
    CreditCard, 
    Receipt, 
    Wallet, 
    LogOut 
  } from "lucide-react";
import { Modal } from '@/components/ui/Modals/ConfirmationModal';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/authStore';
  import { useSignoutUser } from "@/hooks/api/useAuth";
import { toast } from 'sonner';
import { errorToast, successToast } from '@/utils/customToast';
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, route: "/admin/dashboard" },
    { id: "company", label: "Company", icon: Briefcase, route: "/admin/company" },
    { id: "interviewers", label: "Interviewers", icon: Users, route: "/admin/interviewers" },
    { id: "subscription", label: "Subscription", icon: CreditCard, route: "/admin/subscription" },
    { id: "payments", label: "Payments", icon: Receipt, route: "/admin/payments" },
    { id: "wallet", label: "Wallet", icon: Wallet, route: "/admin/wallet" },
  ];
  
  
export default function AdminLayout({children}:{children:ReactNode}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signoutUser } = useSignoutUser();
  const router = useRouter();
  const { logout } = useAuthStore();
  function handleModalState(state: boolean) {
    setIsModalOpen(state);
  }
 async function handleModalConfirm() {
    setIsModalOpen(false);
    const response = await signoutUser();
    if (!response.success) {
     errorToast(response.message);
    }
    logout()
    successToast(response.message);
    router.push("/signin");
  }
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmText="Logout"
        onConfirm={handleModalConfirm}
      />
      <Sidebar
        navItems={navItems}
        isModalOpen={isModalOpen}
        handleModalState={handleModalState}
      />
      {children}
    </>
  );
}