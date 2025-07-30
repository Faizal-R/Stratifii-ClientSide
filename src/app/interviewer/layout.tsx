"use client";
import React, { ReactNode, useState } from "react";
import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  UserCircle,
  Wallet,
  CalendarCheck
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import { useRouter } from "next/navigation";

import withProtectedRoute from "@/lib/withProtectedRoutes";
import { Roles } from "@/constants/roles";
import { useSignoutUser } from "@/hooks/api/useAuth";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/authStore";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, route: "/interviewer" },
  {
    id: "profile",
    label: "Profile",
    icon: UserCircle,
    route: "/interviewer/profile",
  },
  {
    id: "schedule-manager",
    label: "Schedule Manager",
    icon: CalendarCheck,
    route: "/interviewer/schedule-manager",
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
 const {logout}=useAuthStore()
  const {signoutUser}=useSignoutUser()
  function handleModalState(state: boolean) {
    setIsModalOpen(state);
  }
  async function handleModalConfirm() {
    setIsModalOpen(false);
    const response = await signoutUser();
    if (!response.success) {
      toast.error(response.error, {
        className: "custom-error-toast",
      });
    }
    toast.success(response.message);
    logout()
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
