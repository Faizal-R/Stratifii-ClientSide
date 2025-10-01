"use client";
import { useEffect, useRef, useState } from "react";
import {
  Upload,
  FileText,
  Users,
  PlayCircle,
  CalendarClock,
  CheckCircle,
  Clock,
  XCircle,
  Trophy,
  BookOpen,
  Search,
  Star,
  TrendingUp,
  UserPlus,
  AlertTriangle,
  Eye,
  ChevronRight,
  CalendarCheck,
} from "lucide-react";
import FileUploadModal from "@/components/ui/Modals/FileUploadModal";
import SlotModal from "@/components/features/company/schedule-interview/AvailableSlotListingModal";
import {
  useGetCandidatesByJob,
  useUploadResumesAndCreateCandidates,
} from "@/hooks/api/useJob";
import { useParams } from "next/navigation";

import { RiseLoader } from "react-spinners";
import PaymentProceedModal from "@/components/ui/Modals/PaymentProceedModal";
import {
  usePaymentOrderCreation,
  useHandleInterviewProcessInitializationPayment,
  useHandleRetryInterviewProcessInitializationPayment,
} from "@/hooks/api/usePayment";
import { initiateRazorpayPayment } from "@/utils/razorpay";
import {
 
  ICandidateProfile,
  IDelegatedCandidate,
  IInterviewRound,
} from "@/types/ICandidate";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";
import { IInterviewSlot } from "@/types/ISlotTypes";
import { useGetAllSlotsByInterviewer } from "@/hooks/api/useSlot";
import { useScheduleInterviewForCandidate } from "@/hooks/api/useSlot";
import InterviewRoundsModal from "../../../../../../components/features/interviewer/interview/InterviewRoundsModal";
import { errorToast, successToast } from "@/utils/customToast";
import { useAuthStore } from "@/features/auth/authStore";

type TabType = "all" | "in-progress" | "completed";

interface TabConfig {
  id: TabType;
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  count?: number;
}

function JobManagementPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState<{
    interviewer: IInterviewerProfile;
    slots: IInterviewSlot[];
  } | null>(null);
  const [currentCandidate, setCurrentCandidate] =
    useState<IDelegatedCandidate | null>(null);
  const { getSlotsByInterviewer } = useGetAllSlotsByInterviewer();

  const { paymentOrderCreation } = usePaymentOrderCreation();
  const [isInterviewProcessInitiated, setIsInterviewProcessInitiated] =
    useState(false);

  const [hasPaymentRetryAttempted, setHasPaymentRetryAttempted] =
    useState(false);

  const {
    handleInterviewProcessInitializationPayment,
    loading: initPaymentLoading,
  } = useHandleInterviewProcessInitializationPayment();

  const {
    handleRetryInterviewProcessInitializationPayment,
    loading: retryInitPaymentLoading,
  } = useHandleRetryInterviewProcessInitializationPayment();

  const jobId = useParams().id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const { loading, getCandidatesByJob } = useGetCandidatesByJob();
  const {
    uploadResumesAndCreateCandidates,
    loading: isCandidateResumeUploading,
  } = useUploadResumesAndCreateCandidates();
  const { scheduleInterview } = useScheduleInterviewForCandidate();
  const [isRoundsModalOpen, setIsRoundsModalOpen] = useState(false);
  const [selectedCandidateForRounds, setSelectedCandidateForRounds] =
    useState<IDelegatedCandidate | null>(null);

  const handleModalConfirmation = async (totalAmount: number) => {
    const response = await paymentOrderCreation(totalAmount);
    if (!response.success) {
      errorToast(response.message);
      return;
    }
    const { id: orderId, amount } = response.data;
    initiateRazorpayPayment({
      amount: amount,
      orderId: orderId,
      name: "Stratifii Interviews",
      description: "Payment for Interview Process",
      image: "https://your-image-url",
      prefill: {
        name: user?.name!,
        email: user?.email!,
        contact: "1234567890",
      },
      onSuccess: async (response) => {
        const res = hasPaymentRetryAttempted
          ? await handleRetryInterviewProcessInitializationPayment(jobId)
          : await handleInterviewProcessInitializationPayment(
              response,
              jobId,
              candidates.length
            );
        if (!res.success) {
          errorToast(res.message);
          return;
        }

        setIsInterviewProcessInitiated(true);
        setIsConfirmationModalOpen(false);
        if(hasPaymentRetryAttempted)setHasPaymentRetryAttempted(false);
        successToast(res.message);
      },
      onFailure: async () => {
        const isPaymentFailed = true;
        const res = await handleInterviewProcessInitializationPayment(
          null, // or handle error appropriately
          jobId,
          candidates.length,
          isPaymentFailed
        );
        if (!res.success) {
          errorToast(res.message);
          return;
        }

        setHasPaymentRetryAttempted(true);
        setIsConfirmationModalOpen(false);
      },
    });
  };

  const [candidates, setCandidates] = useState<IDelegatedCandidate[]>([]);

  const onhandleCandidateDelegationComplete = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("resumes", file);
    });

    const response = await uploadResumesAndCreateCandidates(jobId!, formData);
    if (!response.success) {
      errorToast(response.message);
      return;
    }
    console.log(response.data);
    setCandidates((prev) => [...prev, ...response.data]);
    successToast(response.message);
    setIsModalOpen(false);
  };

  // Handle opening slot modal for next round
  const handleNextRound = async (
    candidate: IDelegatedCandidate,
    interviewer: IInterviewerProfile
  ) => {
    console.log(interviewer);

    const res = await getSlotsByInterviewer(interviewer._id!);
    if (res.success) {
      const slots = res.data;
      console.log(interviewer, slots);
      setSelectedInterviewer({ interviewer, slots });
      setCurrentCandidate(candidate);
      setIsSlotModalOpen(true);
    }
  };

  // Handle booking slot for next round
  const handleBookSlot = async (
    interviewer: IInterviewerProfile,
    slot: IInterviewSlot
  ) => {
    if (!currentCandidate) return;

    try {
      const res = await scheduleInterview({
        candidate: (currentCandidate.candidate as ICandidateProfile)._id,
        slot,
        interviewer: interviewer._id as string,
        job: jobId,
        isFollowUpScheduling: true,
      });
      if (!res.success) {
        errorToast(res.message);
        return;
      }
      // Update candidate status and add new interview round
      const updatedCandidates = candidates.map((c) => {
        if (c._id === currentCandidate._id) {
          const lastIndex = c.interviewRounds.length - 1;

          return {
            ...c,
            interviewRounds: c.interviewRounds.map((round, index) => {
              if (index === lastIndex) {
                return {
                  ...round,
                  isFollowUpScheduled: true,
                };
              }
              return round;
            }),
            isInterviewScheduled: true,
          };
        }
        return c;
      });

      setCandidates(updatedCandidates as IDelegatedCandidate[]);
      successToast("Next interview round scheduled successfully!");
      setIsSlotModalOpen(false);
      setCurrentCandidate(null);
      setSelectedInterviewer(null);
    } catch (error) {
      errorToast("Failed to schedule next round");
    }
  };

  // Handle completing candidate
  const handleCompleteCandidate = async (candidateId: string) => {
    try {
      const updatedCandidates = candidates.map((c) => {
        if (c._id === candidateId) {
          return {
            ...c,
            status: "shortlisted" as const,
          };
        }
        return c;
      });

      setCandidates(updatedCandidates);
      successToast("Candidate Interview Process marked as completed!");
    } catch (error) {
      errorToast("Failed to complete candidate");
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchCandidates = async () => {
      const response = await getCandidatesByJob(jobId);
      if (!response.success) {
        errorToast(response.message);
        return;
      }
      if (response.data.jobPaymentStatus === "PAID") {
        setIsInterviewProcessInitiated(true);
      }
      if (response.data.jobPaymentStatus === "FAILED") {
        setHasPaymentRetryAttempted(true);
      }

      setCandidates(response.data.candidates);
      console.log(response.data);
    };

    fetchCandidates();
  }, [getCandidatesByJob, candidates]);

  // Get filtered candidates based on search and job filter
  const getFilteredCandidates = (tabId: TabType): IDelegatedCandidate[] => {
    let filtered = candidates;

    // Filter by tab
    switch (tabId) {
      case "all":
        filtered = candidates;
        break;
      case "in-progress":
        filtered = candidates.filter((c) =>
          [
            "in_interview_process",
            "mock_started",
            "mock_completed",
            "shortlisted",
          ].includes(c.status)
        );
        break;
      case "completed":
        filtered = candidates.filter((c) =>
          ["shortlisted", "hired"].includes(c.status)
        );
        break;
      default:
        filtered = candidates;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((c) => {
        const profile = c.candidate as ICandidateProfile;
        return (
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    return filtered;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "mock_pending":
        return <Clock className="w-3 h-3" />;
      case "mock_started":
        return <PlayCircle className="w-3 h-3" />;
      case "mock_completed":
        return <CheckCircle className="w-3 h-3" />;
      case "mock_failed":
        return <XCircle className="w-3 h-3" />;
      case "in_interview_process":
      case "scheduled":
        return <CalendarClock className="w-3 h-3" />;
      case "completed":
      case "hired":
        return <Trophy className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const formatStatusText = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Calculate counts for tabs
  const allCount = candidates.length;
  const inProgressCount = candidates.filter((c) =>
    [
      "in_interview_process",
      "mock_started",
      "shortlisted",
      "mock_completed",
    ].includes(c.status)
  ).length;
  const completedCount = candidates.filter((c) =>
    ["completed", "hired", "shortlisted"].includes(c.status)
  ).length;

  const tabs: TabConfig[] = [
    {
      id: "all",
      label: "All Candidates",
      icon: Users,
      color: "text-violet-300",
      bgColor: "bg-violet-600/20",
      borderColor: "border-violet-500/40",
      count: allCount,
    },
    {
      id: "in-progress",
      label: "In Progress",
      icon: TrendingUp,
      color: "text-amber-300",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/40",
      count: inProgressCount,
    },
    {
      id: "completed",
      label: "Completed",
      icon: Trophy,
      color: "text-emerald-300",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/40",
      count: completedCount,
    },
  ];

  const filteredCandidates = getFilteredCandidates(activeTab);
  const handleViewRounds = (candidate: IDelegatedCandidate) => {
    setSelectedCandidateForRounds(candidate);
    setIsRoundsModalOpen(true);
  };

  const getLatestCompletedRound = (interviewRounds: IInterviewRound[]) => {
    // const completedRounds = interviewRounds.filter(
    //   (r) => r.status === "completed" && r.feedback
    // );
    return interviewRounds.length > 0
      ? interviewRounds[interviewRounds.length - 1]
      : null;
  };

  const getNextAction = (candidate: IDelegatedCandidate) => {
    const completedRounds = candidate.interviewRounds;

    if (completedRounds.length === 0) {
      return { type: "none", reason: "No completed rounds with feedback" };
    }

    const latestCompletedRound = completedRounds[completedRounds.length - 1];
    const feedback = latestCompletedRound.feedback;

    if (!feedback) {
      return { type: "none", reason: "No feedback available" };
    }

    // Check if all planned rounds are completed
    const allRoundsCompleted =
      candidate.interviewRounds.length >= candidate.totalNumberOfRounds!;

    if (feedback.recommendation === "hire") {
      return { type: "complete", reason: "Recommendation: Hire" };
    } else if (feedback.recommendation === "no-hire") {
      return { type: "complete", reason: "Recommendation: No Hire" };
    } else if (
      feedback.needsFollowUp === true ||
      feedback.recommendation === "next-round"
    ) {
      if (allRoundsCompleted) {
        return { type: "complete", reason: "All rounds completed" };
      }
      return { type: "next-round", reason: "Follow-up needed" };
    } else if (allRoundsCompleted) {
      return { type: "complete", reason: "All rounds completed" };
    }

    return { type: "next-round", reason: "Continue interview process" };
  };
  return loading ? (
    <div className=" h-screen flex items-center justify-center">
      <RiseLoader className="" color="white" />
    </div>
  ) : (
    <div className="custom-64 min-h-screen bg-gradient-to-br from-black via-black to-violet-950 pb-3">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 blur-3xl rounded-full" />

        <div className="relative backdrop-blur-xl border-violet-500/20">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  Candidate Management
                </h1>
                <p className="text-violet-200/80 mt-2 text-lg">
                  Organize and track candidates through their interview journey
                </p>
              </div>

              {candidates.length > 0 && !isInterviewProcessInitiated && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative px-6 py-3 bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white rounded-xl border border-violet-500/30 hover:from-violet-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
                    <div className="relative flex items-center">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Resume
                    </div>
                  </button>
                  <button
                    onClick={() => setIsConfirmationModalOpen(true)}
                    className={`group relative px-6 py-3 min-w-6 min-h-3 text-white rounded-xl border transition-all duration-300 shadow-lg 
    ${
      hasPaymentRetryAttempted
        ? "bg-gradient-to-r from-red-600/80 to-pink-600/80 border-red-500/30 hover:from-red-500 hover:to-pink-500 hover:shadow-red-500/25"
        : "bg-gradient-to-r from-emerald-600/80 to-green-600/80 border-emerald-500/30 hover:from-emerald-500 hover:to-green-500 hover:shadow-emerald-500/25"
    }`}
                  >
                    <div
                      className={`absolute inset-0 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity 
      ${
        hasPaymentRetryAttempted
          ? "bg-gradient-to-r from-red-600 to-pink-600"
          : "bg-gradient-to-r from-emerald-600 to-green-600"
      }`}
                    />
                    <div className="relative flex items-center justify-center">
                      <PlayCircle className="mr-2 h-5 w-5 animate-pulse" />
                      {hasPaymentRetryAttempted
                        ? "Retry Payment"
                        : "Initiate Interview Process"}
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 ">
        {candidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] rounded-2xl shadow-sm border-gray-200">
            <div className="text-center">
              <Users className="h-20 w-20 text-gray-300 mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-700 mb-3">
                No Candidates Available
              </h2>
              <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                Start by uploading candidate resumes to begin the interview
                process. Candidates will be organized by their interview status.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-8 py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Upload className="mr-3 h-6 w-6" />
                <span className="font-medium font-mono">
                  {" "}
                  Delegate Candidates
                </span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 mb-3">
              {/* Search Bar */}
              <div className="flex-1 relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search candidates by name or email..."
                  className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-violet-800/50 p-1 shadow-2xl mb-5">
              <div className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-4 flex items-center justify-center gap-3 rounded-xl transition-all duration-300 relative ${
                        isActive
                          ? `${tab.bgColor} ${tab.color} shadow-lg scale-105`
                          : "text-gray-400 hover:text-violet-300 hover:bg-violet-600/10"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? tab.color : "text-gray-500"
                        }`}
                      />
                      <span className="font-semibold">{tab.label}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-700/50 text-gray-400"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Candidates Grid */}
            {filteredCandidates.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/50 rounded-2xl border border-violet-800/30 backdrop-blur-xl">
                <BookOpen className="h-16 w-16 text-violet-300/50 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No candidates found
                </h3>
                <p className="text-violet-200/70">
                  Adjust your filters or search terms to find candidates.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-5">
                {filteredCandidates.map(
                  (candidateWrapper: IDelegatedCandidate) => {
                    const profile =
                      candidateWrapper.candidate as ICandidateProfile;
                    const latestCompletedRound = getLatestCompletedRound(
                      candidateWrapper.interviewRounds
                    );
                    const nextAction = getNextAction(candidateWrapper);

                    return (
                      <div
                        key={profile._id}
                        className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-violet-800/50 shadow-2xl hover:shadow-violet-700/30 transition-all duration-500 overflow-hidden group hover:scale-[1.02] hover:border-violet-600/70"
                      >
                        {/* Header with Status Badge */}
                        <div className="p-6 py-4">
                          <div className="flex items-center justify-between ">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <img
                                  src={
                                    profile.avatar ||
                                    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
                                  }
                                  alt={profile.name}
                                  className="h-16 w-16 rounded-full object-cover border-2 border-violet-500/50 group-hover:border-violet-400 transition-all duration-300"
                                />
                                {profile.status === "active" && (
                                  <span className="absolute bottom-1 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-white group-hover:text-violet-200 transition-colors">
                                  {profile.name}
                                </h3>
                                <p className="text-sm text-violet-400/80">
                                  {profile.email}
                                </p>
                              </div>
                            </div>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              {profile.status}
                            </span>
                          </div>

                          {/* Interview Progress Bar */}
                        </div>

                        {/* Content */}
                        {candidateWrapper.interviewRounds.length > 0 && (
                          <div className="flex justify-end mr-6 mb-2">
                            <button
                              onClick={() => handleViewRounds(candidateWrapper)}
                              className="inline-flex items-center gap-2 px-2 py-1 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-600/50 hover:border-violet-500/50 rounded-xl text-slate-300 hover:text-violet-300 transition-all duration-300 text-sm font-medium"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Rounds</span>
                              <div className="flex items-center gap-1">
                                <span className="min-w-[20px] h-4 flex items-center justify-center rounded-full bg-violet-600/30 border border-violet-500/40 text-xs font-bold text-violet-300">
                                  {candidateWrapper.interviewRounds.length}
                                </span>
                                <ChevronRight className="w-3 h-3" />
                              </div>
                            </button>
                          </div>
                        )}
                        <div className="px-6 pb-6 space-y-5">
                          {/* Profile Status */}

                          {latestCompletedRound && (
                            <div className="bg-violet-900/20 border border-violet-500/30 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-violet-600/30 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-violet-300">
                                      {latestCompletedRound.roundNumber}
                                    </span>
                                  </div>
                                  <span className="text-sm font-medium text-violet-300 capitalize">
                                    {latestCompletedRound.type} Round
                                  </span>
                                </div>
                                {latestCompletedRound.feedback
                                  ?.overallScore && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <span className="text-sm font-bold text-white">
                                      {
                                        latestCompletedRound.feedback
                                          .overallScore
                                      }
                                      /10
                                    </span>
                                  </div>
                                )}
                              </div>

                              {latestCompletedRound.feedback
                                ?.recommendation && (
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs text-violet-400">
                                    Recommendation:
                                  </span>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                      latestCompletedRound.feedback
                                        .recommendation === "hire"
                                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                        : latestCompletedRound.feedback
                                            .recommendation === "no-hire"
                                        ? "bg-red-500/20 text-red-300 border-red-500/40"
                                        : latestCompletedRound.feedback
                                            .recommendation === "next-round"
                                        ? "bg-violet-500/20 text-violet-300 border-violet-500/40"
                                        : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                    }`}
                                  >
                                    {latestCompletedRound.feedback.recommendation
                                      .replace("-", " ")
                                      .toUpperCase()}
                                  </span>
                                </div>
                              )}

                              {latestCompletedRound.feedback?.needsFollowUp && (
                                <>
                                  {latestCompletedRound.isFollowUpScheduled ? (
                                    <div className="flex items-center gap-2 text-green-400 text-xs">
                                      <CalendarCheck className="w-3 h-3" />
                                      <span>Follow-up Interview Scheduled</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 text-amber-400 text-xs">
                                      <AlertTriangle className="w-3 h-3" />
                                      <span>
                                        Follow-up Interview Recommended
                                      </span>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )}

                          {/* Resume */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-violet-400">
                              <FileText className="h-4 w-4 text-violet-300" />
                              <span>Resume</span>
                            </div>
                            {profile.resume ? (
                              <a
                                href={profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-lg text-xs font-medium hover:bg-violet-500/30 hover:border-violet-400 transition-all duration-200"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                View
                              </a>
                            ) : (
                              <span className="text-xs text-violet-500/70 italic">
                                Not uploaded
                              </span>
                            )}
                          </div>

                          {/* Interview Progress */}
                          {isInterviewProcessInitiated && (
                            <div className="pt-4 border-t border-violet-800/30">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2 text-sm text-violet-400">
                                  <CalendarClock className="h-4 w-4 text-violet-300" />
                                  <span>Interview Progress</span>
                                </div>
                                <div className="flex items-center gap-1 text-violet-300">
                                  {getStatusIcon(candidateWrapper.status)}
                                  <span className="text-xs">
                                    {candidateWrapper.isInterviewScheduled
                                      ? "Interivew Scheduled"
                                      : formatStatusText(
                                          candidateWrapper.status
                                        )}
                                  </span>
                                </div>
                              </div>

                              {/* Action Buttons */}

                              {candidateWrapper.interviewRounds.length > 0 && (
                                <div className="pt-4 border-t border-violet-800/30">
                                  {/* Smart Action Buttons */}
                                  {candidateWrapper.status ==
                                    "in_interview_process" &&
                                    !candidateWrapper.isInterviewScheduled && (
                                      <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                          onClick={() =>
                                            handleNextRound(
                                              candidateWrapper,
                                              latestCompletedRound?.interviewer as IInterviewerProfile
                                            )
                                          }
                                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-violet-500/25 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                                        >
                                          <UserPlus className="h-4 w-4" />
                                          Next Round
                                        </button>

                                        <button
                                          onClick={() =>
                                            handleCompleteCandidate(
                                              candidateWrapper._id!
                                            )
                                          }
                                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                                        >
                                          <CheckCircle className="h-4 w-4" />
                                          Complete
                                        </button>
                                      </div>
                                    )}

                                  {candidateWrapper.status ===
                                    "shortlisted" && (
                                    <div className="text-center py-3">
                                      <div className="flex items-center justify-center gap-2 text-emerald-400">
                                        <Trophy className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                          Ready for Final Decision
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && (
        <FileUploadModal
          setIsModalOpen={setIsModalOpen}
          onComplete={onhandleCandidateDelegationComplete}
          isCandidateResumeUploading={isCandidateResumeUploading}
        />
      )}

      {isSlotModalOpen && selectedInterviewer && (
        <SlotModal
          isOpen={isSlotModalOpen}
          onClose={() => {
            setIsSlotModalOpen(false);
            setSelectedInterviewer(selectedInterviewer);
            setCurrentCandidate(currentCandidate);
          }}
          interviewer={selectedInterviewer}
          onBookSlot={handleBookSlot}
          selectedJob={{
            _id: "64fabc12345ef67890abcd12",
            company: "TechNova Solutions",
            position: "Frontend Developer",
            description:
              "We are looking for a skilled frontend developer to join our team and work on exciting web applications using React and TypeScript.",
            requiredSkills: [
              "JavaScript",
              "TypeScript",
              "React",
              "CSS",
              "HTML",
            ],
            status: "open",
            experienceRequired: 2,
          }}
        />
      )}

      <PaymentProceedModal
        isOpen={isConfirmationModalOpen}
        onClosed={() => setIsConfirmationModalOpen(false)}
        onProceed={handleModalConfirmation}
        candidatesCount={candidates?.length}
        paymentLoading={initPaymentLoading}
      />
      {isRoundsModalOpen && selectedCandidateForRounds && (
        <InterviewRoundsModal
          isOpen={isRoundsModalOpen}
          onClose={() => {
            setIsRoundsModalOpen(false);
            setSelectedCandidateForRounds(null);
          }}
          rounds={selectedCandidateForRounds.interviewRounds}
          candidateName={
            (selectedCandidateForRounds.candidate as ICandidateProfile).name
          }
        />
      )}
    </div>
  );
}

export default JobManagementPage;
