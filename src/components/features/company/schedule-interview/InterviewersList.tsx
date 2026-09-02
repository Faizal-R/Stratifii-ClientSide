"use client";
import React, { useEffect, useRef, useState } from "react";
import { Users, Calendar, Clock, Star, Award, ChevronRight } from "lucide-react";
import { IJob } from "@/types/IJob";
import { useGetMatchedInterviewersByJobDescription } from "@/hooks/api/useJob";
import { IInterviewerProfile, ISkillExpertise } from "@/validations/InterviewerSchema";
import { IInterviewSlot } from "@/types/ISlotTypes";
import SlotModal from "./AvailableSlotListingModal";
import { errorToast } from "@/utils/customToast";

const InterviewerList: React.FC<{
  selectedJob: IJob;
  onBookSlot: (interviewer: IInterviewerProfile, slot: IInterviewSlot) => void;
}> = ({ selectedJob, onBookSlot }) => {
  const [interviewers, setInterviewers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasFetched = useRef(false);

  const { getMatchedInterviewersByJobDescription } = useGetMatchedInterviewersByJobDescription();

  useEffect(() => {
    if (!selectedJob) return;
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchMatchedInterviewers = async () => {
      setLoading(true);
      const res = await getMatchedInterviewersByJobDescription(selectedJob._id!);
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

  const getAvailableSlotCount = (slots: IInterviewSlot[]) => {
    return (slots || []).filter(
      (slot) => slot.isAvailable && slot.status === "available"
    ).length;
  };

  return (
    <>
      <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 shadow-2xl space-y-5">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Users className="text-violet-400" size={20} />
              Matched Expert Interviewers
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Handpicked domain experts matching technical job skills
            </p>
          </div>
          <span className="bg-violet-950/80 text-violet-300 text-xs font-bold px-3 py-1 rounded-full border border-violet-800/50">
            {interviewers.length} Experts Available
          </span>
        </div>

        {/* Interviewers List Container */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {interviewers.length === 0 ? (
            <div className="text-center py-12 border border-zinc-900 rounded-2xl p-6">
              <Users className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-white mb-1">No Expert Interviewers Found</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                No active interviewers currently match the required technical stack for this position.
              </p>
            </div>
          ) : (
            interviewers.map((item: any) => {
              const interviewer: IInterviewerProfile = item.interviewer;
              const slots: IInterviewSlot[] = item.availableSlots || [];
              const availableCount = getAvailableSlotCount(slots);

              return (
                <div
                  key={interviewer._id}
                  className="p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={interviewer.avatar || "/placeholder.svg?height=40&width=40"}
                        alt={interviewer.name}
                        className="w-10 h-10 rounded-xl border border-zinc-700 object-cover shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-black text-white">{interviewer.name}</h4>
                        <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                          <Award size={12} className="text-violet-400" />
                          {interviewer.position || "Senior Tech Evaluator"} • {interviewer.experience || 5}+ Yrs Exp
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => openSlotModal(item)}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
                    >
                      <Calendar size={13} />
                      View Slots ({availableCount})
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {isModalOpen && selectedInterviewer && (
        <SlotModal
          isOpen={isModalOpen}
          onClose={closeSlotModal}
          interviewer={selectedInterviewer}
          selectedJob={selectedJob}
          onBookSlot={onBookSlot}
        />
      )}
    </>
  );
};

export default InterviewerList;
