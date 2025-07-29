// components/adminCompanyColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ICompany } from "@/validations/CompanySchema";

export const getAdminCompanyColumns = ({
  onView,
  onBlockToggle,
  onVerify,
  onReject,
  activeTab,
}: {
  onView: (company: ICompany) => void;
  onBlockToggle: (id: string) => void;
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
  activeTab: string;
}): ColumnDef<ICompany>[] => [
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2">
          <span>{company.companyName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    accessorKey: "createdAt",
    header: "Joined Date",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    accessorKey: "isBlocked",
    header: "Status",
    cell: ({ row }) => {
      const { isBlocked } = row.original;
      return (
        <div className="flex gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isBlocked
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isBlocked ? "Blocked" : "Active"}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isBlocked
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {row.original.status}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const company = row.original;

      return (
        <div className="flex gap-2 justify-end">
          <button onClick={() => onView(company)} title="View Details">
            <EyeIcon size={18} className="text-violet-300 hover:text-white" />
          </button>
          <button
            onClick={() => onBlockToggle(company._id!)}
            className={`text-sm px-3 py-1 rounded-lg ${
              company.isBlocked
                ? "bg-green-50 text-green-700 hover:bg-green-100"
                : "bg-red-50 text-red-700 hover:bg-red-100"
            }`}
          >
            {company.isBlocked ? "Unblock" : "Block"}
          </button>

          {activeTab === "pending" && (
            <div className="flex gap-2">
              <button onClick={() => onReject(company._id!)}>
                <FaTimes className="text-red-500 hover:text-red-700" />
              </button>
              <button onClick={() => onVerify(company._id!)}>
                <FaCheck className="text-green-500 hover:text-green-700" />
              </button>
            </div>
          )}
        </div>
      );
    },
  },
];
