"use client";
import React, { ReactNode, useState } from "react";
import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  UserCircle,
  Wallet,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { Modal } from "@/components/ui/modals/ConfirmationModal";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import withProtectedRoute from "@/lib/withProtectedRoutes";
import { Roles } from "@/constants/roles";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, route: "/interviewer" },
  {
    id: "profile",
    label: "Profile",
    icon: UserCircle,
    route: "/interviewer/profile",
  },
  {
    id: "interviews",
    label: "Interviews",
    icon: Calendar,
    route: "/interviewer/interviews",
  },
  { id: "wallet", label: "Wallet", icon: Wallet, route: "/interviewer/wallet" },
  {
    id: "payment",
    label: "Payment",
    icon: CreditCard,
    route: "/interviewer/payment",
  },
];

const InterviewerLayout = ({ children }: { children: ReactNode }) => {
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
      <Sidebar
        navItems={navItems}
        isModalOpen={isModalOpen}
        handleModalState={handleModalState}
      />
      {children}
    </>
  );
};

export default withProtectedRoute(InterviewerLayout,[Roles.INTERVIEWER]);
