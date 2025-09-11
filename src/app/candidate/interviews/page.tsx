"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, Sparkles, TrendingUp } from "lucide-react";
import { DelegatedJob } from "@/types/IJob";
import JobCard from "@/components/features/candidate/JobCard";
import InterviewCard, {
  IInterview,
} from "@/components/features/candidate/upcomingInterview/InterviewCard";
import GuidanceModal from "@/components/features/candidate/RulesAndGuidanceModal";
import {
  getStatusColor,
  getStatusIcon,
  formatStatus,
} from "@/utils/interviewUtils";
import {
  useGenerateMockInterviewQuestions,
  useGetDelegatedJobs,
} from "@/hooks/api/useCandidate";
import { useRouter } from "next/navigation";
import MockInterview from "@/components/features/candidate/MockInterview";
import { IQuestion } from "@/types/IInterview";
import {
  useGetScheduledInterviews,
  useSubmitMockResultAndUpdateQualificationStatus,
} from "@/hooks/api/useInterview";
import { useSocketStore } from "@/features/socket/Socket";
import { useAuthStore } from "@/features/auth/authStore";

const CandidateInterviewsPage = () => {
  //socket
  const { socket } = useSocketStore();
  const { user } = useAuthStore();
  const { getAllScheduledInterviews } = useGetScheduledInterviews();

  const [isMockInitiated, setIsMockInitiated] = useState(false);
  const [activeTab, setActiveTab] = useState<"mock" | "upcoming">("mock");
  const [delegatedJobs, setDelegatedJobs] = useState<DelegatedJob[]>([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState<IInterview[]>(
    []
  );
  const [showGuidanceModal, setShowGuidanceModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<DelegatedJob | null>(null);
  const { getDelegatedJobs, loading } = useGetDelegatedJobs();
  const { generateMockInterviewQuestions, loading: mockQuestionsLoding } =
    useGenerateMockInterviewQuestions();
  const { submitMockResult } =
    useSubmitMockResultAndUpdateQualificationStatus();
  const [mockQuestions, setMockQuestions] = useState<IQuestion[]>([]);

  const router = useRouter();

  const fetchDelegatedJobs = async () => {
    const response = await getDelegatedJobs();
    console.log(response.data);
    setDelegatedJobs(response.data || []);
  };

  // Placeholder function for fetching upcoming interviews
  const fetchUpcomingInterviews = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await getUpcomingInterviews();
      // setUpcomingInterviews(response.data || []);
      const response = await getAllScheduledInterviews(user?.id as string);
      if (response.success) {
        setUpcomingInterviews(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching upcoming interviews:", error);
    }
  };

  useEffect(() => {
    fetchDelegatedJobs();
    fetchUpcomingInterviews();
  }, []);

  const mockInterviews = delegatedJobs.filter((job) =>
    ["mock_pending", "mock_started", "mock_completed", "mock_failed"].includes(
      job.mockStatus
    )
  );

  const scheduledInterviews = delegatedJobs.filter((job) =>
    ["shortlisted", "final_scheduled"].includes(job.mockStatus)
  );

  const handleStartMock = (job: DelegatedJob) => {
    setSelectedJob(job);
    setShowGuidanceModal(true);
  };

  const handleProceedToMock = async () => {
    setShowGuidanceModal(false);
    if (selectedJob) {
      setDelegatedJobs((prev) =>
        prev.map((job) =>
          job.jobId === selectedJob.jobId
            ? { ...job, mockStatus: "mock_started" }
            : job
        )
      );
      const response = await generateMockInterviewQuestions(
        selectedJob.delegatedCandidateId
      );
      setMockQuestions(response.data);
      setIsMockInitiated(true);
    }
  };

  const handleJoinMeeting = (interview: IInterview) => {
    if (interview.meetingLink) {
      router.push(`/interviews/${interview._id}?room=${interview.meetingLink}`);
    } else {
      // Fallback to room navigation
      router.push("/interviews/6895a258f8b7c03f2bfec320?room=uhd-ywyf-poi");
    }
  };

  const getTabStats = () => {
    const completedMocks = mockInterviews.filter(
      (job) => job.mockStatus === "mock_completed"
    ).length;
    const upcomingCount =
      upcomingInterviews.length + scheduledInterviews.length;

    return {
      mockCompletion:
        mockInterviews.length > 0
          ? Math.round((completedMocks / mockInterviews.length) * 100)
          : 0,
      upcomingCount,
    };
  };

  const stats = getTabStats();

  return isMockInitiated ? (
    <div className="ml-64">
      <MockInterview
        onBackToDashboard={() => router.push("/candidate/dashboard")}
        questions={mockQuestions}
        delegationId={selectedJob?.delegatedCandidateId!}
        submitMockResultAndUpdateStatus={submitMockResult}
      />
    </div>
  ) : (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  My Interviews
                </h1>
                <p className="text-gray-300 mt-1">
                  Master your skills with mock interviews and ace your upcoming
                  sessions
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockInterviews.length}
                    </p>
                    <p className="text-gray-400 text-sm">Mock Interviews</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {stats.upcomingCount}
                    </p>
                    <p className="text-gray-400 text-sm">Upcoming Sessions</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {stats.mockCompletion}%
                    </p>
                    <p className="text-gray-400 text-sm">Completion Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-8 bg-white/5 backdrop-blur-sm p-2 rounded-xl inline-flex border border-white/10">
            <button
              onClick={() => setActiveTab("mock")}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-3 ${
                activeTab === "mock"
                  ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>Mock Interviews</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activeTab === "mock"
                    ? "bg-white/20 text-white"
                    : "bg-violet-500/20 text-violet-300 border border-violet-400/30"
                }`}
              >
                {mockInterviews.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-3 ${
                activeTab === "upcoming"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Upcoming Interviews</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activeTab === "upcoming"
                    ? "bg-white/20 text-white"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                }`}
              >
                {stats.upcomingCount}
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="min-h-[400px]">
            {activeTab === "mock" && (
              <div className="space-y-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
                  </div>
                ) : mockInterviews.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-12 h-12 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No Mock Interviews Yet
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Start practicing with AI-powered mock interviews
                    </p>
                    <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-medium hover:from-violet-600 hover:to-purple-700 transition-all duration-200">
                      Explore Opportunities
                    </button>
                  </div>
                ) : (
                  mockInterviews.map((job) => (
                    <JobCard
                      key={job.jobId}
                      job={job}
                      onStartMock={handleStartMock}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                      formatStatus={formatStatus}
                      isMockQuestionsLoading={mockQuestionsLoding}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "upcoming" && (
              <div className="space-y-6">
                {upcomingInterviews.length <= 0 ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                  </div>
                ) : upcomingInterviews.length === 0 &&
                  scheduledInterviews.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="w-12 h-12 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No Upcoming Interviews
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Complete your mock interviews to unlock final rounds
                    </p>
                    <button
                      onClick={() => setActiveTab("mock")}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
                    >
                      Practice Mock Interviews
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Upcoming Scheduled Interviews from API */}
                    {upcomingInterviews.map((interview) => (
                      <InterviewCard
                        key={interview._id}
                        interview={interview}
                        onJoinMeeting={handleJoinMeeting}
                      />
                    ))}

                    {/* Scheduled from delegated jobs (temporary until API is ready) */}
                    {scheduledInterviews.map((job) => (
                      <div
                        key={job.jobId}
                        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {job.jobTitle}
                              </h3>
                              <p className="text-gray-300 text-sm">
                                {"Company Name"}
                              </p>
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(
                                  job.mockStatus
                                )}`}
                              >
                                {formatStatus(job.mockStatus)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              router.push(
                                "/interviews/6895a258f8b7c03f2bfec320?room=uhd-ywyf-poi"
                              )
                            }
                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-emerald-500/25"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>Schedule Interview</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Guidance Modal */}
          {showGuidanceModal && (
            <GuidanceModal
              onClose={() => setShowGuidanceModal(false)}
              onAccept={handleProceedToMock}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateInterviewsPage;
