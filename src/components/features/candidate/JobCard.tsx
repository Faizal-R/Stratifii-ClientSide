"use client";
import React from "react";
import {
  Building,
  Eye,
  Ban,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  AlertCircle,
} from "lucide-react";
import { DelegatedJob } from "@/types/IJob";
import { Timer } from "@/components/features/common/Timer";
import { RiseLoader } from "react-spinners";

interface JobCardProps {
  job: DelegatedJob;
  onStartMock: (job: DelegatedJob) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  formatStatus: (status: string) => string;
  isMockQuestionsLoading?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onStartMock,
  getStatusColor,
  getStatusIcon,
  formatStatus,
  isMockQuestionsLoading,
}) => {
  const getCardVariant = () => {
    if (job.isQualifiedForFinal) {
      return {
        gradient: "from-emerald-500/20 via-teal-500/10 to-emerald-600/20",
        border: "border-emerald-400/30",
        hoverBorder: "hover:border-emerald-400/60",
        shadow: "shadow-emerald-500/10",
        hoverShadow: "hover:shadow-emerald-500/20",
      };
    }

    if (job.mockStatus === "mock_failed") {
      return {
        gradient: "from-red-500/20 via-pink-500/10 to-red-600/20",
        border: "border-red-400/30",
        hoverBorder: "hover:border-red-400/60",
        shadow: "shadow-red-500/10",
        hoverShadow: "hover:shadow-red-500/20",
      };
    }
    return {
      gradient: "from-violet-500/20 via-purple-500/10 to-indigo-600/20",
      border: "border-violet-400/30",
      hoverBorder: "hover:border-violet-400/60",
      shadow: "shadow-violet-500/10",
      hoverShadow: "hover:shadow-violet-500/20",
    };
  };

  const getStatusBadge = () => {
    const statusConfig = {
      mock_pending: {
        icon: <Clock className="w-4 h-4" />,
        bg: "bg-amber-500/20",
        border: "border-amber-400/40",
        text: "text-amber-200",
        dot: "bg-amber-400",
      },
      mock_started: {
        icon: <Play className="w-4 h-4" />,
        bg: "bg-blue-500/20",
        border: "border-blue-400/40",
        text: "text-blue-200",
        dot: "bg-blue-400",
      },
      mock_completed: {
        icon: <CheckCircle className="w-4 h-4" />,
        bg: "bg-emerald-500/20",
        border: "border-emerald-400/40",
        text: "text-emerald-200",
        dot: "bg-emerald-400",
      },
      mock_failed: {
        icon: <XCircle className="w-4 h-4" />,
        bg: "bg-red-500/20",
        border: "border-red-400/40",
        text: "text-red-200",
        dot: "bg-red-400",
      },
      shortlisted: {
        icon: <CheckCircle className="w-4 h-4" />,
        bg: "bg-purple-500/20",
        border: "border-purple-400/40",
        text: "text-purple-200",
        dot: "bg-purple-400",
      },
      final_scheduled: {
        icon: <AlertCircle className="w-4 h-4" />,
        bg: "bg-cyan-500/20",
        border: "border-cyan-400/40",
        text: "text-cyan-200",
        dot: "bg-cyan-400",
      },
    };

    const config =
      statusConfig[job.mockStatus as keyof typeof statusConfig] ||
      statusConfig.mock_pending;

    return (
      <div
        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm ${config.bg} ${config.border} ${config.text}`}
      >
        <div
          className={`w-2 h-2 rounded-full mr-3 ${config.dot} animate-pulse`}
        ></div>
        {config.icon}
        <span className="ml-2 font-semibold">
          {formatStatus(job.mockStatus)}
        </span>
      </div>
    );
  };

  const getActionButton = () => {
    if (job.mockStatus === "mock_pending") {
      return (
        <button
          onClick={() => onStartMock(job)}
          className="group relative bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-violet-500/30 hover:scale-105 active:scale-95"
        >
          <div className="flex items-center space-x-2">
            <Play className="w-4 h-4 group-hover:animate-pulse" />
            <span>Start Mock Interview</span>
          </div>
          <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      );
    }

    if (job.mockStatus === "mock_started") {
      return (
        <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-emerald-500/30 flex items-center space-x-2 min-w-[140px] justify-center">
          {isMockQuestionsLoading ? (
            <RiseLoader color="#ffffff" size={8} />
          ) : (
            <>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>In Progress</span>
            </>
          )}
        </button>
      );
    }

    if (job.mockStatus === "mock_completed") {
      return (
        <button className="group relative bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-3 rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-slate-500/30 hover:scale-105 active:scale-95">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>View Results</span>
          </div>
        </button>
      );
    }

    if (job.mockStatus === "mock_failed") {
      return (
        <button
          className="bg-gradient-to-r from-red-600/50 to-red-700/50 text-red-200 px-6 py-3 rounded-xl cursor-not-allowed font-semibold flex items-center space-x-2 opacity-70"
          disabled
        >
          <Ban className="w-4 h-4" />
          <span>Interview Failed</span>
        </button>
      );
    }

    if (["shortlisted", "final_scheduled"].includes(job.mockStatus)) {
      return (
        <button className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>View Details</span>
          </div>
        </button>
      );
    }

    return null;
  };

  const cardVariant = getCardVariant();

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] ${cardVariant.hoverShadow}`}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cardVariant.gradient} opacity-80`}
      ></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* Border */}
      <div
        className={`relative border ${cardVariant.border} ${cardVariant.hoverBorder} rounded-2xl transition-all duration-300`}
      >
        <div className="relative p-8">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 pr-4">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                {job.jobTitle}
              </h3>
              <div className="flex items-center text-gray-300 mb-4">
                <div className="p-2 bg-white/10 rounded-lg mr-3">
                  <Building className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">{job.name}</span>
              </div>
              {getStatusBadge()}
            </div>

            {!job.isQualifiedForFinal && (
              <div className="text-right bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                <Timer deadline={job.mockInterviewDeadline as string} />
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-center pt-6 border-t border-white/10">
            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span className="text-sm font-semibold text-gray-300">
                ID: <span className="text-white font-mono">{job.jobId}</span>
              </span>
            </div>

            <div className="flex space-x-4">{getActionButton()}</div>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default JobCard;
