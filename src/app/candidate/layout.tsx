"use client";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import Sidebar from "@/components/layout/Sidebar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/authStore";
import { useSignoutUser } from "@/hooks/api/useAuth";
import { ReactNode, useState } from "react";

import {
  CalendarSearchIcon,
  LayoutDashboard,
  UserCircle,
  Menu,
  Building2,
} from "lucide-react";
import { errorToast, successToast } from "@/utils/customToast";
import { useSidebarCollapseStore } from "@/features/sidebar/sidebarCollapseStore";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/candidate/dashboard",
    isDisabled: false,
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserCircle,
    route: "/candidate/profile",
    isDisabled: false,
  },
  {
    id: "interviews",
    label: "Interviews",
    icon: CalendarSearchIcon,
    route: "/candidate/interviews",
    isDisabled: false,
  },
];

const CandidateLayout = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const {isSidebarCollapsed,isMobileScreen}=useSidebarCollapseStore()
  const { logout } = useAuthStore();
  const { signoutUser } = useSignoutUser();
  function handleModalState(state: boolean) {
    setIsModalOpen(state);
  }
  async function handleModalConfirm() {
    setIsModalOpen(false);
    const response = await signoutUser();
    if (!response.success) {
      errorToast(response.message);
    }
    successToast(response.message);
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

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-950 border-b border-gray-800 text-white fixed top-0 left-0 right-0 z-30 h-16">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="Stratifii Logo" className="w-7 h-7 object-contain" />
          <span className="font-bold text-lg text-white">Stratifii</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 hover:bg-gray-800 rounded-lg text-white border border-gray-800"
        >
          <Menu size={20} />
        </button>
      </div>

      <Sidebar
        navItems={navItems}
        isModalOpen={isModalOpen}
        handleModalState={handleModalState}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      <div
        className="transition-all duration-300 min-h-screen pt-16 md:pt-0"
        style={{
          marginLeft: isMobileScreen ? 0 : isSidebarCollapsed ? 80 : 256,
        }}
      >
        <div className="h-full p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default CandidateLayout;
