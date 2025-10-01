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
  const router = useRouter();
  const {isSidebarCollapsed}=useSidebarCollapseStore()
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
};

export default CandidateLayout;
