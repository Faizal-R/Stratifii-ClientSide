"use client";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import Sidebar from "@/components/layout/Sidebar";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/authStore";
import { useSignoutUser } from "@/hooks/api/useAuth";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { CalendarSearchIcon, CreditCard, LayoutDashboard, UserCircle } from "lucide-react";
import withProtectedRoute from "@/lib/withProtectedRoutes";
import { Roles } from "@/constants/roles";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/candidate",
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserCircle,
    route: "/candidate/profile",
  },
  {
    id: "interviews",
    label: "Interviews",
    icon:CalendarSearchIcon,
    route: "/candidate/interviews",
  },
];

const CandidateLayout = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();
  const { signoutUser } = useSignoutUser();
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

export default withProtectedRoute(CandidateLayout,[Roles.CANDIDATE,Roles.INTERVIEWER]);
