"use client";
import React, { useEffect, useState } from "react";
import {
  Star,
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

import {
  IInterviewerProfile,
  ISkillExpertise,
} from "@/validations/InterviewerSchema";
import { IInterviewSlot } from "@/types/ISlotTypes";


const SlotModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  interviewer: any;
  onBookSlot: (interviewer: IInterviewerProfile, slot: IInterviewSlot) => void;
  selectedJob: IJob;
}> = ({ isOpen, onClose, interviewer, onBookSlot, selectedJob }) => {
  console.log(interviewer)
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Move all hook calls to the top, before any conditional returns
  useEffect(() => {
    if (interviewer?.slots) {
      const groupedSlots = groupSlotsByDate(interviewer.slots || []);
      const dates = Object.keys(groupedSlots).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );

      // Filter dates to only show those with available slots
      const availableDates = dates.filter((date) =>
        groupedSlots[date].some((slot) => isSlotAvailable(slot))
      );

      if (availableDates.length > 0 && !selectedDate) {
        setSelectedDate(availableDates[0]);
      }
    }
  }, [interviewer?.slots, selectedDate]); // Add dependencies

  if (!isOpen || !interviewer) return null;

  // Group slots by date
  const groupSlotsByDate = (slots: IInterviewSlot[]) => {
    const grouped: { [key: string]: IInterviewSlot[] } = {};

    slots.forEach((slot) => {
      const date = new Date(slot.startTime).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
    });

    return grouped;
  };

  const isSlotAvailable = (slot: IInterviewSlot) =>
    slot.isAvailable && slot.status === "available";

  const groupedSlots = groupSlotsByDate(interviewer.slots || []);
  const dates = Object.keys(groupedSlots).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Filter dates to only show those with available slots
  const availableDates = dates.filter((date) =>
    groupedSlots[date].some((slot) => isSlotAvailable(slot))
  );

  const formatDateForCard = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    if (isToday) return { label: "Today", date: date.getDate().toString() };
    if (isTomorrow)
      return { label: "Tomorrow", date: date.getDate().toString() };

    return {
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate().toString(),
    };
  };

  const selectedDateSlots = selectedDate
    ? groupedSlots[selectedDate]?.filter(isSlotAvailable) || []
    : [];

  const onHandleOnBookSlot = async (
    interviewer: IInterviewerProfile,
    slot: IInterviewSlot
  ) => {
    await onBookSlot(interviewer, slot);
    const filteredSlots = selectedDateSlots.filter((s) => s._id !== slot._id);
    setSelectedDate(filteredSlots.length > 0 ? selectedDate : null);

    onClose();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */} 
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-violet-900/20 to-purple-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={interviewer.interviewer.avatar}
                  alt={interviewer.interviewer.name}
                  className="w-16 h-16 rounded-full object-cover border-3 border-violet-400 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {interviewer.interviewer.name}
                </h2>
                <p className="text-violet-200 font-medium">
                  {interviewer.interviewer.position}
                </p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-gray-300 text-sm">
                    {interviewer.interviewer.experience} years experience
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Skills Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-violet-400" />
              Expertise Areas
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {getSortedSkills(interviewer.interviewer.expertise)?.map(
                (expertise: ISkillExpertise, idx: number) => (
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
                )
              )}
            </div>
          </div>
        </div>

        {/* Slots Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-violet-400" />
              Available Time Slots
            </h3>
            <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-violet-300 px-4 py-2 rounded-full text-sm font-medium border border-violet-500/30">
              {interviewer.slots.filter(isSlotAvailable).length} slots available
            </div>
          </div>

          {availableDates.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-400 mb-2">
                No Available Slots
              </h4>
              <p className="text-gray-500">
                This interviewer doesn't have any available time slots at the
                moment.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Date Selection Cards */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-violet-400" />
                  Select Date
                </h4>
                <div className="flex flex-wrap gap-3 mb-6">
                  {availableDates.map((date) => {
                    const availableSlots =
                      groupedSlots[date].filter(isSlotAvailable);
                    const dateInfo = formatDateForCard(date);
                    const isSelected = selectedDate === date;

                    return (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`relative p-3 rounded-lg border transition-all duration-300 min-w-[80px] ${
                          isSelected
                            ? "border-violet-500 bg-gradient-to-br from-violet-600/30 to-purple-600/30 shadow-md shadow-violet-500/20 transform scale-105"
                            : "border-gray-600 bg-gradient-to-br from-gray-800/50 to-gray-700/30 hover:border-violet-400/50 hover:bg-gradient-to-br hover:from-gray-800/70 hover:to-violet-900/20 hover:shadow-sm hover:transform hover:scale-102"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`text-lg font-bold mb-1 ${
                              isSelected ? "text-white" : "text-gray-300"
                            }`}
                          >
                            {dateInfo.date}
                          </div>
                          <div
                            className={`text-xs font-medium mb-1.5 ${
                              isSelected ? "text-violet-200" : "text-gray-400"
                            }`}
                          >
                            {dateInfo.label}
                          </div>
                          <div
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-white/20 text-violet-200"
                                : "bg-gray-600/50 text-gray-400"
                            }`}
                          >
                            {availableSlots.length} slots
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1 right-1">
                            <CheckCircle className="h-3 w-3 text-violet-400" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Date Slots */}
              {selectedDate && selectedDateSlots.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-semibold text-white">
                      {new Date(selectedDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h4>
                    <span className="text-sm text-gray-400">
                      {selectedDateSlots.length} slots available
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedDateSlots.map((slot: IInterviewSlot,idx) => (
                      <div
                        key={`${slot._id}-${idx}`}
                        className="group p-4 rounded-lg border border-green-500/30 bg-gradient-to-br from-green-900/10 to-emerald-900/10 hover:from-green-900/20 hover:to-emerald-900/20 hover:border-green-400/50 transition-all duration-300 hover:shadow-md hover:shadow-green-500/10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="p-1.5 rounded-md bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30">
                              <Clock className="h-4 w-4 text-violet-400" />
                            </div>
                            <div>
                              <div className="font-semibold text-white text-base">
                                {new Date(slot.startTime).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                              <div className="text-xs text-gray-400">
                                {slot.duration} minutes
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-400 font-medium">
                              Available
                            </span>
                          </div>
                        </div>

                        {slot.meetingLink && (
                          <div className="mb-3 p-2 bg-gray-800/30 rounded-md border border-gray-700">
                            <div className="text-xs text-gray-400">
                              <span className="font-medium text-violet-300">
                                Platform:
                              </span>{" "}
                              Video Call
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() =>
                            onHandleOnBookSlot(interviewer.interviewer, slot)
                          }
                          className="w-full py-2 px-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-md hover:from-violet-700 hover:to-purple-700 transition-all font-medium text-sm shadow-md hover:shadow-violet-500/25 transform hover:scale-[1.02] group-hover:shadow-lg"
                        >
                          Book This Slot
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotModal;
