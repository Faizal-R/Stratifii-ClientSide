"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { DelegatedJob } from "@/types/IJob";
import JobCard from "@/components/features/candidate/JobCard";
import GuidanceModal from "@/components/features/candidate/RulesAndGuidanceModal";
import {
  getStatusColor,
  getStatusIcon,
  formatStatus,
} from "@/utils/interviewUtils";
import {
  useGenerateMockInterviewQuestions,
  useGetDelegatedJobs,
} from "@/hooks/useCandidate";
import { useRouter } from "next/navigation";
import MockInterview from "@/components/features/candidate/MockInterview";
import { IQuestion } from "@/types/IInterview";
import { useSubmitMockResultAndUpdateQualificationStatus } from "@/hooks/useInterview";
;

const CandidateInterviewsPage = () => {
  const [isMockInitiated, setIsMockInitiated] = useState(false);
  const [activeTab, setActiveTab] = useState<"mock" | "upcoming">("mock");
  const [delegatedJobs, setDelegatedJobs] = useState<DelegatedJob[]>([]);
  const [showGuidanceModal, setShowGuidanceModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<DelegatedJob | null>(null);
  const { getDelegatedJobs, loading } = useGetDelegatedJobs();
  const { generateMockInterviewQuestions, loading: mockQuestionsLoding } =
    useGenerateMockInterviewQuestions();
    const {submitMockResult}=useSubmitMockResultAndUpdateQualificationStatus()
  const [mockQuestions, setMockQuestions] = useState<IQuestion[]>([]);
  const router = useRouter();

  const fetchDelegatedJobs = async () => {
    const response = await getDelegatedJobs();
    console.log(response.data);
    setDelegatedJobs(response.data || []);
  };

  useEffect(() => {
    fetchDelegatedJobs();
   
  }, []);

  const mockInterviews = delegatedJobs.filter((job) =>
    ["mock_pending", "mock_started", "mock_completed","mock_failed"].includes(job.mockStatus)
  );

  const upcomingInterviews = delegatedJobs.filter((job) =>
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

   

  return isMockInitiated ? (
    <div className="ml-64">
      <MockInterview
        onBackToDashboard={() => router.push("/candidate")}
        questions={mockQuestions}
        delegationId={selectedJob?.delegatedCandidateId!}
        submitMockResultAndUpdateStatus={submitMockResult}
      />
    </div>
  ) : (
    <div className="ml-64 p-8 min-h-screen bg-gradient-to-br from-black via-black to-violet-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Interviews</h1>
          <p className="text-gray-300">
            Manage your mock interviews and upcoming final rounds
          </p>
        </div>

        {/* Tab Navigation */}
        <div className=" space-x-1 mb-8 bg-white/10 backdrop-blur-sm p-1 rounded-lg inline-flex border border-white/20">
          <button
            onClick={() => setActiveTab("mock")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "mock"
                ? "bg-white/20 text-white shadow-sm backdrop-blur-sm border border-white/30"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Mock Interviews
            <span className="ml-2 bg-violet-500/30 text-violet-200 px-2 py-1 rounded-full text-xs border border-violet-400/30">
              {mockInterviews.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === "upcoming"
                ? "bg-white/20 text-white shadow-sm backdrop-blur-sm border border-white/30"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Upcoming Interviews
            <span className="ml-2 bg-emerald-500/30 text-emerald-200 px-2 py-1 rounded-full text-xs border border-emerald-400/30">
              {upcomingInterviews.length}
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="grid gap-6">
          {activeTab === "mock" && (
            <div className="space-y-6">
              {mockInterviews.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No mock interviews available</p>
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
              {upcomingInterviews.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No upcoming interviews scheduled
                  </p>
                </div>
              ) : (
                upcomingInterviews.map((job) => (
                  <JobCard
                    key={job.jobId}
                    job={job}
                    onStartMock={handleStartMock}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    formatStatus={formatStatus}
                    
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* Guidance Modal */}
        {showGuidanceModal && (
          <GuidanceModal
            // job={selectedJob}
            onClose={() => setShowGuidanceModal(false)}
            // onProceed={handleProceedToMock}
            onAccept={handleProceedToMock}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateInterviewsPage;
