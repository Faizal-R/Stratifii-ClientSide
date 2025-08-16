"use client";
import React, { useEffect, useRef, useState } from "react";
import { Star, MapPin, Mail, Calendar, Clock, Award, CheckCircle } from "lucide-react";
import { IJob } from "@/types/IJob";
import { useGetMatchedInterviewersByJobDescription } from "@/hooks/api/useJob";
import { toast } from "sonner";
import { IInterviewerProfile, ISkillExpertise } from "@/validations/InterviewerSchema";
import { IInterviewSlot } from "@/types/ISlotTypes";

// Badge component (if not available from a UI library)
const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}> = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full";
  const variantClasses = variant === "outline" 
    ? "border border-gray-600 bg-transparent" 
    : "bg-gray-700 text-gray-300";
  
  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

const InterviewerList: React.FC<{ selectedJob: IJob ,onBookSlot: (interviewer: IInterviewerProfile, slot: IInterviewSlot) => void}> = ({ selectedJob,onBookSlot }) => {
  const [interviewers, setInterviewers] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  const { getMatchedInterviewersByJobDescription } =
    useGetMatchedInterviewersByJobDescription();

  useEffect(() => {
    if (!selectedJob) return;
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchMatchedInterviewers = async () => {
      setLoading(true);
      const res = await getMatchedInterviewersByJobDescription(
        selectedJob._id!
      );
      if (res.success) {
        setInterviewers(res.data);
        console.log(res.data);
      } else {
        toast.error(res.error || "Failed to fetch interviewers", {
          className: "custom-error-toast",
        });
      }
      setLoading(false);
    };
    fetchMatchedInterviewers();
  }, [selectedJob]);



  const isSlotAvailable = (slot: IInterviewSlot) =>
    slot.isAvailable && slot.status === "available";

  // Helper function to get top skills (you can modify the logic as needed)
  const getTopSkills = (expertise: ISkillExpertise[]) => {
    return expertise?.slice(0, 6) || []; // Show top 6 skills
  };

  // Helper function to check if skill matches job requirements
  const getSkillMatch = (skill: string) => {
    return selectedJob.requiredSkills.includes(skill);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Matched Interviewers
          </h2>
          <span className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-violet-300 px-4 py-2 rounded-full text-sm font-medium border border-violet-500/30">
            {interviewers.length} available
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6 max-h-96 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading interviewers...</p>
          </div>
        ) : interviewers.length === 0 ? (
          <div className="text-center py-8">
            <Star className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">
              No matched interviewers found for this job
            </p>
          </div>
        ) : (
          interviewers.map((interviewer: any) => (
            <div
              key={interviewer.interviewer._id}
              className="group p-6 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900/40 to-black/20 hover:border-violet-500/50 hover:bg-gradient-to-br hover:from-gray-900/60 hover:to-violet-950/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={interviewer.interviewer.avatar}
                    alt={interviewer.interviewer.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-600 group-hover:border-violet-400 transition-colors"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg text-white group-hover:text-violet-200 transition-colors">
                      {interviewer.interviewer.name}
                    </h3>
                    <div className="flex items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                      <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                      <span className="text-sm text-yellow-300 font-medium">
                        {interviewer.interviewer.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-violet-200 font-medium mb-1">
                    {interviewer.interviewer.position}
                  </p>
                  <p className="text-gray-400 mb-3">
                    {interviewer.isVerified ?? "Independent"} •{" "}
                    {interviewer.interviewer.experience} yrs experience
                  </p>

                  <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-violet-400" />
                      <span className="text-gray-300">
                        {interviewer.interviewer.email}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4 text-violet-400" />
                      Top Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {getTopSkills(interviewer.interviewer.expertise)?.map(
                        (expertise: any, index: number) => (
                          <Badge
                            key={`${expertise.skill}-${index}`}
                            variant="outline"
                            className={
                              getSkillMatch(expertise.skill)
                                ? "bg-gradient-to-r from-green-600/30 to-emerald-600/30 text-green-300 border-green-500/40 shadow-sm"
                                : "bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-gray-300 border-gray-600/30"
                            }
                          >
                            {expertise.skill}
                            {expertise.yearsOfExperience && (
                              <span className="ml-1 text-xs opacity-80">
                                ({expertise.yearsOfExperience}y)
                              </span>
                            )}
                            {getSkillMatch(expertise.skill) && (
                              <CheckCircle className="h-3 w-3 ml-1 text-green-400" />
                            )}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-violet-300 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Available Slots:
                    </h4>
                    {interviewer.slots.length === 0 ? (
                      <p className="text-sm text-gray-400 italic bg-gray-800/30 p-3 rounded-lg border border-gray-700">
                        No available slots
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {interviewer.slots.map((slot: IInterviewSlot) => {
                          const available = isSlotAvailable(slot);
                          return (
                            <div
                              key={slot._id}
                              className={`p-4 rounded-lg border text-sm transition-all ${
                                available
                                  ? "border-green-500/40 bg-gradient-to-r from-green-900/20 to-emerald-900/20 hover:from-green-900/30 hover:to-emerald-900/30"
                                  : "border-gray-600 bg-gradient-to-r from-gray-800/30 to-gray-700/30"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-violet-400" />
                                    <span className="font-medium text-white">
                                      {new Date(slot.startTime).toDateString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-violet-400" />
                                    <span className="text-gray-300">
                                      {new Date(slot.startTime).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                  <span className="text-gray-400 bg-gray-700/50 px-2 py-1 rounded text-xs">
                                    {slot.duration} mins
                                  </span>
                                </div>
                                {available ? (
                                  <button
                                    onClick={() => onBookSlot(interviewer.interviewer, slot)}
                                    className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all text-xs font-medium shadow-lg hover:shadow-violet-500/25 transform hover:scale-105"
                                  >
                                    Book Slot
                                  </button>
                                ) : (
                                  <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700/50 text-gray-400 border border-gray-600">
                                    Not Available
                                  </span>
                                )}
                              </div>
                              {slot.meetingLink && (
                                <div className="mt-3 text-xs text-gray-400 bg-gray-800/40 p-2 rounded border border-gray-700">
                                  <span className="font-medium text-violet-300">Meeting:</span>{" "}
                                  <span className="text-gray-300">{slot.meetingLink}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default InterviewerList;