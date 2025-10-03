import { Calendar, CalendarCheck, UserCircle, Wallet } from "lucide-react";



export const getInterviewerSidebarRoutes = (isAdminVerified: boolean) => {
  
  return [
    {
      id: "profile",
      label: "Profile",
      icon: UserCircle,
      route: "/interviewer/profile",
      isDisabled:false
    },
    {
      id: "schedule-manager",
      label: "Schedule Manager",
      icon: CalendarCheck,
      route: "/interviewer/schedule-manager",
      isDisabled:!isAdminVerified
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: Calendar,
      route: "/interviewer/interviews",
      isDisabled:!isAdminVerified
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: Wallet,
      route: "/interviewer/wallet",
        isDisabled:!isAdminVerified
    },
    // {
    //   id: "payment",
    //   label: "Payment",
    //   icon: CreditCard,
    //   route: "/interviewer/payment",
    // },
  ];
};
