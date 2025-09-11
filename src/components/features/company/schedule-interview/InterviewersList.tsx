"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Star,
  MapPin,
  Mail,
  Calendar,
  Clock,
  Award,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
} from "lucide-react";
import { IJob } from "@/types/IJob";
import { useGetMatchedInterviewersByJobDescription } from "@/hooks/api/useJob";
import { toast } from "sonner";
import {
  IInterviewerProfile,
  ISkillExpertise,
} from "@/validations/InterviewerSchema";
import { IInterviewSlot } from "@/types/ISlotTypes";
import { Badge } from "@/components/ui/badge";
import SlotModal from "./AvailableSlotListingModal";
import { errorToast } from "@/utils/customToast";

// Main InterviewerList Component
const InterviewerList: React.FC<{
  selectedJob: IJob;
  onBookSlot: (interviewer: IInterviewerProfile, slot: IInterviewSlot) => void;
}> = ({ selectedJob, onBookSlot }) => {
  const [interviewers, setInterviewers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      } else {
        errorToast(res.error || "Failed to fetch interviewers");
      }
      setLoading(false);
    };
    fetchMatchedInterviewers();
  }, [selectedJob]);

  const openSlotModal = (interviewer: any) => {
    setSelectedInterviewer(interviewer);
    setIsModalOpen(true);
  };

  const closeSlotModal = () => {
    setIsModalOpen(false);
    setSelectedInterviewer(null);
  };

  const getSkillMatch = (skill: string) => {
    return selectedJob.requiredSkills.includes(skill);
  };
  const getSortedSkills = (expertise: ISkillExpertise[]) => {
    if (!expertise) return [];

    // Sort matched first, then non-matched
    return [...expertise].sort((a, b) => {
      const aMatch = getSkillMatch(a.skill) ? 1 : 0;
      const bMatch = getSkillMatch(b.skill) ? 1 : 0;
      return bMatch - aMatch;
    });
  };

  const getAvailableSlotCount = (slots: IInterviewSlot[]) => {
    return slots.filter(
      (slot) => slot.isAvailable && slot.status === "available"
    ).length;
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-violet-900/20 to-purple-900/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Expert Interviewers
              </h2>
              <p className="text-gray-400">
                Handpicked professionals matching your requirements
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-violet-300 px-6 py-3 rounded-xl border border-violet-500/30">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="font-bold text-lg">
                    {interviewers.length}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Finding Perfect Matches
              </h3>
              <p className="text-gray-400">
                We're searching for the best interviewers for your role...
              </p>
            </div>
          ) : interviewers.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No Matches Found
              </h3>
              <p className="text-gray-500">
                No interviewers match the current job requirements.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {interviewers.map((interviewer: any) => {
                const availableSlots = getAvailableSlotCount(
                  interviewer.slots || []
                );

                return (
                  <div
                    key={interviewer.interviewer._id}
                    className={`group relative w-full p-5 rounded-xl border transition-all duration-300 overflow-hidden ${
                      availableSlots > 0
                        ? "border-gray-700/50 bg-gray-800/30 hover:border-violet-500/50 hover:bg-violet-900/20 hover:shadow-lg"
                        : "border-gray-700/50 bg-gray-800/20 opacity-70"
                    }`}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex items-center gap-5">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={interviewer.interviewer.avatar}
                          alt={interviewer.interviewer.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-600/50 shadow-lg"
                        />
                        {availableSlots > 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border border-gray-900 shadow" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white text-lg truncate">
                            {interviewer.interviewer.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              availableSlots > 0
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-red-500/10 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {availableSlots > 0
                              ? `${availableSlots} Slots Available`
                              : "No Slots"}
                          </span>
                        </div>
                        <p className="text-sm text-violet-300 truncate">
                          {interviewer.interviewer.position}
                        </p>
                        <p className="text-xs text-gray-400">
                          {interviewer.interviewer.experience} years experience
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {getSortedSkills(
                            interviewer.interviewer.expertise
                          )?.map((expertise: ISkillExpertise, idx: number) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                                getSkillMatch(expertise.skill)
                                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                                  : "bg-gray-700/40 text-gray-300 border-gray-600/30"
                              }`}
                            >
                              {expertise.skill} - {expertise.yearsOfExperience} yrs
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => openSlotModal(interviewer)}
                          disabled={availableSlots === 0}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md ${
                            availableSlots > 0
                              ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 hover:shadow-violet-500/25"
                              : "bg-gray-700 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {availableSlots > 0 ? "View Slots" : "Unavailable"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Slot Modal */}
      <SlotModal
        isOpen={isModalOpen}
        onClose={closeSlotModal}
        interviewer={selectedInterviewer}
        onBookSlot={onBookSlot}
        selectedJob={selectedJob}
      />

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
    </>
  );
};

export default InterviewerList;
