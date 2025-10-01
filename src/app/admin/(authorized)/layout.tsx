"use client";
import Sidebar from "@/components/layout/Sidebar";
import { ReactNode, useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  CreditCard,
  Receipt,

  FileText,
} from "lucide-react";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/authStore";
import { useSignoutUser } from "@/hooks/api/useAuth";

import { errorToast, successToast } from "@/utils/customToast";
import { useSidebarCollapseStore } from "@/features/sidebar/sidebarCollapseStore";
const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/admin/dashboard",
  },
  { id: "company", label: "Company", icon: Briefcase, route: "/admin/company" },
  {
    id: "interviewers",
    label: "Interviewers",
    icon: Users,
    route: "/admin/interviewers",
  },
  {
    id: "subscription",
    label: "Subscription",
    icon: CreditCard,
    route: "/admin/subscription",
  },
  {
    id: "payments",
    label: "Payments",
    icon: Receipt,
    route: "/admin/payments",
  },

  { id: "payouts", label: " Payouts", icon: FileText, route: "/admin/payouts" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isSidebarCollapsed } = useSidebarCollapseStore();
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
    logout();
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
      <div
        className="transition-all duration-300"
        style={{ marginLeft: isSidebarCollapsed ? 80 : 256 }}
      >
        {children}
      </div>
    </>
  );
}
