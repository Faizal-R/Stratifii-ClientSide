"use client";
import { useEffect, useRef, useState } from "react";
import {
  Upload,
  FileText,
  Users,
  PlayCircle,
  UserCheck,
  CalendarClock,
  CheckCircle,
  Clock,
  XCircle,
  Trophy,
  Target,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import FileUploadModal from "@/components/ui/Modals/FileUploadModal";
import {
  useGetCandidatesByJob,
  useUploadResumesAndCreateCandidates,
} from "@/hooks/api/useJob";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { RiseLoader } from "react-spinners";
// import { Modal } from "@/components/ui/modals/ConfirmationModal";
import PaymentProceedModal from "@/components/ui/Modals/PaymentProceedModal";
import {
  usePaymentOrderCreation,
  usePaymentVerificationAndCreatePaymentRecord,
} from "@/hooks/api/usePayment";
import { initiateRazorpayPayment } from "@/utils/razorpay";
import {
  ICandidateJob,
  ICandidateProfile,
  IDelegatedCandidate,
} from "@/types/ICandidate";
import { IInterview } from "@/types/IInterview";
import FinalInterviewFeedback from "@/components/features/company/delegation/FinalInterviewFeedback";
import { init } from "next/dist/compiled/webpack/webpack";

// interface FileWithPreview extends File {
//   preview?: string;
// }

type TabType = "all" | "mock_completed" | "final_completed";

interface TabConfig {
  id: TabType;
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
}

function JobManagementPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { paymentOrderCreation } = usePaymentOrderCreation();
  const [isInterviewProcessInitiated, setIsInterviewProcessInitiated] =
    useState(false);

  const {
    paymentVerificationAndCreatePaymentRecord,
    loading: initPaymentLoading,
  } = usePaymentVerificationAndCreatePaymentRecord();

  const jobId = useParams().id as string;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const { loading, getCandidatesByJob } = useGetCandidatesByJob();

  const { uploadResumesAndCreateCandidates } =
    useUploadResumesAndCreateCandidates();

  const handleModalConfirmation = async (totalAmount: number) => {
    const response = await paymentOrderCreation(totalAmount);
    if (!response.success) {
      toast.error(response.error, {
        className: "custom-error-toast",
      });
      return;
    }
    const { id: orderId, amount } = response.data;
    initiateRazorpayPayment({
      amount: amount,
      orderId: orderId,
      name: "Stratifii Interviews",
      description: "Subscription Payment",
      image: "https://your-image-url",
      prefill: {
        name: "Stratifii",
        email: "stratifii@gmail.com",
        contact: "1234567890",
      },
      onSuccess: async (response) => {
        const res = await paymentVerificationAndCreatePaymentRecord(
          response,
          jobId,
          candidates.length
        );
        if (!res.success) {
          toast.error(res.error, {
            className: "custom-error-toast",
          });
          return;
        }

        setIsInterviewProcessInitiated(true);
        setIsConfirmationModalOpen(false);
        toast.success(res.message);
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
      toast.error(response.error, {
        className: "custom-error-toast",
      });
      return;
    }
    console.log(response.data);
    setCandidates((prev) => [...prev, ...response.data]);
    toast.success(response.message);
    setIsModalOpen(false);
  };

  // const removeFile = (candidateId: string, fileToRemove: File) => {
  //   setCandidates(
  //     candidates.map((candidate) => {
  //       if (candidate.id === candidateId) {
  //         return {
  //           ...candidate,
  //           files: candidate.files.filter((file) => file !== fileToRemove),
  //         };
  //       }
  //       return candidate;
  //     })
  //   );
  // };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchCandidates = async () => {
      const response = await getCandidatesByJob(jobId);
      if (!response.success) {
        toast.error(response.error, {
          className: "custom-error-toast",
        });
        return;
      }
      if (
        response.data[0] &&
        response.data[0]?.job &&
        response.data[0]?.job.paymentTransaction?.status
      )
        if (response.data[0].job.paymentTransaction?.status === "PAID") {
          setIsInterviewProcessInitiated(true);
        }

      setCandidates(response.data);
      console.log(response.data);
    };

    fetchCandidates();
  }, [getCandidatesByJob, candidates]);

  const tabs: TabConfig[] = [
    {
      id: "all",
      label: "All Candidates",
      icon: Users,
      color: "text-violet-300",
      bgColor: "bg-violet-600/20",
      borderColor: "border-violet-500/40",
    },
    {
      id: "mock_completed",
      label: "Mock Passed",
      icon: CheckCircle,
      color: "text-emerald-300",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/40",
    },
    {
      id: "final_completed",
      label: "Final Completed",
      icon: Trophy,
      color: "text-amber-300",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/40",
    },
  ];

  const getFilteredCandidates = (tabId: TabType): IDelegatedCandidate[] => {
    switch (tabId) {
      case "all":
        return candidates;
      case "mock_completed":
        return candidates.filter((c) => c.status === "mock_completed");
      case "final_completed":
        return candidates.filter((c) => c.status === "final_completed");
      default:
        return candidates;
    }
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
      case "final_scheduled":
        return <CalendarClock className="w-3 h-3" />;
      case "final_completed":
        return <Trophy className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const formatStatusText = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const filteredCandidates = getFilteredCandidates(activeTab);
  const activeTabConfig = tabs.find((tab) => tab.id === activeTab)!;

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center ">
      <RiseLoader className="" color="white" />
    </div>
  ) : (
    <div className=" ml-64 min-h-screen bg-gradient-to-br from-black via-black to-violet-950">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96  blur-3xl rounded-full" />

        <div className="relative  backdrop-blur-xl  border-violet-500/20">
          <div className="max-w-7xl mx-auto px-6 py-8">
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
                    className="group relative px-6 py-3 min-w-6 min-h-3 bg-gradient-to-r from-emerald-600/80 to-green-600/80 text-white rounded-xl border border-emerald-500/30 hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
                    <div className="relative flex items-center justify-center">
                      <PlayCircle className="mr-2 h-5 w-5 animate-pulse" />
                      Initiate Interview Process
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {candidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] rounded-2xl shadow-sm  border-gray-200">
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
                Upload First Resume
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="bg-zinc-900 rounded-2xl border border-violet-800 p-6 shadow-lg hover:shadow-violet-800/30  mb-8 overflow-hidden">
              <div className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const count = getFilteredCandidates(tab.id).length;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-6 flex items-center justify-center gap-3 transition-all duration-200 relative ${
                        isActive
                          ? `${tab.bgColor} ${tab.color} border-b-2 ${tab.borderColor}`
                          : "text-gray-600 hover:text-violet-300 hover:bg-violet-600/10"
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
                            ? `${tab.color} bg-white/80`
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Candidates Grid */}
            {filteredCandidates.length === 0 ? (
              <div className="text-center py-16   bg-zinc-900 rounded-2xl border border-violet-800 p-6 shadow-lg hover:shadow-violet-800/30">
                <BookOpen className="h-16 w-16 text-gray-300 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No candidates in "{activeTabConfig.label.toLowerCase()}"
                </h3>
                <p className="text-gray-500">
                  Candidates will appear here as they progress through the
                  interview process.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCandidates.map(
                  (candidateWrapper: IDelegatedCandidate) => {
                    const profile =
                      candidateWrapper.candidate as ICandidateProfile;
                    const feedback = candidateWrapper.finalInterviewFeedback;

                    return (
                      <div
                        key={profile._id}
                        className="bg-zinc-900 rounded-2xl border border-violet-800 shadow-lg shadow-violet-900/20 hover:shadow-violet-700/40 transition-all duration-300 overflow-hidden group text-violet-300"
                      >
                        {/* Header with Status Badge */}
                        <div className="p-6 pb-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={
                                  profile.avatar ||
                                  "https://png.pngitem.com/pimgs/s/508-5087336_person-man-user-account-profile-employee-profile-template.png"
                                }
                                alt={profile.name}
                                className="h-14 w-14 rounded-full object-cover border-2 border-violet-500/50 group-hover:scale-105 transition-transform duration-300"
                              />
                              <div>
                                <h3 className="font-bold text-lg text-white">
                                  {profile.name}
                                </h3>
                                <p className="text-sm text-violet-400">
                                  {profile.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 pb-6 space-y-5">
                          {/* Profile Status */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-violet-400">
                              <UserCheck className="h-4 w-4 text-violet-300" />
                              <span>Profile Status</span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                                profile.status === "active"
                                  ? "bg-green-200/20 text-green-400 border border-green-500/40"
                                  : "bg-yellow-200/20 text-yellow-400 border border-yellow-500/40"
                              }`}
                            >
                              {profile.status}
                            </span>
                          </div>

                          {/* Resume */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-violet-400">
                              <FileText className="h-4 w-4 text-violet-300" />
                              <span>Resume</span>
                            </div>
                            {profile.resume ? (
                              <a
                                href={`https://docs.google.com/viewer?url=${profile.resume}&embedded=true`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-lg text-xs font-medium hover:bg-violet-500/30 hover:border-violet-400 transition-all duration-200"
                              >
                                View Resume
                              </a>
                            ) : (
                              <span className="text-xs text-violet-500/70 italic">
                                Not uploaded
                              </span>
                            )}
                          </div>

                          {/* Interview Progress */}
                          <div className="pt-4 border-t border-violet-800/30">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-violet-400">
                                <CalendarClock className="h-4 w-4 text-violet-300" />
                                <span>Interview Progress</span>
                              </div>
                              <div className="flex items-center gap-1 text-violet-300">
                                {getStatusIcon(candidateWrapper.status)}
                                <span className="text-xs">
                                  {formatStatusText(candidateWrapper.status)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Final Interview Feedback */}
                          {feedback && activeTab === "final_completed" && (
                            <FinalInterviewFeedback feedback={feedback} />
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
        />
      )}

      <PaymentProceedModal
        isOpen={isConfirmationModalOpen}
        onClosed={() => setIsConfirmationModalOpen(false)}
        onProceed={handleModalConfirmation}
        candidatesCount={candidates?.length}
        paymentLoading={initPaymentLoading}
      />
    </div>
  );
}

export default JobManagementPage;
