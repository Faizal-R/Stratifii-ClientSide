"use client"; // 👈 Add this at the top!

import Sidebar from "@/components/layout/Sidebar";
import { ReactNode, useState } from "react";
import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  Receipt,
  UserCircle,
  Users,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation"; 
import { useAuthStore } from "@/stores/authStore";
import { Modal } from "@/components/ui/modals/ConfirmationModal";
import withProtectedRoute from "@/lib/withProtectedRoutes";
import { Roles } from "@/constants/roles";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, route: "/company" },
  { id: "profile", label: "Profile", icon: UserCircle, route: "/company/profile" },
  { id: "delegation", label: "Interview Delegation", icon: Calendar, route: "/company/interview-delegation" },
  { id: "interviewers", label: "Interviewers", icon: Users, route: "/company/interviewer" },
  { id: "subscription", label: "Subscription", icon: CreditCard, route: "/company/subscription" },
  { id: "payments", label: "Payments", icon: Receipt, route: "/company/payments" },
  { id: "wallet", label: "Wallet", icon: Wallet, route: "/company/wallet" },
];

 function CompanyLayout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();


  function handleModalState(state: boolean) {
    setIsModalOpen(state);
  }

  function handleModalConfirm() {
    setIsModalOpen(false);
    logout();
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
      <Sidebar navItems={navItems} isModalOpen={isModalOpen} handleModalState={handleModalState} />
      {children}
    </>
  );
}

export default withProtectedRoute(CompanyLayout,[Roles.COMPANY])
