import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { IPaymentTransaction } from "@/types/IJob";
import { Bar, Line } from "react-chartjs-2";

interface PaymentAnalyticsProps {
  payments: IPaymentTransaction[];
  monthlySpend: any;
}

export function PaymentAnalytics({
  payments,
  monthlySpend,
}: PaymentAnalyticsProps) {
  const paidPayments = payments.filter((payment) => payment.status === "PAID");
  const pendingPayments = payments.filter(
    (payment) => payment.status === "PENDING"
  );

  const totalSpent = paidPayments.reduce(
    (sum, payment) => sum + payment.finalPayableAmount,
    0
  );
  const totalPending = pendingPayments.reduce(
    (sum, payment) => sum + payment.finalPayableAmount,
    0
  );
  const averagePerTransaction =
    paidPayments.length > 0 ? totalSpent / paidPayments.length : 0;

  const totalCandidatesInterviewed = paidPayments.reduce(
    (sum, payment) => sum + payment.candidatesCount,
    0
  );
  const averageCostPerCandidate =
    totalCandidatesInterviewed > 0
      ? totalSpent / totalCandidatesInterviewed
      : 0;

  // Monthly spending (mock data for chart)
  const monthlySpending = [
    { month: "Nov", amount: 850 },
    { month: "Dec", amount: 1200 },
    { month: "Jan", amount: Math.round(totalSpent) },
  ];

  return (
    <div
      className="space-y-6 animate-fade-in"
      style={{ animationDelay: "0.4s" }}
    >
      {/* Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-green-400/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Total Spent
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ₹{totalSpent.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400">
              {paidPayments.length} completed transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-yellow-400/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Pending
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ₹{totalPending.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400">
              {pendingPayments.length} pending transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-blue-400/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Avg per Transaction
            </CardTitle>
            <CreditCard className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ₹{Math.round(averagePerTransaction).toLocaleString()}
            </div>
            <p className="text-xs text-gray-400">
              Based on {paidPayments.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-md border-violet-500/30 hover:border-violet-400/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">
              Cost per Candidate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ₹{Math.round(averageCostPerCandidate)}
            </div>
            <p className="text-xs text-gray-400">
              {totalCandidatesInterviewed} candidates interviewed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Spending Trend */}
      <Card className="bg-black/40 backdrop-blur-md border-violet-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="h-5 w-5 text-violet-400" />
            Monthly Spending Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={monthlySpend} />
        </CardContent>
      </Card>
    </div>
  );
}
