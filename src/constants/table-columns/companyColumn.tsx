import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, Unlock, Lock, Shield, ShieldCheck, ShieldX } from "lucide-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ICompany } from "@/validations/CompanySchema";

export const getAdminCompanyColumns = ({
  onView,
  onBlockToggle,
  onOpenVerificationModal,
  activeTab,
}: {
  onView: (company: ICompany) => void;
  onBlockToggle: (id: string) => void;
  onOpenVerificationModal: (id: string, isVerifyOrReject: boolean) => void; 
  activeTab: string;
}): ColumnDef<ICompany>[] => [
  {
    accessorKey: "companyName",
    header: "Company",
    size: 200,
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {company.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-violet-100">{company.name}</div>
            <div className="text-xs text-violet-400">Company</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Contact",
    size: 180,
    cell: ({ row }) => (
      <div>
        <div className="text-violet-200">{row.original.email}</div>
        <div className="text-xs text-violet-400">Primary Email</div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    size: 120,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div>
          <div className="text-violet-200">{date.toLocaleDateString()}</div>
          <div className="text-xs text-violet-400">
            {date.toLocaleDateString("en-US", { weekday: "short" })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Verification",
    size: 140,
    cell: ({ row }) => {
      const { status } = row.original;
      const getStatusConfig = (status: string) => {
        switch (status.toLowerCase()) {
          case "approved":
            return {
              icon: ShieldCheck,
              bg: "bg-emerald-500/10",
              text: "text-emerald-400",
              border: "border-emerald-500/20",
              label: "Verified",
            };
          case "pending":
            return {
              icon: Shield,
              bg: "bg-amber-500/10",
              text: "text-amber-400",
              border: "border-amber-500/20",
              label: "Pending",
            };
          case "rejected":
            return {
              icon: ShieldX,
              bg: "bg-red-500/10",
              text: "text-red-400",
              border: "border-red-500/20",
              label: "Rejected",
            };
          default:
            return {
              icon: Shield,
              bg: "bg-gray-500/10",
              text: "text-gray-400",
              border: "border-gray-500/20",
              label: "Unknown",
            };
        }
      };

      const config = getStatusConfig(status);
      const Icon = config.icon;

      return (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.bg} ${config.text} ${config.border}`}
        >
          <Icon size={14} />
          <span className="text-xs font-medium">{config.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isBlocked",
    header: "Status",
    size: 120,
    cell: ({ row }) => {
      const { isBlocked } = row.original;
      return (
        <div
          className={`inline-flex items-center justify-center gap-2 px-2 py-1.5 rounded-full border ${
            isBlocked
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          }`}
        >
          <span className="text-xs font-medium">
            {isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    size: 160,
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-1">
          {/* View Button */}
          <button
            onClick={() => onView(company)}
            className="p-2 rounded-lg bg-violet-600/10 hover:bg-violet-600/20 text-violet-300 hover:text-violet-200 transition-all duration-200 group"
            title="View Details"
          >
            <EyeIcon size={16} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* Block/Unblock Button */}
          <button
            onClick={() => onBlockToggle(company._id!)}
            className={`p-2 rounded-lg transition-all duration-200 group ${
              company.isBlocked
                ? "bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300"
                : "bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300"
            }`}
            title={company.isBlocked ? "Unblock" : "Block"}
          >
            {company.isBlocked ? (
              <Unlock size={16} className="group-hover:scale-110 transition-transform" />
            ) : (
              <Lock size={16} className="group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Verification Buttons (only show if pending) */}
          {activeTab === "pending" && (
            <>
              <button
                onClick={() => onOpenVerificationModal(company._id!, false)}
                className="p-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-all duration-200 group"
                title="Reject Company"
              >
                <FaTimes className="text-[14px] group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => onOpenVerificationModal(company._id!, true)}
                className="p-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 transition-all duration-200 group"
                title="Verify Company"
              >
                <FaCheck className="text-[14px] group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}
        </div>
      );
    },
  },
];
