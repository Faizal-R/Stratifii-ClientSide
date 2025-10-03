import { 
  Calendar, 
  CalendarSearchIcon, 
  CreditCard, 
  LayoutDashboard, 

  UserCircle, 
  Wallet 
} from "lucide-react";

 export const getCompanySidebarRoutes = (isAdminVerified: boolean) => {
  return [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      route: "/company/dashboard",
      isDisabled: !isAdminVerified,
    },
    {
      id: "profile",
      label: "Profile",
      icon: UserCircle,
      route: "/company/profile",
      isDisabled: false,
    },
    {
      id: "delegation",
      label: "Interview Delegation",
      icon: Calendar,
      route: "/company/interview-delegation",
      isDisabled: !isAdminVerified,
    },
    {
      id: "schedule-interview",
      label: "Schedule Interviews",
      icon: CalendarSearchIcon,
      route: "/company/schedule-interview",
      isDisabled: !isAdminVerified,
    },
    {
      id: "subscription",
      label: "Subscription",
      icon: CreditCard,
      route: "/company/subscription",
      isDisabled: !isAdminVerified,
    },
    // {
    //   id: "payments",
    //   label: "Payments",
    //   icon: Receipt,
    //   route: "/company/payments",
    //   isDisabled: !isAdminVerified,
    // },
    // { 
    //   id: "wallet", 
    //   label: "Wallet", 
    //   icon: Wallet, 
    //   route: "/company/wallet",
    //   isDisabled: !isAdminVerified,
    // },
  ];
};


