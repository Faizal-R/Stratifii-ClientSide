"use client"; // 👈 Add this at the top!

import Sidebar from "@/components/layout/Sidebar";
import { ReactNode, useState } from "react";
import {
  Calendar,
  CalendarSearchIcon,
  CreditCard,
  LayoutDashboard,
  Receipt,
  UserCircle,
  Users,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/authStore";
import { Modal } from "@/components/ui/Modals/ConfirmationModal";
import withProtectedRoute from "@/lib/withProtectedRoutes";
import { Roles } from "@/constants/roles";
import { useSignoutUser } from "@/hooks/useAuth";
import { toast } from "sonner";


const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/company",
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserCircle,
    route: "/company/profile",
  },
  {
    id: "delegation",
    label: "Interview Delegation",
    icon: Calendar,
    route: "/company/interview-delegation",
  },
  {
id:"schedule-interview",
label:"Schedule Interviews",
icon:CalendarSearchIcon,
route:"/company/schedule-interview",
  },
  {
    id: "subscription",
    label: "Subscription",
    icon: CreditCard,
    route: "/company/subscription",
  },
  {
    id: "payments",
    label: "Payments",
    icon: Receipt,
    route: "/company/payments",
  },
  { id: "wallet", label: "Wallet", icon: Wallet, route: "/company/wallet" },
];

function CompanyLayout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
 
  const {logout}=useAuthStore()
  const { signoutUser } = useSignoutUser();

  function handleModalState(state: boolean) {
    setIsModalOpen(state);
  }

  async function handleModalConfirm() {
    setIsModalOpen(false);
    logout()
    const response = await signoutUser();
    if (!response.success) {
      toast.error(response.error, {
        className: "custom-error-toast",
      });
    }
    toast.success(response.message);
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

export default withProtectedRoute(CompanyLayout, [Roles.COMPANY]);
