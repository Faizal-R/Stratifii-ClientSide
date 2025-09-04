"use client";
import React, { useState, useEffect } from "react";
import { InterviewCard } from "@/components/features/interviewer/interview/InterviewCard";
import { InterviewFilters } from "@/components/features/interviewer/interview/InterviewFilters";
import { IInterview } from "@/types/IInterview";
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  X,
  ExternalLink,
} from "lucide-react";
import {
  useGetAllInterviewsByCandidateId,
  useGetAllUpcomingInterviews,
} from "@/hooks/api/useInterview";
import { useRouter } from "next/navigation";
import { CandidateHistoryModal } from "@/components/features/interviewer/interview/CandidateInterivewHistoryModal";
import {  ICandidateProfile } from "@/types/ICandidate";

const InterviewsPage: React.FC = () => {
  const router = useRouter();
  const { getAllUpcomingInterviews } = useGetAllUpcomingInterviews();
  const [upcomingInterviews, setUpcomingInterviews] = useState<IInterview[]>(
    []
  );
  const [filteredInterviews, setFilteredInterviews] = useState<IInterview[]>(
    []
  );
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [isCandidateHistoryModalOpen, setIsCandidateHistoryModalOpen] =
    useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<ICandidateProfile| null>(
    null
  );
  const [pastInterviewsOfCandidate, setPastInterviewsOfCandidate] = useState<
    IInterview[]
  >([]);

  const { getAllInterviewsByCandidateId } = useGetAllInterviewsByCandidateId();

  const handleJoinMeeting = (meetingLink: string, interviewId: string) => {
    router.push(`/interviews/${interviewId}?room=${meetingLink}`);
  };
  console.log("upcomingInterviews", upcomingInterviews);

  const filterInterviews = () => {
    let filtered = [...upcomingInterviews];

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(
        (interview) => interview.status === statusFilter
      );
    }

    // Date filter
    if (dateFilter) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const thisWeekEnd = new Date(
        today.getTime() + (7 - today.getDay()) * 24 * 60 * 60 * 1000
      );
      const nextWeekEnd = new Date(
        thisWeekEnd.getTime() + 7 * 24 * 60 * 60 * 1000
      );

      filtered = filtered.filter((interview) => {
        const interviewDate = new Date(interview.startTime);

        switch (dateFilter) {
          case "today":
            return interviewDate >= today && interviewDate < tomorrow;
          case "tomorrow":
            return (
              interviewDate >= tomorrow &&
              interviewDate < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
            );
          case "this_week":
            return interviewDate >= today && interviewDate <= thisWeekEnd;
          case "next_week":
            return interviewDate > thisWeekEnd && interviewDate <= nextWeekEnd;
          case "past":
            return interviewDate < today;
          default:
            return true;
        }
      });
    }

    setFilteredInterviews(filtered);
  };

  useEffect(() => {
    filterInterviews();
  }, [statusFilter, dateFilter, upcomingInterviews]);

  useEffect(() => {
    const fetchUpcomingInterviews = async () => {
      const res = await getAllUpcomingInterviews();
      if (res.success) {
        console.log(res.data);
        setUpcomingInterviews(res.data);
      }
    };
    fetchUpcomingInterviews();
  }, []);

  const getStats = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return {
      total: upcomingInterviews.length,
      upcoming: upcomingInterviews.filter((i) => i.status === "booked").length,
      todayInterviews: upcomingInterviews.filter((i) => {
        const date = new Date(i.startTime);
        return (
          date >= today &&
          date < new Date(today.getTime() + 24 * 60 * 60 * 1000)
        );
      }).length,
      ongoing: upcomingInterviews.filter((i) => {
        const start = new Date(i.startTime);
        const end = new Date(i.endTime);
        return now >= start && now <= end && i.status === "booked";
      }).length,
      completed: upcomingInterviews.filter((i) => i.status === "completed")
        .length,
    };
  };

  const stats = getStats();

  const onShowCandidateHistory = async (candidateId: string) => {
    const response = await getAllInterviewsByCandidateId(candidateId);
    const candidate=upcomingInterviews.find(
      (interview) => interview.candidate._id === candidateId
    );
    if (response.success) {
      setPastInterviewsOfCandidate(response.data);
      setSelectedCandidate(candidate?.candidate as ICandidateProfile);
      setIsCandidateHistoryModalOpen(true);
    }
  };

  return (
    <div className=" ml-64 min-h-screen bg-gradient-to-br from-black via-black to-violet-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Interview Management
          </h1>
          <p className="text-gray-300">
            Manage and track all scheduled Interviews
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Total Interviews</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Today's Interviews</p>
                <p className="text-2xl font-bold text-white">
                  {stats.todayInterviews}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Ongoing Now</p>
                <p className="text-2xl font-bold text-white">{stats.ongoing}</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Upcoming</p>
                <p className="text-2xl font-bold text-white">
                  {stats.upcoming}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <InterviewFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
        />

        {/* Interviews List */}
     <div className="grid grid-cols-3 gap-4">
          {filteredInterviews.length > 0 ? (
            filteredInterviews.map((interview) => (
              <InterviewCard
                key={interview._id}
                interview={interview}
                onJoinMeeting={handleJoinMeeting}
                onShowCandidateHistory={onShowCandidateHistory}
              />
            ))
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No upcomingInterviews found
              </h3>
              <p className="text-gray-300">
                {statusFilter || dateFilter
                  ? "Try adjusting your filters to see more results."
                  : "No Interviews have been scheduled yet."}
              </p>
            </div>
          )}
        </div>
      </div>
      <CandidateHistoryModal
        interviews={pastInterviewsOfCandidate}
        candidate={selectedCandidate}
        onClose={() => setIsCandidateHistoryModalOpen(false)}
        isOpen={isCandidateHistoryModalOpen}
      />
    </div>
  );
};

export default InterviewsPage;
