"use client"; // 👈 Add this at the top!

import Sidebar from "@/components/layout/Sidebar";
import { ReactNode, useState } from "react";

import { useRouter } from "next/navigation";
import {  useAuthStore } from "@/features/auth/authStore";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import { useSignoutUser } from "@/hooks/api/useAuth";
import { errorToast, successToast } from "@/utils/customToast";

import { getCompanySidebarRoutes } from "@/constants/routes/sidebar/CompanySidebarRotues";
import { useSidebarCollapseStore } from "@/features/sidebar/sidebarCollapseStore";


function CompanyLayout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { isSidebarCollapsed } = useSidebarCollapseStore();
  const { logout } = useAuthStore();
  const { signoutUser } = useSignoutUser();
  const { user } = useAuthStore();
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
  if (!user) return null; 

  const navItems = getCompanySidebarRoutes(user.status === "approved");

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

export default CompanyLayout;
