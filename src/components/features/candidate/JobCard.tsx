import React from "react";
import {
  Eye,
  Ban,
  Play,
  Tag,
  Briefcase,
  Star,
  Calendar,
  
} from "lucide-react";
import { Timer } from "@/components/features/common/Timer";
import { RiseLoader } from "react-spinners";
import { DelegatedJob } from "@/types/IJob";




interface JobCardProps {
  job: DelegatedJob;
  onStartMock: (job: DelegatedJob) => void;
  formatStatus: (status: string) => string;
  isMockQuestionsLoading?: boolean;
  handleJobEdit?: (id: string) => void;
  handleJobDelete?: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onStartMock,
  isMockQuestionsLoading,
}) => {
  console.log("JObCard:", job);
  const cardVariant = (() => {
    if (job.isQualifiedForFinal)
      return {
        gradient: "from-emerald-900/40 via-emerald-800/30 to-teal-900/40",
        border: "border-emerald-500/30",
        glow: "group-hover:shadow-[0_0_30px_10px_rgba(16,185,129,0.15)]",
        accent: "text-emerald-400",
        accentBg: "bg-emerald-500/20",
        skillBg: "bg-emerald-900/30 border-emerald-700/50",
        skillText: "text-emerald-300",
      };
    if (job.mockStatus === "mock_failed")
      return {
        gradient: "from-red-950/50 via-red-900/40 to-pink-950/50",
        border: "border-red-500/30",
        glow: "group-hover:shadow-[0_0_30px_10px_rgba(239,68,68,0.15)]",
        accent: "text-red-400",
        accentBg: "bg-red-500/20",
        skillBg: "bg-red-950/40 border-red-800/50",
        skillText: "text-red-300",
      };
    return {
      gradient: "from-violet-950/60 via-purple-950/50 to-indigo-950/60",
      border: "border-violet-500/30",
      glow: "group-hover:shadow-[0_0_30px_10px_rgba(139,92,246,0.2)]",
      accent: "text-violet-400",
      accentBg: "bg-violet-500/20",
      skillBg: "bg-violet-950/50 border-violet-700/40",
      skillText: "text-violet-300",
    };
  })();

  const getActionButton = () => {
  if (job.mockStatus === "mock_pending") {
  const deadline = new Date(job.mockInterviewDeadline as string);

  if (deadline < new Date()) {
    // Deadline passed → show disabled "Interview Failed" button
    return (
      <button
        className="bg-gradient-to-r from-red-900/60 to-red-800/60 text-red-300 px-8 py-3.5 rounded-2xl cursor-not-allowed font-semibold flex items-center space-x-3 opacity-70 border border-red-600/30"
        disabled
      >
        <Ban className="w-4 h-4" />
        <span>Interview Failed</span>
      </button>
    );
  } else {
    // Deadline not passed → show "Start Interview" button
    return (
      <button
        onClick={() => onStartMock(job)}
        className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 text-white px-8 py-3.5 rounded-2xl hover:from-violet-500 hover:via-purple-500 hover:to-violet-600 transition-all duration-300 font-semibold shadow-2xl hover:shadow-violet-500/40 hover:scale-105 active:scale-95 border border-violet-400/20"
      >
        <div className="flex items-center space-x-3">
          <div className="p-1 bg-white/10 rounded-full">
            <Play
              className="w-4 h-4 group-hover:animate-pulse"
              fill="currentColor"
            />
          </div>
          <span>Start Interview</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-400/0 via-violet-400/10 to-violet-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
      </button>
    );
  }
}


    if (job.mockStatus === "mock_started")
      return (
        <button className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 text-white px-8 py-3.5 rounded-2xl flex items-center space-x-3 min-w-[180px] justify-center shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 border border-emerald-400/30">
          {isMockQuestionsLoading ? (
            <RiseLoader color="#ffffff" size={8} />
          ) : (
            <>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse animation-delay-100"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse animation-delay-200"></div>
              </div>
              <span className="font-semibold">In Progress</span>
            </>
          )}
        </button>
      );

    if (job.mockStatus === "mock_completed")
      return (
        <button className="group relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white px-8 py-3.5 rounded-2xl hover:from-slate-700 hover:via-slate-600 hover:to-slate-700 transition-all duration-300 font-semibold shadow-2xl hover:shadow-slate-500/30 hover:scale-105 border border-slate-400/20">
          <div className="flex items-center space-x-3">
            <div className="p-1 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <span>View Results</span>
          </div>
        </button>
      );

    if (job.mockStatus === "mock_failed")
      return (
        <button
          className="bg-gradient-to-r from-red-900/60 to-red-800/60 text-red-300 px-8 py-3.5 rounded-2xl cursor-not-allowed font-semibold flex items-center space-x-3 opacity-70 border border-red-600/30"
          disabled
        >
          <Ban className="w-4 h-4" />
          <span>Interview Failed</span>
        </button>
      );

    return null;
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] ${cardVariant.glow}`}
    >
      {/* Animated Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cardVariant.gradient} opacity-90`}
      ></div>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Card Content */}
      <div
        className={`relative border ${cardVariant.border} rounded-3xl transition-all duration-300 backdrop-blur-sm`}
      >
        <div className="relative p-8 space-y-6 z-10">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`${cardVariant.accentBg} p-4 rounded-2xl border ${cardVariant.border} backdrop-blur-sm`}
              >
                <Briefcase className={`${cardVariant.accent}`} size={28} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {job.job.position}
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">
                      {job.job.experienceRequired}+ years
                    </span>
                  </div>
                  {job.isQualifiedForFinal && (
                    <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-emerald-400 text-xs font-semibold">
                        QUALIFIED
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          {(job.job.requiredSkills || []).length > 0 && (
            <div className="space-y-3">
              <h4
                className={`text-sm font-bold flex items-center gap-2 ${cardVariant.accent}`}
              >
                <Tag size={16} />
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.job.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className={`${cardVariant.skillBg} border ${cardVariant.skillText} px-4 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-all duration-200 backdrop-blur-sm hover:shadow-lg`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Section */}
          <div className="pt-4 border-t border-white/10">
            {!job.isQualifiedForFinal ? (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {job.mockStatus === "mock_pending" && (
                    <>
                  <Calendar className="w-5 h-5 text-gray-400" />
                    <Timer deadline={job.mockInterviewDeadline as string} />
                    </>
                  )}
                </div>
                {getActionButton()}
              </div>
            ) : (
              <div className="flex justify-end">{getActionButton()}</div>
            )}
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default JobCard;
