  "use client";
  import React, { useEffect, useMemo, useState } from "react";

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );


  import KeyMetricsCards from "@/components/features/admin/dashboard/KeyMetrics";

  import { useGetAdminDashboard } from "@/hooks/api/useAdmin";
  import ChartsSectionAndTables from "@/components/features/admin/dashboard/ChartSection";

  // Dummy data for dashboard

  const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState<{
      keyMetrics: {
        activeCompanies: number;
        totalInterviewers: number;
        totalRevenue: number;
        totalActiveSubscription: number;
      };
      monthlyRevenue: {
        month: number;
        interviews: number;
        subscriptions: number;
        total: number;
      }[];
      monthlyUserGrowth: {
        month: number;
        companies: number;
        interviewers: number;
      }[];
      subscriptionDistribution: {
        name: string;
        value: number;
      }[];
      recentCompanies: {
        name: string;
        email: string;
        _id: string;
        status: string;
        companyLogo: string | null;
      }[];
      interviewTrends: {
        month: number;
        interviews: number;
      }[];
    }>();
    const { getAdminDashboard } = useGetAdminDashboard();

    const revenueTrendsData = useMemo(() => {
      return {
        labels: dashboardData?.monthlyRevenue.map((d) => d.month) ?? [],
        datasets: [
          {
            label: "Revenue",
            data: dashboardData?.monthlyRevenue.map((d) => d.total) ?? [],
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139,92,246,0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      };
    }, [dashboardData]);

    const userGrowthData = useMemo(() => {
      return {
        labels: dashboardData?.monthlyUserGrowth.map((d) => d.month),
        datasets: [
          {
            label: "Companies",
            data: dashboardData?.monthlyUserGrowth.map((d) => d.companies),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59,130,246,0.2)",
          },
          {
            label: "Interviewers",
            data: dashboardData?.monthlyUserGrowth.map((d) => d.interviewers),
            borderColor: "#10b981",
            backgroundColor: "rgba(16,185,129,0.2)",
          },
        ],
      };
    }, [dashboardData]);

    const interviewTrends = useMemo(() => {
      return {
        labels: dashboardData?.interviewTrends.map((d) => d.month) ?? [],
        datasets: [
          {
            label: "completed",
            data: dashboardData?.interviewTrends.map((d) => d.interviews) ?? [],
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139,92,246,0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      };
    }, [dashboardData]);

    const revenueBreakdownData = useMemo(() => {
      return {
        labels: dashboardData?.monthlyRevenue.map((d) => d.month),
        datasets: [
          {
            label: "Subscriptions",
            data: dashboardData?.monthlyRevenue.map((d) => d.subscriptions),
            backgroundColor: "#8b5cf6",
          },
          {
            label: "Interviews",
            data: dashboardData?.monthlyRevenue.map((d) => d.interviews),
            backgroundColor: "#3b82f6",
          },
        ],
      };
    }, [dashboardData]);

    const subscriptionData = {
      labels: dashboardData?.subscriptionDistribution.map((d) => d.name),
      datasets: [
        {
          data: dashboardData?.subscriptionDistribution.map((d) => d.value),
          backgroundColor: ["#8b5cf6", "#3b82f6", "#a855f7", "#ec4899"],
          borderWidth: 2,
        },
      ],
    };

    const fetchDashboardData = async () => {
      const res = await getAdminDashboard();

      if (res.success) setDashboardData(res.data);
    };
    useEffect(() => {
      fetchDashboardData();
    }, []);

    return (
      <div className="custom-64 min-h-screen bg-gradient-to-br from-black via-black to-violet-950 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-in fade-in duration-1000">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-violet-300 text-xl max-w-2xl mx-auto">
              Comprehensive overview of your interview platform performance
            </p>
          </div>

          {/* Key Metrics Cards */}
          <KeyMetricsCards
            totalRevenue={dashboardData?.keyMetrics.totalRevenue || 0}
            totalCompanies={dashboardData?.keyMetrics.activeCompanies || 0}
            totalInterviewers={dashboardData?.keyMetrics.totalInterviewers || 0}
            totalSubscriptions={
              dashboardData?.keyMetrics.totalActiveSubscription || 0
            }
          />

          {/* Charts Section (commented out) */}
          <ChartsSectionAndTables
            revenueTrendsData={revenueTrendsData}
            userGrowthData={userGrowthData}
            subscriptionData={subscriptionData}
            revenueBreakdownData={revenueBreakdownData}
            interviewTrendsData={interviewTrends}
            recentCompanies={dashboardData?.recentCompanies || []}
          />
        </div>
      </div>
    );
  };

  export default AdminDashboard;
