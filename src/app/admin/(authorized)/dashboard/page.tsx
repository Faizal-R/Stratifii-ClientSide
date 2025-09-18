"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Line, Bar, Doughnut } from "react-chartjs-2";

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

import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  UserCheck,
  CreditCard,
  Star,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import KeyMetricsCards from "@/components/features/admin/dashboard/KeyMetrics";
import ChartsSection from "@/components/features/admin/dashboard/ChartSection";
import { useGetAdminDashboard } from "@/hooks/api/useAdmin";

// Dummy data for dashboard


const subscriptionDistribution = [
  { name: "Basic Plan", value: 45, color: "#e9d5ff" },
  { name: "Pro Plan", value: 89, color: "#a78bfa" },
  { name: "Enterprise Plan", value: 34, color: "#c4b5fd" },
];

const recentCompanies = [
  {
    id: "1",
    name: "TechCorp Inc.",
    email: "admin@techcorp.com",
    plan: "Enterprise",
    status: "active",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "StartupXYZ",
    email: "hr@startupxyz.com",
    plan: "Pro",
    status: "active",
    joinedAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Global Solutions",
    email: "contact@global.com",
    plan: "Basic",
    status: "pending",
    joinedAt: "2024-01-13",
  },
  {
    id: "4",
    name: "InnovateLab",
    email: "team@innovate.com",
    plan: "Pro",
    status: "active",
    joinedAt: "2024-01-12",
  },
  {
    id: "5",
    name: "FutureTech",
    email: "info@future.com",
    plan: "Enterprise",
    status: "active",
    joinedAt: "2024-01-11",
  },
];

const topInterviewers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    rating: 4.9,
    expertise: "React, Node.js",
    interviews: 45,
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@email.com",
    rating: 4.8,
    expertise: "Python, ML",
    interviews: 38,
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@email.com",
    rating: 4.7,
    expertise: "Java, Spring",
    interviews: 42,
  },
  {
    id: "4",
    name: "Alex Wilson",
    email: "alex@email.com",
    rating: 4.9,
    expertise: "DevOps, AWS",
    interviews: 51,
  },
  {
    id: "5",
    name: "Lisa Brown",
    email: "lisa@email.com",
    rating: 4.6,
    expertise: "Mobile Dev",
    interviews: 29,
  },
];

const recentTransactions = [
  {
    id: "1",
    company: "TechCorp Inc.",
    amount: 2500,
    type: "Interview Payment",
    status: "PAID",
    date: "2024-01-15",
  },
  {
    id: "2",
    company: "StartupXYZ",
    amount: 599,
    type: "Subscription",
    status: "PAID",
    date: "2024-01-14",
  },
  {
    id: "3",
    company: "Global Solutions",
    amount: 1200,
    type: "Interview Payment",
    status: "PENDING",
    date: "2024-01-14",
  },
  {
    id: "4",
    company: "InnovateLab",
    amount: 299,
    type: "Subscription",
    status: "PAID",
    date: "2024-01-13",
  },
  {
    id: "5",
    company: "FutureTech",
    amount: 3200,
    type: "Interview Payment",
    status: "PAID",
    date: "2024-01-13",
  },
];



const subscriptionData = {
  labels: subscriptionDistribution.map((d) => d.name),
  datasets: [
    {
      data: subscriptionDistribution.map((d) => d.value),
      backgroundColor: ["#8b5cf6", "#3b82f6", "#a855f7", "#ec4899"],
      borderWidth: 2,
    },
  ],
};



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
    recentCompanies:{
      name:string;
      email:string;
      _id:string;
      status:string
      companyLogo:string|null
    }[]
  }>();
  const { getAdminDashboard, loading: isAdminDashboardLoading } =
    useGetAdminDashboard();

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
  }, [dashboardData])

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
      data: dashboardData?.subscriptionDistribution .map((d) => d.value),
      backgroundColor: ["#8b5cf6", "#3b82f6", "#a855f7", "#ec4899"],
      borderWidth: 2,
    },
  ],
};

  const fetchDashboardData = async () => {
    const res = await getAdminDashboard();
    console.log("Dashboard Data:", res.data);
    if (res.success) setDashboardData(res.data);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-black via-black to-violet-950 p-6">
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
        <ChartsSection
          revenueTrendsData={revenueTrendsData}
          userGrowthData={userGrowthData}
          subscriptionData={subscriptionData}
          revenueBreakdownData={revenueBreakdownData}
        />
        {/*
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          Revenue Chart + User Growth Chart
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          Subscription Distribution + Revenue Breakdown
        </div>
        */}

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom duration-700 delay-800">
          {/* Recent Companies */}
          <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl">
                <Building2 className="h-5 w-5 text-blue-400" /> Recent Companies
              </CardTitle>
              <CardDescription className="text-violet-300">
                Latest company registrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.recentCompanies.map((company) => (
                  <div
                    key={company._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-violet-500/10"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-violet-500/20">
                        <AvatarImage
                          src={company.companyLogo??`https://ui-avatars.com/api/?name=${company.name}&background=8b5cf6&color=fff`}
                        />
                        <AvatarFallback>
                          {company.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-semibold">
                          {company.name}
                        </p>
                        <p className="text-violet-300 text-sm">
                          {company.email}
                        </p>
                      </div>
                    </div>
                    <Badge>{company.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Interviewers */}
          {/* <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-xl">
                <Star className="h-5 w-5 text-yellow-400" /> Top Interviewers
              </CardTitle>
              <CardDescription className="text-violet-300">
                Highest rated interviewers this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topInterviewers.map((interviewer) => (
                  <div
                    key={interviewer.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-violet-500/10"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-violet-500/20">
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${interviewer.name}&background=a78bfa&color=fff`}
                        />
                        <AvatarFallback>
                          {interviewer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-semibold">
                          {interviewer.name}
                        </p>
                        <p className="text-violet-300 text-sm">
                          {interviewer.expertise}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-white">
                      {interviewer.rating}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Recent Transactions */}
        {/* <Card className="bg-black/40 border-violet-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-xl">
              <Activity className="h-5 w-5 text-emerald-400" /> Recent
              Transactions
            </CardTitle>
            <CardDescription className="text-violet-300">
              Latest payments and subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 text-violet-200">Company</th>
                  <th className="text-left py-4 text-violet-200">Amount</th>
                  <th className="text-left py-4 text-violet-200">Type</th>
                  <th className="text-left py-4 text-violet-200">Status</th>
                  <th className="text-left py-4 text-violet-200">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-violet-500/10"
                  >
                    <td className="py-4 text-white">{transaction.company}</td>
                    <td className="py-4 text-white">
                      ${transaction.amount.toLocaleString()}
                    </td>
                    <td className="py-4 text-violet-300">{transaction.type}</td>
                    <td className="py-4">{transaction.status}</td>
                    <td className="py-4 text-violet-400">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
