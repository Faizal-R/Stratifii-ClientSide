import { User, Banknote } from "lucide-react";

const interviewerProfileTabs = [
  {
    key: "profile",
    label: "Profile",
    icon: <User className="w-4 h-4" />,
  },
  {
    key: "bank",
    label: "Bank Details",
    icon: <Banknote className="w-4 h-4" />,
  },
];

export { interviewerProfileTabs };