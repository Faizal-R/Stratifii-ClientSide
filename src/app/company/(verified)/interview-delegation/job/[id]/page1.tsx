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
  Search,
  Filter,
  ChevronDown,
  Star,
  TrendingUp,
  UserPlus,
  Eye,
  AlertTriangle,
  ArrowRight,
  Calendar,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { IDelegatedCandidate, ICandidateProfile, IInterviewRound } from "@/types/ICandidate";
import InterviewRoundsModal from "../../../../../../components/features/interviewer/interview/InterviewRoundsModal";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";

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
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [isRoundsModalOpen, setIsRoundsModalOpen] = useState(false);
  const [selectedCandidateForRounds, setSelectedCandidateForRounds] = useState<IDelegatedCandidate | null>(null);
  const [selectedInterviewer, setSelectedInterviewer] = useState<any>(null);
  const [currentCandidate, setCurrentCandidate] = useState<IDelegatedCandidate | null>(null);
  const [isInterviewProcessInitiated, setIsInterviewProcessInitiated] = useState(true); // Set to true for demo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Demo data
  const [candidates, setCandidates] = useState<IDelegatedCandidate[]>([
    {
      _id: "1",
      candidate: {
        _id: "c1",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
        resume: "https://example.com/resume1.pdf",
        status: "active"
      },
      company:"",
      job: "",
      status: "in_interview_process",
      interviewRounds: [
        {
          roundNumber: 1,
          type: "final",
          status: "completed",
          interviewer: { name: "John Smith", _id: "int1" } as IInterviewerProfile,
        
          feedback: {
            technicalScore: 8,
            communicationScore: 9,
            problemSolvingScore: 7,
            overallScore: 8,
            recommendation: "next-round",
            needsFollowUp: true,
            strengths: "Strong in React and TypeScript, excellent problem-solving approach",
            areasForImprovement: "Could improve on algorithm optimization",
            comments: "Very promising candidate, shows great potential for the role."
          }
        },
        {
          roundNumber: 2,
          type: "final",
          status: "completed",
          interviewer: { name: "Jane Doe", _id: "int2" } as IInterviewerProfile,
         
          feedback: {
            communicationScore: 9,
            culturalFitScore: 8,
            overallScore: 8,
            recommendation: "hire",
            needsFollowUp: false,
            strengths: "Excellent communication skills, great team fit",
            comments: "Ready for final decision, highly recommended."
          }
        }
      ],
      totalNumberOfRounds: 3,
      currentRound: 2,
      isInterviewScheduled: true,
    //   interviewProgress: {
    //     totalRounds: 3,
    //     completedRounds: 2,
    //     pendingRounds: 1
    //   }
    },
       {
      _id: "2",
      candidate: {
        _id: "c2",
        name: "Alex Chen",
        email: "alex.chen@email.com",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
        resume: "https://example.com/resume2.pdf",
        status: "active"
      },
      company: '',
      job: '',
      status: "in_interview_process",
      interviewRounds: [
        {
          roundNumber: 1,
          type: "followup",
          status: "completed",
          interviewer: { name: "John Smith", _id: "int1" } as IInterviewerProfile,
          feedback: {
            technicalScore: 6,
            communicationScore: 7,
            problemSolvingScore: 6,
            overallScore: 6,
            recommendation: "next-round",
            needsFollowUp: true,
            strengths: "Good foundational knowledge",
            areasForImprovement: "Needs to work on advanced concepts",
            comments: "Decent candidate, worth one more round to assess growth potential."
          }
        }
      ],
      totalNumberOfRounds: 2,
      currentRound: 1,
      isInterviewScheduled: true,
      interviewProgress: {
        totalRounds: 2,
        completedRounds: 1,
        pendingRounds: 1
      }
    },
    {
      _id: "3",
      candidate: {
        _id: "c3",
        name: "Maria Rodriguez",
        email: "maria.rodriguez@email.com",
        avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
        resume: "https://example.com/resume3.pdf",
        status: "active"
      },
      company: '',
      job: '',
      status: "shortlisted",
      interviewRounds: [
        {
          roundNumber: 1,
          type: "final",
          status: "completed",
          interviewer: { name: "John Smith", _id: "int1" } as IInterviewerProfile,
        //   isRoundComplete: true,
          feedback: {
            technicalScore: 9,
            communicationScore: 9,
            problemSolvingScore: 9,
            overallScore: 9,
            recommendation: "hire",
            needsFollowUp: false,
            strengths: "Exceptional skills across all areas",
            comments: "Outstanding candidate, immediate hire recommendation."
          }
        }
      ],
      totalNumberOfRounds: 1,
      currentRound: 1,
      isInterviewScheduled: true,
    //   interviewProgress: {
    //     totalRounds: 1,
    //     completedRounds: 1,
    //     pendingRounds: 0
    //   }
    }
  ]);

  // Helper function to determine next action based on latest completed round
  const getNextAction = (candidate: IDelegatedCandidate) => {
    const completedRounds = candidate.interviewRounds.filter(r => r.status === 'completed' && r.feedback);
    
    if (completedRounds.length === 0) {
      return { type: 'none', reason: 'No completed rounds with feedback' };
    }

    const latestCompletedRound = completedRounds[completedRounds.length - 1];
    const feedback = latestCompletedRound.feedback;

    if (!feedback) {
      return { type: 'none', reason: 'No feedback available' };
    }

    // Check if all planned rounds are completed
    const allRoundsCompleted = candidate.interviewRounds.length >= candidate.totalNumberOfRounds!;
    
    if (feedback.recommendation === 'hire') {
      return { type: 'complete', reason: 'Recommendation: Hire' };
    } else if (feedback.recommendation === 'no-hire') {
      return { type: 'complete', reason: 'Recommendation: No Hire' };
    } else if (feedback.needsFollowUp === true || feedback.recommendation === 'next-round') {
      if (allRoundsCompleted) {
        return { type: 'complete', reason: 'All rounds completed' };
      }
      return { type: 'next-round', reason: 'Follow-up needed' };
    } else if (allRoundsCompleted) {
      return { type: 'complete', reason: 'All rounds completed' };
    }

    return { type: 'next-round', reason: 'Continue interview process' };
  };

  const handleViewRounds = (candidate: IDelegatedCandidate) => {
    setSelectedCandidateForRounds(candidate);
    setIsRoundsModalOpen(true);
  };

  const handleNextRound = async (candidate: IDelegatedCandidate) => {
    toast.success("Scheduling next round for " + (candidate.candidate as ICandidateProfile).name);
    // Your existing next round logic here
  };

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
      toast.success("Candidate marked as completed!");
    } catch (error) {
      toast.error("Failed to complete candidate");
    }
  };

  // Get filtered candidates based on search and tab
  const getFilteredCandidates = (tabId: TabType): IDelegatedCandidate[] => {
    let filtered = candidates;

    // Filter by tab
    switch (tabId) {
      case "all":
        filtered = candidates;
        break;
      case "in-progress":
        filtered = candidates.filter((c) =>
          ["in_interview_process", "mock_started", "scheduled"].includes(c.status)
        );
        break;
      case "completed":
        filtered = candidates.filter((c) =>
          ["shortlisted", "hired", "rejected"].includes(c.status)
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'in_interview_process': { bg: 'bg-violet-500/20', text: 'text-violet-300', border: 'border-violet-500/40', label: 'In Progress' },
      'interview_completed': { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/40', label: 'Completed' },
      'shortlisted': { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40', label: 'Shortlisted' },
      'hired': { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-500/40', label: 'Hired' },
      'rejected': { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-500/40', label: 'Rejected' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.in_interview_process;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        {config.label}
      </span>
    );
  };

  const getLatestCompletedRound = (interviewRounds: IInterviewRound[]) => {
    const completedRounds = interviewRounds.filter(r => r.status === 'completed' && r.feedback);
    return completedRounds.length > 0 ? completedRounds[completedRounds.length - 1] : null;
  };

  const getInterviewProgress = (candidate: IDelegatedCandidate) => {
    const completed = candidate.interviewRounds.filter(r => r.status === 'completed').length;
    const total = candidate.totalNumberOfRounds;
    const percentage = total! > 0 ? (completed / total!) * 100 : 0;
    
    return { completed, total, percentage };
  };

  // Calculate counts for tabs
  const allCount = candidates.length;
  const inProgressCount = candidates.filter((c) =>
    ["in_interview_process", "mock_started", "scheduled"].includes(c.status)
  ).length;
  const completedCount = candidates.filter((c) =>
    ["shortlisted", "hired", "rejected"].includes(c.status)
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

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-black via-black to-violet-950">
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-400"></div>
        <span className="text-violet-300">Loading candidates...</span>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-violet-950">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-violet-600/20 blur-3xl rounded-full" />

        <div className="relative backdrop-blur-xl">
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

              {candidates.length > 0 && (
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {candidates.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] bg-zinc-900/50 rounded-2xl border border-violet-800/30 backdrop-blur-xl">
            <div className="text-center">
              <Users className="h-20 w-20 text-violet-300/50 mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-white mb-3">
                No Candidates Available
              </h2>
              <p className="text-violet-200/70 text-lg max-w-md mx-auto mb-8">
                Start by uploading candidate resumes to begin the interview
                process. Candidates will be organized by their interview status.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Upload className="mr-3 h-6 w-6" />
                Upload First Resume
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-violet-800/50 p-1 shadow-2xl mb-6">
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
                      <Icon className={`h-5 w-5 ${isActive ? tab.color : "text-gray-500"}`} />
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

            {/* Search and Filter Section */}
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-violet-800/50 p-6 shadow-xl mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-violet-400/70" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search candidates by name or email..."
                    className="block w-full pl-10 pr-3 py-3 bg-zinc-800/50 border border-violet-700/50 rounded-xl text-white placeholder-violet-400/70 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>

                {/* Job Filter Dropdown */}
                <div className="relative">
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="appearance-none bg-zinc-800/50 border border-violet-700/50 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 backdrop-blur-sm"
                  >
                    <option value="all">All Jobs</option>
                    <option value="frontend">Frontend Developer</option>
                    <option value="backend">Backend Developer</option>
                    <option value="fullstack">Full Stack Developer</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-violet-400" />
                  </div>
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCandidates.map((candidateWrapper: IDelegatedCandidate) => {
                  const profile = candidateWrapper.candidate as ICandidateProfile;
                  const latestCompletedRound = getLatestCompletedRound(candidateWrapper.interviewRounds);
                  const nextAction = getNextAction(candidateWrapper);
                  const progress = getInterviewProgress(candidateWrapper);

                  return (
                    <div
                      key={profile._id}
                      className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-violet-800/50 shadow-2xl hover:shadow-violet-700/30 transition-all duration-500 overflow-hidden group hover:scale-[1.02] hover:border-violet-600/70"
                    >
                      {/* Header with Avatar and Status */}
                      <div className="p-6 pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img
                                src={profile.avatar || "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"}
                                alt={profile.name}
                                className="h-16 w-16 rounded-full object-cover border-2 border-violet-500/50 group-hover:border-violet-400 transition-all duration-300"
                              />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-zinc-900 rounded-full"></div>
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
                          {getStatusBadge(candidateWrapper.status)}
                        </div>

                        {/* Interview Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-violet-400">
                              Interview Progress
                            </span>
                            <span className="text-xs text-violet-300">
                              {progress.completed}/{progress.total} rounds
                            </span>
                          </div>
                          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${progress.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-6 pb-6 space-y-4">
                        {/* Latest Round Summary */}
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
                              {latestCompletedRound.feedback?.overallScore && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span className="text-sm font-bold text-white">
                                    {latestCompletedRound.feedback.overallScore}/10
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            {latestCompletedRound.feedback?.recommendation && (
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-violet-400">Recommendation:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                                  latestCompletedRound.feedback.recommendation === 'hire' 
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : latestCompletedRound.feedback.recommendation === 'no-hire'
                                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                                    : latestCompletedRound.feedback.recommendation === 'next-round'
                                    ? 'bg-violet-500/20 text-violet-300 border-violet-500/40'
                                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                }`}>
                                  {latestCompletedRound.feedback.recommendation.replace('-', ' ').toUpperCase()}
                                </span>
                              </div>
                            )}

                            {latestCompletedRound.feedback?.needsFollowUp && (
                              <div className="flex items-center gap-2 text-amber-400 text-xs">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Follow-up recommended</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Resume and Actions */}
                        <div className="flex items-center justify-between pt-2">
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

                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-violet-800/30">
                          <div className="flex items-center justify-between mb-4">
                            <button
                              onClick={() => handleViewRounds(candidateWrapper)}
                              className="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 border border-violet-700/30 hover:border-violet-600/50 rounded-lg text-violet-300 hover:text-violet-200 transition-all duration-200 text-sm"
                            >
                              <Eye className="w-4 h-4" />
                              View Rounds
                              <span className="px-1.5 py-0.5 bg-violet-600/30 rounded text-xs">
                                {candidateWrapper.interviewRounds.length}
                              </span>
                            </button>
                          </div>

                          {/* Smart Action Buttons */}
                          {candidateWrapper.status === "in_interview_process" && (
                            <div className="flex flex-col gap-2">
                              {nextAction.type === 'next-round' && (
                                <button
                                  onClick={() => handleNextRound(candidateWrapper)}
                                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-violet-500/25 transform hover:scale-105"
                                >
                                  <UserPlus className="h-4 w-4" />
                                  Schedule Next Round
                                  <ArrowRight className="h-3 w-3 opacity-70" />
                                </button>
                              )}

                              {nextAction.type === 'complete' && (
                                <button
                                  onClick={() => handleCompleteCandidate(candidateWrapper._id!)}
                                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  Complete Process
                                </button>
                              )}

                              <div className="text-xs text-violet-400/70 text-center mt-1">
                                {nextAction.reason}
                              </div>
                            </div>
                          )}

                          {candidateWrapper.status === "shortlisted" && (
                            <div className="text-center py-3">
                              <div className="flex items-center justify-center gap-2 text-emerald-400">
                                <Trophy className="w-4 h-4" />
                                <span className="text-sm font-medium">Ready for Final Decision</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Interview Rounds Modal */}
      {isRoundsModalOpen && selectedCandidateForRounds && (
        <InterviewRoundsModal
          isOpen={isRoundsModalOpen}
          onClose={() => {
            setIsRoundsModalOpen(false);
            setSelectedCandidateForRounds(null);
          }}
          rounds={selectedCandidateForRounds.interviewRounds}
          candidateName={(selectedCandidateForRounds.candidate as ICandidateProfile).name}
        />
      )}
    </div>
  );
}

export default JobManagementPage;