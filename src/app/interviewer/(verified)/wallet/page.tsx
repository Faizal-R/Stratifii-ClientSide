"use client";
import React, { useEffect, useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Info,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import PayoutModal from "@/components/features/interviewer/wallet/PayoutModal";

import { useCreatePayoutRequest } from "@/hooks/api/usePayout";

import { errorToast, successToast } from "@/utils/customToast";
import { useAuthStore } from "@/features/auth/authStore";
import { useGetInterviewerWallet } from "@/hooks/api/useInterviewer";
import { ITransaction, IWallet } from "@/types/IWallet";
import { RiseLoader } from "react-spinners";

interface Transaction {
  id: string;
  date: string;
  type: "credit" | "debit";
  amount: number;
  source: string;
  referenceId?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "credit",
    amount: 1500,
    source: "Technical Interview - React Developer",
    referenceId: "TXN001",
  },
  {
    id: "2",
    date: "2024-01-14",
    type: "credit",
    amount: 2000,
    source: "System Design Interview - Senior Engineer",
    referenceId: "TXN002",
  },
  {
    id: "3",
    date: "2024-01-12",
    type: "debit",
    amount: 5000,
    source: "Payout to Bank Account",
    referenceId: "PYT001",
  },
  {
    id: "4",
    date: "2024-01-10",
    type: "credit",
    amount: 1200,
    source: "Behavioral Interview - Product Manager",
    referenceId: "TXN003",
  },
  {
    id: "5",
    date: "2024-01-08",
    type: "credit",
    amount: 1800,
    source: "Technical Interview - Full Stack Developer",
    referenceId: "TXN004",
  },
  {
    id: "6",
    date: "2024-01-05",
    type: "credit",
    amount: 2500,
    source: "Architecture Interview - Tech Lead",
    referenceId: "TXN005",
  },
  {
    id: "7",
    date: "2024-01-03",
    type: "debit",
    amount: 3000,
    source: "Payout to Bank Account",
    referenceId: "PYT002",
  },
  {
    id: "8",
    date: "2024-01-01",
    type: "credit",
    amount: 1600,
    source: "Code Review Interview - Senior Developer",
    referenceId: "TXN006",
  },
];

function WalletPage() {
  const [payoutAmount, setPayoutAmount] = useState(0);
  const [wallet, setWallet] = useState<IWallet>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const { getInterviewerWallet, loading: isFetchingWallet } =
    useGetInterviewerWallet();
  const { createPayoutRequest, loading: isPayoutRequestLoading } =
    useCreatePayoutRequest();
  const itemsPerPage = 5;
  const { user } = useAuthStore();

  // Calculate wallet stats
  const currentBalance = 4600;
  // const totalEarned = mockTransactions
  //   .filter((t) => t.type === "credit")
  //   .reduce((sum, t) => sum + t.amount, 0);
  // const totalSpent = mockTransactions
  //   .filter((t) => t.type === "debit")
  //   .reduce((sum, t) => sum + t.amount, 0);

  const minPayoutAmount = 500;
  const isPayoutEligible = currentBalance >= minPayoutAmount;

  // Filter transactions based on search
  const filteredTransactions = mockTransactions.filter(
    (transaction) =>
      transaction.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.referenceId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleSendPayoutRequest = async () => {
    alert(payoutAmount);
    const response = await createPayoutRequest(payoutAmount, user?.name!);

    if (!response?.success) {
      errorToast(response.message);
      return;
    }
    successToast(response.message);
    setShowPayoutModal(false);
  };

  const fetchWalletDetails = async () => {
    const {
      success,
      data: { wallet, transactions },
      message,
    } = await getInterviewerWallet();
    if (!success) {
      errorToast(message);
      return;
    }

    setWallet(wallet);
    setTransactions(transactions);
  };
  useEffect(() => {
    fetchWalletDetails();
  }, []);

  return (
    <div className="custom-64 min-h-screen bg-gradient-to-br from-black via-black to-violet-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent mb-2">
            Wallet Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your earnings and payouts
          </p>
        </div>

        {/* Wallet Summary Card */}
        {isFetchingWallet ? (
          <div className="flex items-center justify-center">
            <RiseLoader color="#ffff" size={20} />
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-violet-900/40 via-purple-900/40 to-indigo-900/40 backdrop-blur-md rounded-2xl p-8 mb-8 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-violet-200 mb-2">
                    Current Balance
                  </h2>
                  <div className="text-5xl font-bold text-white mb-4">
                    {formatCurrency(wallet?.balance!)}
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-400 text-sm font-medium">
                        Total Earned
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {formatCurrency(wallet?.totalEarned || 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-red-400 text-sm font-medium">
                        Total Spent
                      </p>
                      <p className="text-2xl font-bold text-white">
                        {formatCurrency(wallet?.totalSpent!)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-700/50 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Request Payout
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Info className="w-4 h-4" />
                    <span className="text-sm">
                      {isPayoutEligible
                        ? `You're eligible to request a payout`
                        : `Minimum ${formatCurrency(
                            minPayoutAmount
                          )} required to request payout`}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPayoutModal(true)}
                  disabled={!isPayoutEligible}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                    isPayoutEligible
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-violet-500/25 hover:shadow-violet-500/40"
                      : "bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/50"
                  }`}
                >
                  Request Payout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showPayoutModal && (
        <PayoutModal
          onClose={() => setShowPayoutModal(false)}
          currentBalance={wallet?.balance || 0}
          onSendPayoutRequest={handleSendPayoutRequest}
          handleOnChangePayoutAmount={(
            e: React.ChangeEvent<HTMLInputElement>
          ) => setPayoutAmount(Number(e.target.value))}
          payoutAmount={payoutAmount}
          isLoading={isPayoutRequestLoading}
        />
      )}
    </div>
  );
}

export default WalletPage;
