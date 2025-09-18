"use client";
import React, { useEffect, useState } from "react";
import { JobMetrics } from "@/components/features/company/dashboard/JobMetrics";
import { PaymentAnalytics } from "@/components/features/company/dashboard/PaymentAnalytics";
import { CandidatePipeline } from "@/components/features/company/dashboard/CandidatePipeline";
import { SubscriptionManagement } from "@/components/features/company/dashboard/SubscriptionManagement";
import { dashboardData as dashboardData1 } from "@/constants/dummyData";
import { Briefcase, DollarSign, Users, Crown, BarChart3 } from "lucide-react";
import { useGetCompanyDashboard } from "@/hooks/api/useCompany";
import { IJob, IPaymentTransaction } from "@/types/IJob";
import { IDelegatedCandidate } from "@/types/ICandidate";
import { useAuthStore } from "@/features/auth/authStore";

function App() {
    const {user}=useAuthStore();
  const [dashboardData, setDashboardData] = useState<{
    jobs: IJob[];
    payments:IPaymentTransaction[];
    candidates: IDelegatedCandidate[];
  }>(dashboardData1);
  const { getCompanyDashboard } = useGetCompanyDashboard();

  const [activeTab, setActiveTab] = useState("overview");
  
  const tabs = [
      { id: "overview", label: "Overview", icon: BarChart3 },
      { id: "jobs", label: "Jobs", icon: Briefcase },
      { id: "payments", label: "Payments", icon: DollarSign },
      { id: "candidates", label: "Candidates", icon: Users },
      { id: "subscription", label: "Subscription", icon: Crown },
    ];
    useEffect(() => {
      const fetchDashboardData = async () => {
        const res = await getCompanyDashboard();
        console.log("Dashboard Data:", res.data);
        if (res.success) setDashboardData(res.data);
      };
      fetchDashboardData();
    }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "jobs":
        return <JobMetrics jobs={dashboardData.jobs} />;
      case "payments":
        return <PaymentAnalytics payments={dashboardData.payments} />;
      case "candidates":
        return <CandidatePipeline candidates={dashboardData.candidates} />;
      case "subscription":
        return <SubscriptionManagement />;
      default:
        return (
          <div className="space-y-8">
            <JobMetrics jobs={dashboardData.jobs} />
             <PaymentAnalytics payments={dashboardData.payments} />
            <CandidatePipeline candidates={dashboardData.candidates} /> 
          </div>
        );
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-black via-black to-violet-950">
      {/* Header */}
      <div className="ml-5 border-b border-violet-500/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Company Dashboard
              </h1>
              <p className="text-gray-400 mt-1">
                Monitor your hiring performance and analytics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Welcome back</p>
                <p className="font-semibold text-white">{user?.name}.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className=" ml-5  border-b border-violet-500/20 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-violet-400 text-violet-300"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">{renderContent()}</div>

      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
