"use client";
import React, { ReactNode, useState } from "react";
import {
  Calendar,
 
  UserCircle,
  Wallet,
  CalendarCheck,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import { useRouter } from "next/navigation";


import { useSignoutUser } from "@/hooks/api/useAuth";

import {  useAuthStore } from "@/features/auth/authStore";
import { errorToast, successToast } from "@/utils/customToast";
import { useSidebarCollapseStore } from "@/features/sidebar/sidebarCollapseStore";
import { getInterviewerSidebarRoutes } from "@/constants/routes/sidebar/InterviewerSidebarRoutes";

import { useUserSocket } from "@/hooks/socket/useUserSocket";

const navItems = [
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
  // {
  //   id: "payment",
  //   label: "Payment",
  //   icon: CreditCard,
  //   route: "/interviewer/payment",
  // },
];

const InterviewerLayout = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const { isSidebarCollapsed } = useSidebarCollapseStore();
  const { signoutUser } = useSignoutUser();

  useUserSocket(); // make sure socket updates user status in real-time

  function handleModalState(state: boolean) {
    setIsModalOpen(state);
  }

  async function handleModalConfirm() {
    setIsModalOpen(false);
    const response = await signoutUser();
    if (!response.success) {
      errorToast(response.message);
      return;
    }
    successToast(response.message);
    logout();
    router.push("/signin");
  }

  // Wait until user is loaded
  if (!user) return null; // or a loading spinner

  const navItems = getInterviewerSidebarRoutes(user.status === "approved");
  
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
      <div
        className="transition-all duration-300 h-screen"
        style={{ marginLeft: isSidebarCollapsed ? 80 : 256 }}
      >
        {children}
      </div>
    </>
  );
};


export default InterviewerLayout;
