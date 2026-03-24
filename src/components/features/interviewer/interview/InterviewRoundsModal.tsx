import React from "react";
import {
  X,
  Star,
  Calendar,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { IInterviewRound } from "@/types/ICandidate";

interface InterviewRoundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rounds: IInterviewRound[];
  candidateName: string;
}

const InterviewRoundsModal: React.FC<InterviewRoundsModalProps> = ({
  isOpen,
  onClose,
  rounds,
  candidateName,
}) => {
  if (!isOpen) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-amber-400" />;
      case "needs-followup":
        return <AlertCircle className="w-4 h-4 text-orange-400" />;
      case "scheduled":
        return <Calendar className="w-4 h-4 text-blue-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "in-progress":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "needs-followup":
        return "bg-orange-500/20 text-orange-300 border-orange-500/40";
      case "scheduled":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/40";
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "hire":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "no-hire":
        return "bg-red-500/20 text-red-300 border-red-500/40";
      case "maybe":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "next-round":
        return "bg-violet-500/20 text-violet-300 border-violet-500/40";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/40";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 rounded-2xl border border-violet-800 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-violet-800/50 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Interview Journey</h2>
            <p className="text-violet-400 mt-1">{candidateName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-violet-600/20 rounded-xl transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {rounds.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No interview rounds yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {rounds.map((round, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/50 rounded-xl border border-violet-800/30 p-6 hover:border-violet-700/50 transition-all duration-200"
                >
                  {/* Round Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-violet-600/20 border border-violet-500/40 rounded-lg">
                        <span className="text-sm font-bold text-violet-300">
                          {round.roundNumber}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white capitalize">
                          {round.type} Interview
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(round.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          round.status
                        )}`}
                      >
                        {round.status
                          .replace("-", " ")
                          .replace("_", " ")
                          .toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {round.status === "no_show" && round.type === "final" && (
                    <div className="mb-4 p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-400 text-sm leading-relaxed">
                        This candidate has been{" "}
                        <span className="font-medium text-red-300">
                          disqualified
                        </span>{" "}
                        as they did not attend the final interview.
                      </p>
                    </div>
                  )}
                  {round.status === "no_show" && round.type === "followup" && (
                    <div className="mb-4 p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                      <p className="text-blue-400 text-sm leading-relaxed flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-[2px] flex-shrink-0 text-blue-400" />
                        <span>
                          The follow-up interview was{" "}
                          <span className="font-medium text-blue-300">
                            not conducted
                          </span>{" "}
                          due to interviewer unavailability.{" "}
                          <span className="font-medium text-blue-300">
                            The company is required to reschedule
                          </span>{" "}
                          this interview for the candidate at a suitable time.
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Interviewer Info */}
                  {round.interviewer &&
                    typeof round.interviewer === "object" && (
                      <div className="flex items-center gap-2 mb-4 text-sm text-violet-400">
                        <User className="w-4 h-4" />
                        <span>
                          Interviewer: {round.interviewer.name || "TBD"}
                        </span>
                      </div>
                    )}

                  {/* Feedback Section */}
                  {round.feedback && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {round.feedback.technicalScore && (
                          <div className="text-center p-3 bg-violet-900/20 rounded-lg border border-violet-500/20">
                            <div className="text-lg font-bold text-white">
                              {round.feedback.technicalScore}/10
                            </div>
                            <div className="text-xs text-violet-400">
                              Technical
                            </div>
                          </div>
                        )}
                        {round.feedback.communicationScore && (
                          <div className="text-center p-3 bg-violet-900/20 rounded-lg border border-violet-500/20">
                            <div className="text-lg font-bold text-white">
                              {round.feedback.communicationScore}/10
                            </div>
                            <div className="text-xs text-violet-400">
                              Communication
                            </div>
                          </div>
                        )}
                        {round.feedback.problemSolvingScore && (
                          <div className="text-center p-3 bg-violet-900/20 rounded-lg border border-violet-500/20">
                            <div className="text-lg font-bold text-white">
                              {round.feedback.problemSolvingScore}/10
                            </div>
                            <div className="text-xs text-violet-400">
                              Problem Solving
                            </div>
                          </div>
                        )}
                        {round.feedback.overallScore && (
                          <div className="text-center p-3 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-lg border border-violet-500/30">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <div className="text-lg font-bold text-white">
                                {round.feedback.overallScore}/10
                              </div>
                            </div>
                            <div className="text-xs text-violet-400">
                              Overall
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Recommendation */}
                      {round.feedback.recommendation && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-violet-400">
                            Recommendation:
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(
                              round.feedback.recommendation
                            )}`}
                          >
                            {round.feedback.recommendation
                              .replace("-", " ")
                              .toUpperCase()}
                          </span>
                        </div>
                      )}

                      {/* Comments */}
                      {round.feedback.comments && (
                        <div className="bg-zinc-800/30 rounded-lg p-4 border border-violet-800/20">
                          <h4 className="text-sm font-medium text-violet-400 mb-2">
                            Interviewer Comments:
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {round.feedback.comments}
                          </p>
                        </div>
                      )}

                      {/* Strengths and Areas for Improvement */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {round.feedback.strengths && (
                          <div className="bg-emerald-900/10 rounded-lg p-4 border border-emerald-500/20">
                            <h4 className="text-sm font-medium text-emerald-400 mb-2">
                              Strengths:
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {round.feedback.strengths}
                            </p>
                          </div>
                        )}
                        {round.feedback.areasForImprovement && (
                          <div className="bg-amber-900/10 rounded-lg p-4 border border-amber-500/20">
                            <h4 className="text-sm font-medium text-amber-400 mb-2">
                              Areas for Improvement:
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {round.feedback.areasForImprovement}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* No Feedback State */}
                  {!round.feedback && round.status === "completed" && (
                    <div className="mt-4 p-4 bg-amber-900/10 border border-amber-500/20 rounded-lg">
                      <p className="text-amber-400 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Interview completed but feedback is pending
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewRoundsModal;
