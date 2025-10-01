"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  Clock,
  DollarSign,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";

type PayoutStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "processing"
  | "completed"
  | "failed";

interface PayoutRequest {
  _id: string;
  interviewerId: string;
  interviewerName: string;
  amount: number;
  status: PayoutStatus;
  requestedAt: string;
  approvedAt?: string;
  processedAt?: string;
  payoutId?: string;
  failureReason?: string;
  adminId?: string;
}

// Mock data for demonstration

const statusConfig = {
  pending: {
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: Clock,
    label: "Pending",
  },
  approved: {
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: CheckCircle,
    label: "Approved",
  },
  rejected: {
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    icon: XCircle,
    label: "Rejected",
  },
  processing: {
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: Loader,
    label: "Processing",
  },
  completed: {
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    icon: CheckCircle,
    label: "Completed",
  },
  failed: {
    color: "bg-red-600/20 text-red-400 border-red-600/30",
    icon: AlertCircle,
    label: "Failed",
  },
};
import { GenericTable } from "@/components/reusable/table/GenericTable";
import { getAdminPayoutColumns } from "@/constants/table-columns/payoutColumns";
import {
  useUpdateStatusOfInterviewerPayoutRequest,
  useGetAllInterviewersPayoutRequest,
} from "@/hooks/api/usePayout";
import { errorToast, successToast } from "@/utils/customToast";
function StatusBadge({ status }: { status: PayoutStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${config.color}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </div>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
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

function AdminPayouts() {
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<PayoutStatus | "all">("all");
  const [selectedRequest, setSelectedRequest] = useState<PayoutRequest | null>(
    null
  );

  const { updateInterviewerPayoutRequestStatus } =
    useUpdateStatusOfInterviewerPayoutRequest();
  const { getAllInterviewersPayoutRequest } =
    useGetAllInterviewersPayoutRequest();

  // const filteredRequests = useMemo(() => {
  //   return payoutRequests.filter((request) => {
  //     const matchesSearch =
  //       request.interviewerName
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase()) ||
  //       request.interviewerId.toLowerCase().includes(searchTerm.toLowerCase());
  //     const matchesStatus =
  //       statusFilter === "all" || request.status === statusFilter;
  //     return matchesSearch && matchesStatus;
  //   });
  // }, [payoutRequests, searchTerm, statusFilter]);

  //   const stats = useMemo(() => {
  //     const totalRequests = payoutRequests.length;
  //     const totalAmount = payoutRequests.reduce(
  //       (sum, req) => sum + req.amount,
  //       0
  //     );
  //     const pendingRequests = payoutRequests.filter(
  //       (req) => req.status === "pending"
  //     ).length;
  //     const completedAmount = payoutRequests
  //       .filter((req) => req.status === "completed")
  //       .reduce((sum, req) => sum + req.amount, 0);

  //     return { totalRequests, totalAmount, pendingRequests, completedAmount };
  //   }, [payoutRequests]);

  const handleStatusUpdate = async (
    requestId: string,
    newStatus: PayoutStatus
  ) => {
    const res = await updateInterviewerPayoutRequestStatus(
      requestId,
      newStatus
    );
    if (!res.success) {
      errorToast(res.message);
      return;
    }
    successToast(res.message);

    setPayoutRequests((prev) =>
      prev.map((req) =>
        req._id === requestId
          ? {
              ...req,
              status: newStatus,
              approvedAt:
                newStatus === "approved"
                  ? new Date().toISOString()
                  : req.approvedAt,
              processedAt:
                newStatus === "completed"
                  ? new Date().toISOString()
                  : req.processedAt,
            }
          : req
      )
    );
  };

  const columns = getAdminPayoutColumns({
    onStatusUpdate: handleStatusUpdate,
    onView: (payout) => setSelectedRequest(payout),
  });

  const fetchAllInterviewersPayoutRequests = async () => {
    const res = await getAllInterviewersPayoutRequest();
    if (!res.success) {
      errorToast(res.message);
      return;
    }
    setPayoutRequests(res.data);
  };

  useEffect(() => {
    fetchAllInterviewersPayoutRequests();
  }, []);

  return (
    <div className="min-h-screen custom-64 bg-gradient-to-br from-black via-black to-violet-950">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-violet-400" />
            Payout Requests
          </h1>
          <p className="text-gray-300">
            Manage and process interviewer payout requests
          </p>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Requests</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalRequests}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(stats.totalAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-white">
                  {stats.pendingRequests}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Completed Value</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(stats.completedAmount)}
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Filters and Search */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by interviewer name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as PayoutStatus | "all")
                }
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <GenericTable columns={columns} data={payoutRequests} />

        {/* Detailed View Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Payout Request Details
                  </h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-violet-500/20 rounded-lg">
                      <User className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Interviewer</p>
                      <p className="text-white font-semibold text-lg">
                        {selectedRequest.interviewerName}
                      </p>
                      <p className="text-gray-400">
                        {selectedRequest.interviewerId}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Amount</p>
                      <p className="text-white font-bold text-2xl">
                        {formatCurrency(selectedRequest.amount)}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm mb-2">Status</p>
                      <StatusBadge status={selectedRequest.status} />
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm mb-2">Requested At</p>
                      <p className="text-white">
                        {formatDate(selectedRequest.requestedAt)}
                      </p>
                    </div>

                    {selectedRequest.approvedAt && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">
                          Approved At
                        </p>
                        <p className="text-white">
                          {formatDate(selectedRequest.approvedAt)}
                        </p>
                      </div>
                    )}

                    {selectedRequest.processedAt && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">
                          Processed At
                        </p>
                        <p className="text-white">
                          {formatDate(selectedRequest.processedAt)}
                        </p>
                      </div>
                    )}

                    {selectedRequest.payoutId && (
                      <div className="md:col-span-2">
                        <p className="text-gray-400 text-sm mb-2">Payout ID</p>
                        <p className="text-white font-mono bg-gray-800/50 px-3 py-2 rounded-lg">
                          {selectedRequest.payoutId}
                        </p>
                      </div>
                    )}

                    {selectedRequest.failureReason && (
                      <div className="md:col-span-2">
                        <p className="text-gray-400 text-sm mb-2">
                          Failure Reason
                        </p>
                        <p className="text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                          {selectedRequest.failureReason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPayouts;
