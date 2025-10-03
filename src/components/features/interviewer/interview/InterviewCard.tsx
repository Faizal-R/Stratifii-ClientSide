"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Briefcase,
  ExternalLink,
  Video,
  Star,
  MapPin,
  FileText,
  Eye,
  History,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { IInterview } from "@/types/IInterview";
import { ICompany } from "@/validations/CompanySchema";

interface InterviewCardProps {
  interview: IInterview;
  onJoinMeeting: (meetingLink: string, interviewId: string) => void;
  onShowCandidateHistory: (candidateId: string) => void;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({
  interview,
  onJoinMeeting,
  onShowCandidateHistory,
}) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      booked:
        "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 border-blue-400/50",
      completed:
        "bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-green-400/50",
      cancelled:
        "bg-gradient-to-r from-red-500/30 to-pink-500/30 text-red-200 border-red-400/50",
      rescheduled:
        "bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-200 border-yellow-400/50",
      no_show:
        "bg-gradient-to-r from-gray-500/30 to-slate-500/30 text-gray-200 border-gray-400/50",
    };
    return colors[status as keyof typeof colors] || colors.booked;
  };

  const getStatusLabel = (status: string) => {
    return status === "booked"
      ? "UPCOMING"
      : status.replace("_", " ").toUpperCase();
  };

  const isOngoing = () => {
    const now = new Date();
    const start = new Date(interview.startTime);
    const end = new Date(interview.endTime);
    return now >= start && now <= end;
  };

  const canJoinSoon = () => {
    const now = new Date();
    const start = new Date(interview.startTime);
    const tenMinutesBefore = new Date(start.getTime() - 10 * 60 * 1000);
    return now >= tenMinutesBefore;
  };

  const canJoin = () => {
    return (
      interview.meetingLink && canJoinSoon() && interview.status === "booked"
    );
  };

  const displayedSkills = showAllSkills
    ? interview.job.requiredSkills
    : interview.job.requiredSkills.slice(0, 3);
  const hasMoreSkills = interview.job.requiredSkills.length > 3;

  return (
    <div className="group relative w-full max-w-md mb-5">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-violet-900/50 backdrop-blur-xl rounded-2xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25 overflow-hidden">
        {/* Status Bar */}
        <div
          className={`h-1 w-full ${
            isOngoing()
              ? "bg-gradient-to-r from-green-400 to-emerald-500"
              : "bg-gradient-to-r from-violet-400 to-purple-500"
          }`}
        ></div>

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src={
                    interview?.candidate?.avatar ||
                    `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face`
                  }
                  alt={interview.candidate.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-400/40 group-hover:ring-violet-400/70 transition-all duration-300"
                />
                {isOngoing() && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-white text-base group-hover:text-violet-200 transition-colors truncate">
                  {interview.candidate.name}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                  {interview.candidate.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <span
                className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(
                  interview.status
                )} shadow-sm`}
              >
                {getStatusLabel(interview.status)}
              </span>
              {interview.isRecorded && (
                <div className="p-1 bg-purple-500/30 rounded-lg border border-purple-400/40">
                  <Video className="w-3 h-3 text-purple-300" />
                </div>
              )}
            </div>
          </div>

          {/* Job Info */}
          <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 rounded-xl p-3 mb-4 border border-violet-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div className="p-1 bg-blue-500/30 rounded-md border border-blue-400/40 flex-shrink-0">
                  <Briefcase className="w-3 h-3 text-blue-300" />
                </div>
                <h4 className="font-semibold text-white text-sm truncate">
                  {interview.job.position}
                </h4>
              </div>
              <div className="text-xs text-gray-400 font-medium flex-shrink-0 ml-2">
                {interview.duration}min
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-xs text-gray-300 flex-1 min-w-0">
                <MapPin className="w-3 h-3 mr-1 text-gray-400 flex-shrink-0" />
                <span className="truncate">
                  {(interview.bookedBy as ICompany).name}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-400 flex-shrink-0 ml-2">
                <Star className="w-3 h-3 mr-1" />
                {interview.job.experienceRequired}+ yrs
              </div>
            </div>

            {/* Skills */}
            {interview.job.requiredSkills.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {displayedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-violet-500/30 text-violet-200 text-xs rounded-full border border-violet-400/40 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {hasMoreSkills && (
                  <button
                    onClick={() => setShowAllSkills(!showAllSkills)}
                    className="flex items-center space-x-1 text-xs text-violet-300 hover:text-violet-200 transition-colors"
                  >
                    <span>
                      {showAllSkills
                        ? "Show Less"
                        : `+${interview.job.requiredSkills.length - 3} More`}
                    </span>
                    {showAllSkills ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-between mb-4 text-xs">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-gray-300">
                <div className="p-0.5 bg-gray-600/50 rounded">
                  <Calendar className="w-3 h-3" />
                </div>
                <span className="font-medium">
                  {formatDate(interview.startTime)}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-gray-300">
                <div className="p-0.5 bg-gray-600/50 rounded">
                  <Clock className="w-3 h-3" />
                </div>
                <span className="font-medium">
                  {formatTime(interview.startTime)} -{" "}
                  {formatTime(interview.endTime)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Top Row - Resume & History */}
            <div className="flex items-center space-x-2">
              <a
                href={interview.candidate.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 rounded-lg font-medium text-xs transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50 hover:shadow-lg group/btn"
              >
                <FileText className="w-3 h-3 group-hover/btn:text-blue-300 transition-colors" />
                <span>Resume</span>
              </a>

              <button
                onClick={() =>
                  onShowCandidateHistory(interview.candidate._id || "")
                }
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 rounded-lg font-medium text-xs transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50 hover:shadow-lg group/btn"
              >
                <History className="w-3 h-3 group-hover/btn:text-purple-300 transition-colors" />
                <span>History</span>
              </button>
            </div>

            {/* Bottom Row - Meeting Action */}
            <div className="flex justify-center">
               {/* {true && ( */}
               {canJoin() && (
                <button
                  onClick={() =>
                    onJoinMeeting(interview.meetingLink!, interview._id!)
                  }
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg ${
                    isOngoing()
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white animate-pulse shadow-green-500/30"
                      : "bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white shadow-blue-500/30"
                  } hover:shadow-xl hover:scale-[1.02]`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{isOngoing() ? "Join Now" : "Join Meeting"}</span>
                </button>
              )}

              {!canJoin() &&
                interview.status === "booked" &&
                interview.meetingLink && (
                  <button
                    disabled
                    className="w-full flex flex-col items-center justify-center space-x-2 px-2 py-2 bg-gray-600/30 text-gray-400 rounded-lg font-medium text-xs cursor-not-allowed border border-gray-500/30"
                  >
                    <div className="flex items-center space-x-1">
                      {/* <Clock className="w-4 h-4" />
                      <span>Join Soon</span> */}
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      This button will be enabled 10 minutes before the
                      interview
                    </span>
                  </button>
                )}

              {interview.status === "completed" && (
                <div className="w-full flex items-center justify-center space-x-2 text-green-400 bg-green-500/20 px-4 py-2 rounded-lg border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
