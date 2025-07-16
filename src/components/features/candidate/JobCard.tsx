"use client";
import React from "react";
import { Building, Eye, Ban } from "lucide-react";
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
  return (
   <div
  className={`backdrop-blur-sm rounded-lg shadow-xl p-6 transition-all duration-300
    ${
      job.isQualifiedForFinal
        ? "bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/30"
        : job.mockStatus === "mock_failed"
        ? "bg-red-500/10 border border-red-500/20 hover:border-red-500/30"
        : "bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/30"
    }`}
>

      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            {job.jobTitle}
          </h3>
          <div className="flex items-center text-gray-300 mb-3">
            <Building className="w-4 h-4 mr-2" />
            <span>{job.companyName}</span>
          </div>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
              job.mockStatus
            )}`}
          >
            {getStatusIcon(job.mockStatus)}
            <span className="ml-2">{formatStatus(job.mockStatus)}</span>
          </div>
        </div>

        <div className="text-right">
          {/* <Timer createdAt={job.createdAt} /> */}
          <Timer createdAt={new Date().toString()} />
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/20">
        <div className="text-sm text-gray-400">Job ID: {job.jobId}</div>
        <div className="flex space-x-3">
          {job.mockStatus === "mock_pending" && (
            <button
              onClick={() => onStartMock(job)}
              className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors font-medium shadow-lg hover:shadow-violet-500/25"
            >
              Start Mock Interview
            </button>
          )}
          {job.mockStatus === "mock_started" && (
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors font-medium shadow-lg hover:shadow-emerald-500/25">
              {isMockQuestionsLoading && (
                <RiseLoader color="#ffffff" size={10} />
              )}
            </button>
          )}
          {job.mockStatus === "mock_completed" && (
            <button className="bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors font-medium shadow-lg hover:shadow-slate-500/25">
              <Eye className="w-4 h-4 inline mr-2" />
              View Results
            </button>
          )}
          {job.mockStatus === "mock_failed" && (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md cursor-not-allowed opacity-70 font-medium flex items-center shadow-lg"
              disabled
            >
              <Ban className="w-4 h-4 mr-2" />
              Mock Interview Failed
            </button>
          )}
          {["shortlisted", "final_scheduled"].includes(job.mockStatus) && (
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors font-medium shadow-lg hover:shadow-purple-500/25">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
