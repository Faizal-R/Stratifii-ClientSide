import React, { useEffect } from "react";
import {
  User,
  Mail,
  CheckCircle,
  Circle,
  Award,
  Clock,
  FileText,
  AlertCircle,
  CalendarCheck,
  Target,
  Star,
} from "lucide-react";
import { useGetMockQualifiedCandidates } from "@/hooks/api/useJob";

const CandidateList: React.FC<any> = ({
  selectedJob,
  selectedCandidate,
  onCandidateSelect,
}) => {
  const [mockQualifiedCandidates, setMockQualifiedCandidates] = React.useState(
    []
  );

  const { mockQualifiedCandidatesByJob } = useGetMockQualifiedCandidates();
  
  const getScoreColor = (score?: number) => {
    if (!score) return "text-gray-400 bg-gray-800/50";
    if (score >= 90) return "text-emerald-400 bg-emerald-900/30 border-emerald-500/30";
    if (score >= 80) return "text-blue-400 bg-blue-900/30 border-blue-500/30";
    if (score >= 70) return "text-amber-400 bg-amber-900/30 border-amber-500/30";
    return "text-red-400 bg-red-900/30 border-red-500/30";
  };



  useEffect(() => {
    if (!selectedJob) return;

    const getMockQualifiedCandidates = async () => {
      const res = await mockQualifiedCandidatesByJob(selectedJob._id!);
      if (res.success) {
        setMockQualifiedCandidates(res.data);
      }
    };

    getMockQualifiedCandidates();
  }, []);

  return (
    <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50">
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Candidate Pipeline
              {selectedJob && (
                <span className="text-gray-300 font-normal ml-2">
                  for {selectedJob.title}
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              AI-qualified candidates ready for final interviews
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-violet-500/20 text-violet-300 px-3 py-1.5 rounded-full text-sm font-medium border border-violet-500/30">
              {mockQualifiedCandidates.length} total
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-sm font-medium border border-emerald-500/30">
              {mockQualifiedCandidates.filter((dc: any) => dc.isQualifiedForFinal).length} qualified
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3 max-h-[500px] overflow-y-auto">
        {mockQualifiedCandidates.length === 0 ? (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No candidates found
            </h3>
            <p className="text-gray-400">
              {selectedJob
                ? "No candidates have been delegated for this job yet"
                : "Select a job to view candidates"}
            </p>
          </div>
        ) : (
          mockQualifiedCandidates.map((mockQualifiedCandidate: any) => (
            <div
              key={mockQualifiedCandidate._id}
              className={`group relative p-4 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                selectedCandidate?._id === mockQualifiedCandidate._id
                  ? "border-violet-500/50 bg-gradient-to-r from-violet-900/30 to-purple-900/30 shadow-lg shadow-violet-500/20"
                  : "border-gray-700/50 bg-gray-800/30 hover:border-gray-600/50 hover:bg-gray-800/50 hover:shadow-lg"
              }`}
              onClick={() => onCandidateSelect(mockQualifiedCandidate)}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center space-x-4">
                {/* Avatar with qualification badge */}
                <div className="relative flex-shrink-0">
                  <img
                    src={
                      mockQualifiedCandidate.candidate.avatar ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockQualifiedCandidate.candidate.name}`
                    }
                    alt={mockQualifiedCandidate.candidate.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600/50 shadow-lg"
                  />
                  {mockQualifiedCandidate.isQualifiedForFinal && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-base truncate">
                        {mockQualifiedCandidate.candidate.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400 truncate">
                          {mockQualifiedCandidate.candidate.email}
                        </span>
                      </div>
                    </div>

                    {/* Score and actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {mockQualifiedCandidate.aiMockResult && (
                        <div className={`px-2 py-1 rounded-lg text-xs font-medium border ${getScoreColor(mockQualifiedCandidate.aiMockResult.scoreInPercentage)}`}>
                          <Award className="h-3 w-3 inline mr-1" />
                          {mockQualifiedCandidate.aiMockResult.scoreInPercentage}%
                        </div>
                      )}
                      
                      {mockQualifiedCandidate.candidate.resume && (
                        <a
                          href={mockQualifiedCandidate.candidate.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="View Resume"
                        >
                          <FileText className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Interview results - compact */}
                  {mockQualifiedCandidate.aiMockResult && (
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mb-2">
                      <span>
                        <span className="text-white font-medium">{mockQualifiedCandidate.aiMockResult.correctAnswers}</span>
                        /{mockQualifiedCandidate.aiMockResult.totalQuestions} correct
                      </span>
                      <span className={`font-medium ${mockQualifiedCandidate.aiMockResult.scoreInPercentage >= 70 ? "text-emerald-400" : "text-red-400"}`}>
                        {mockQualifiedCandidate.aiMockResult.scoreInPercentage}% score
                      </span>
                    </div>
                  )}

                  {/* Status and scheduling */}
                  <div className="flex items-center justify-between">
                    {mockQualifiedCandidate.isInterviewScheduled ? (
                      <div className="flex items-center text-emerald-400 text-xs">
                        <CalendarCheck className="h-3 w-3 mr-1" />
                        <span>Scheduled</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-blue-400 text-xs">
                        <Circle className="h-3 w-3 mr-1" />
                        <span>Ready for scheduling</span>
                      </div>
                    )}

                    {mockQualifiedCandidate.isQualifiedForFinal && !mockQualifiedCandidate.isInterviewScheduled && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCandidateSelect(mockQualifiedCandidate);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedCandidate?._id === mockQualifiedCandidate._id
                            ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                            : "bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 border border-violet-500/30"
                        }`}
                      >
                        {selectedCandidate?._id === mockQualifiedCandidate._id ? "Selected" : "Select"}
                      </button>
                    )}
                  </div>

                  {/* Feedback - compact */}
                  {mockQualifiedCandidate.feedback && (
                    <div className="mt-2 p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <p className="text-xs text-gray-300 line-clamp-2">
                        {mockQualifiedCandidate.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidateList;