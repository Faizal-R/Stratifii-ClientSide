"use client";
import React, { useEffect, useState } from "react";
import {
  CreditCard,
  Calendar,
  DollarSign,
  Users,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

import { ISubscriptionDetails } from "@/types/ISubscription";
import { IJob, IPaymentTransaction } from "@/types/IJob";
import { formatDate } from "@/utils/dateHelper";
import { useGetCompanyPaymentHistory } from "@/hooks/api/usePayment";
import { useAuthStore } from "@/features/auth/authStore";
import { errorToast } from "@/utils/customToast";

type TabType = "all" | "subscriptions" | "interviews";

const PaymentHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };
  const { user } = useAuthStore();
  const { loading, getCompanyPaymentHistory } = useGetCompanyPaymentHistory();

  const [paymentHistory, setPaymentHistory] = useState<{
    interviewProcessPayments: IPaymentTransaction[];
    subscriptionPayments: ISubscriptionDetails[];
    totalSpendOnInterview: number;
    totalSpendOnSubscription: number;
  } | null>(null);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      PAID: "bg-green-500/20 text-green-400 border-green-500/30",
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      FAILED: "bg-red-500/20 text-red-400 border-red-500/30",
      expired: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      canceled: "bg-red-500/20 text-red-400 border-red-500/30",
      REFUNDED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };

    const statusIcons = {
      PAID: <CheckCircle className="w-3 h-3" />,
      active: <CheckCircle className="w-3 h-3" />,
      PENDING: <Clock className="w-3 h-3" />,
      FAILED: <XCircle className="w-3 h-3" />,
      expired: <XCircle className="w-3 h-3" />,
      canceled: <XCircle className="w-3 h-3" />,
      REFUNDED: <TrendingUp className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
          statusStyles[status as keyof typeof statusStyles]
        }`}
      >
        {statusIcons[status as keyof typeof statusIcons]}
        {status.toUpperCase()}
      </span>
    );
  };




  const fetchCompanyPaymentHistory = async () => {
    const res = await getCompanyPaymentHistory(user?.id as string);
    if (!res.success) {
      errorToast(res.message);
    }

    setPaymentHistory(res.data);
  };

  useEffect(() => {
    fetchCompanyPaymentHistory();
    console.log("paymentHistory", paymentHistory);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-violet-400 bg-clip-text text-transparent">
            Payment History
          </h1>
          <p className="text-gray-400">
            Track your subscription and interview payment transactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-violet-900/30 to-violet-950/50 backdrop-blur-sm border border-violet-500/20 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-violet-500/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-violet-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Spent</p>
            <p className="text-3xl font-bold">
              {formatCurrency(
                (paymentHistory?.totalSpendOnInterview ?? 0) +
                (paymentHistory?.totalSpendOnSubscription ?? 0)
              )}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Subscription Spend</p>
            <p className="text-3xl font-bold">
              {formatCurrency(paymentHistory?.totalSpendOnSubscription || 0)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-950/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Interview Spend</p>
            <p className="text-3xl font-bold">
              {formatCurrency(paymentHistory?.totalSpendOnInterview || 0)}
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "all"
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/50"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  All Transactions
                </button>
                <button
                  onClick={() => setActiveTab("subscriptions")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "subscriptions"
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/50"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  Subscriptions
                </button>
                <button
                  onClick={() => setActiveTab("interviews")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "interviews"
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/50"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  Interviews
                </button>
              </div>

              {/* <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg font-medium transition-all shadow-lg shadow-violet-500/30">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div> */}
            </div>
          </div>

          <div className="overflow-x-auto">
            {(activeTab === "all" || activeTab === "subscriptions") && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-violet-400" />
                  Subscription Payments
                </h2>
                <div className="space-y-4">
                  {paymentHistory?.subscriptionPayments.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      No subscription payments found
                    </div>
                  ) : (
                    (paymentHistory?.subscriptionPayments || []).map(
                      (sub: ISubscriptionDetails) => (
                        <div
                          key={sub._id}
                          className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-5 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-white mb-1">
                                    {sub.planDetails.name}
                                  </h3>
                                  <p className="text-sm text-gray-400">
                                    Transaction ID:{" "}
                                    <span className="text-violet-400 font-mono">
                                      {sub.transactionId}
                                    </span>
                                  </p>
                                </div>
                                {getStatusBadge(sub.status)}
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500 mb-1">
                                    Start Date
                                  </p>
                                  <p className="text-white font-medium">
                                    {formatDate(sub.startDate)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">End Date</p>
                                  <p className="text-white font-medium">
                                    {formatDate(sub.endDate)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">
                                    Candidate Slots
                                  </p>
                                  <p className="text-white font-medium">
                                    {
                                      sub.planDetails.features
                                        .candidateSlotPerMonth
                                    }
                                    /month
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">
                                    Job Posts
                                  </p>
                                  <p className="text-white font-medium">
                                    {
                                      sub.planDetails.features
                                        .jobPostLimitPerMonth
                                    }
                                    /month
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="lg:text-right">
                              <div className="inline-flex items-center gap-2 px-4 py-3 bg-violet-600/20 rounded-lg border border-violet-500/30">
                                <DollarSign className="w-5 h-5 text-violet-400" />
                                <span className="text-2xl font-bold text-white">
                                  {formatCurrency(sub.planDetails.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            )}

            {(activeTab === "all" || activeTab === "interviews") && (
              <div className="p-6 border-t border-white/10">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  Interview Process Payments
                </h2>
                <div className="space-y-4">
                  {paymentHistory?.interviewProcessPayments.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      No interview payments found
                    </div>
                  ) : (
                    (paymentHistory?.interviewProcessPayments || []).map(
                      (payment: IPaymentTransaction) => (
                        <div
                          key={payment._id}
                          className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-5 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-white mb-1">
                                    {(payment.job as IJob).position}
                                  </h3>
                                  <p className="text-sm text-gray-400 mb-2">
                                    {payment.paymentGatewayTransactionId && (
                                      <>
                                        Transaction ID:{" "}
                                        <span className="text-emerald-400 font-mono">
                                          {payment.paymentGatewayTransactionId}
                                        </span>
                                      </>
                                    )}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {(payment.job as IJob).requiredSkills
                                      .slice(0, 3)
                                      .map((skill, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    {(payment.job as IJob).requiredSkills
                                      .length > 3 && (
                                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400">
                                        +
                                        {(payment.job as IJob).requiredSkills
                                          .length - 3}{" "}
                                        more
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {getStatusBadge(payment.status)}
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500 mb-1">
                                    Candidates
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4 text-emerald-400" />
                                    <p className="text-white font-medium">
                                      {payment.candidatesCount}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">
                                    Price/Interview
                                  </p>
                                  <p className="text-white font-medium">
                                    {formatCurrency(payment.pricePerInterview)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">Subtotal</p>
                                  <p className="text-white font-medium">
                                    {formatCurrency(payment.totalAmount)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">
                                    Tax + Fee
                                  </p>
                                  <p className="text-white font-medium">
                                    {formatCurrency(
                                      payment.taxAmount + payment.platformFee
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">Date</p>
                                  <p className="text-white font-medium">
                                    {formatDate(payment.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="lg:text-right">
                              <div className="inline-flex items-center gap-2 px-4 py-3 bg-emerald-600/20 rounded-lg border border-emerald-500/30">
                                <DollarSign className="w-5 h-5 text-emerald-400" />
                                <span className="text-2xl font-bold text-white">
                                  {formatCurrency(payment.finalPayableAmount)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
