"use client";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  XCircle,
  UserCheck,
  CreditCard,
  IndianRupeeIcon,
} from "lucide-react";
import JobOverviewCard from "@/components/features/company/dashboard/JobOverviewCard";
import MetricsCard from "@/components/features/company/dashboard/MetricCard";
import { IJobMetrics } from "@/types/ICompanyDashboard";
import { useEffect, useState } from "react";
import { useGetCompanyDashboard } from "@/hooks/api/useCompany";
// import { jobMetrics } from "@/constants/dummyData";

const CompanyDashboard = () => {
  const [dashboardData, setDashboardData] = useState<{
    jobMatrics: IJobMetrics;
  } | null>(null);
  const { getCompanyDashboard } = useGetCompanyDashboard();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const res = await getCompanyDashboard();
      console.log("Dashboard Data:", res.data);
      if (res.success) setDashboardData(res.data);
    };
    fetchDashboardData();
  }, []);
  const jobMetrics: IJobMetrics = {
    open: 24,
    inProgress: 18,
    completed: 42,
    total: 84,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950 p-6 ml-64">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Company Dashboard
        </h1>
        <p className="text-gray-300">
          Monitor your hiring pipeline and performance metrics
        </p>
      </div>
      Job Overview Card
      <div className="mb-8">
        <JobOverviewCard metrics={dashboardData?.jobMatrics! || jobMetrics} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Interview Spending"
          // value={paymentMetrics.totalSpent}
          value={12500}
          icon={IndianRupeeIcon}
          format="currency"
          trend={{ value: 8, isPositive: true }}
          color="from-purple-600 to-violet-600"
          delay={0.1}
        />
        {/* <MetricsCard
          title="Hired Candidates"
          value={candidateMetrics.finalCompleted}
          icon={UserCheck}
          trend={{ value: 15, isPositive: true }}
          color="from-teal-600 to-cyan-600"
          delay={0.2}
        />
        <MetricsCard
          title="Mock Failed"
          value={candidateMetrics.mockFailed}
          icon={XCircle}
          trend={{ value: -8, isPositive: false }}
          color="from-red-600 to-rose-600"
          delay={0.3}
        />
        <MetricsCard
          title="Subscription Revenue"
          value={subscriptionMetrics.totalSubscriptionRevenue}
          icon={Crown}
          format="currency"
          trend={{ value: 12, isPositive: true }}
          color="from-yellow-600 to-amber-600"
          delay={0.4}
        /> */}
      </div>
      {/* Secondary Metrics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Candidates"
          value={candidateMetrics.total}
          icon={Users}
          trend={{ value: 23, isPositive: true }}
          color="from-indigo-600 to-purple-600"
          delay={0.5}
        />
        <MetricsCard
          title="Active Subscriptions"
          value={subscriptionMetrics.activeSubscriptions}
          icon={Crown}
          trend={{ value: 18, isPositive: true }}
          color="from-emerald-600 to-teal-600"
          delay={0.6}
        />
        <MetricsCard
          title="Payment Transactions"
          value={paymentMetrics.totalTransactions}
          icon={CreditCard}
          trend={{ value: 7, isPositive: true }}
          color="from-pink-600 to-rose-600"
          delay={0.7}
        />
        <MetricsCard
          title="Shortlisted"
          value={candidateMetrics.shortlisted}
          icon={UserCheck}
          trend={{ value: 11, isPositive: true }}
          color="from-cyan-600 to-blue-600"
          delay={0.8}
        />
      </div> */}
      {/* Charts Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <JobStatusChart />
        <SubscriptionChart />
      </div> */}
      {/* Full Width Chart */}
      {/* <div className="mb-8">
        <CandidateFlowChart />
      </div> */}
      {/* Bottom Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentChart />
        <RecentActivity />
      </div> */}
    </div>
  );
};

export default CompanyDashboard;
