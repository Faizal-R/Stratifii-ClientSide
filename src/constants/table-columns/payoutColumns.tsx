import { ColumnDef } from "@tanstack/react-table";
import {
  Eye,
  Check,
  X,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  User,
} from "lucide-react";
import { IPayoutRequest, TPayoutStatus } from "@/types/IPayout"; // define types separately

// Status UI config (similar to your StatusBadge)
const getStatusConfig = (status: TPayoutStatus) => {
  switch (status) {
    case "pending":
      return {
        icon: Clock,
        bg: "bg-yellow-500/10",
        text: "text-yellow-400",
        border: "border-yellow-500/20",
        label: "Pending",
      };
    case "approved":
      return {
        icon: CheckCircle,
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
        label: "Approved",
      };
    case "rejected":
      return {
        icon: XCircle,
        bg: "bg-red-500/10",
        text: "text-red-400",
        border: "border-red-500/20",
        label: "Rejected",
      };
    case "processing":
      return {
        icon: Loader,
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "border-purple-500/20",
        label: "Processing",
      };
    case "completed":
      return {
        icon: CheckCircle,
        bg: "bg-green-500/10",
        text: "text-green-400",
        border: "border-green-500/20",
        label: "Completed",
      };
    case "failed":
      return {
        icon: AlertCircle,
        bg: "bg-red-600/10",
        text: "text-red-400",
        border: "border-red-600/20",
        label: "Failed",
      };
    default:
      return {
        icon: Clock,
        bg: "bg-gray-500/10",
        text: "text-gray-400",
        border: "border-gray-500/20",
        label: "Unknown",
      };
  }
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const getAdminPayoutColumns = ({
  onView,
  onStatusUpdate,
}: {
  onView: (payout: IPayoutRequest) => void;
  onStatusUpdate: (payoutId: string, newStatus: TPayoutStatus) => void;
}): ColumnDef<IPayoutRequest>[] => [
  {
    accessorKey: "interviewerName",
    header: "Interviewer",
    size: 220,
    cell: ({ row }) => {
      const { interviewerName, interviewerId } = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/20 rounded-lg">
            <User className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <div className="font-medium text-violet-100">{interviewerName}</div>
            <div className="text-xs text-violet-400">{interviewerId}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 140,
    cell: ({ row }) => (
      <div className="text-white font-semibold">
        {formatCurrency(row.original.amount)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 160,
    cell: ({ row }) => {
      const config = getStatusConfig(row.original.status);
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
    accessorKey: "requestedAt",
    header: "Requested At",
    size: 180,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-gray-300">
        <Calendar size={14} />
        <span>{formatDate(row.original.requestedAt)}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    size: 200,
    cell: ({ row }) => {
      const payout = row.original;
      return (
        <div className="flex items-center gap-2">
          {/* View Details */}
          <button
            onClick={() => onView(payout)}
            className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>

          {/* Pending → Approve / Reject */}
          {payout.status === "pending" && (
            <>
              <button
                onClick={() => onStatusUpdate(payout._id, "approved")}
                className="p-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 transition-colors"
                title="Approve"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => onStatusUpdate(payout._id, "rejected")}
                className="p-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
                title="Reject"
              >
                <X size={16} />
              </button>
            </>
          )}

          {/* Approved → Process */}
          {payout.status === "approved" && (
            <button
              onClick={() => onStatusUpdate(payout._id, "processing")}
              className="px-3 py-1 rounded-lg bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors"
            >
              Process
            </button>
          )}

          {/* Processing → Complete */}
          {payout.status === "processing" && (
            <button
              onClick={() => onStatusUpdate(payout._id, "completed")}
              className="px-3 py-1 rounded-lg bg-green-600/10 hover:bg-green-600/20 text-green-400 hover:text-green-300 text-xs font-medium transition-colors"
            >
              Complete
            </button>
          )}
        </div>
      );
    },
  },
];
