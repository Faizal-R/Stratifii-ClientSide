import React, { useState, useMemo } from "react";
import {
  X,
  Star,
  MessageSquare,
  Target,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import { IInterviewFeedback } from "@/types/IInterview";

interface InterviewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (feedback: IInterviewFeedback) => void;
  candidateName?: string;
}

// Enhanced Score Input Component (1-10 scale)
import EnhancedScoreInput from "../FormFields/ScoreInput";



// Compact Tag Input Component
import { TagInput } from "../FormFields/InputField";

const InterviewFeedbackModal: React.FC<InterviewFeedbackModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  candidateName = "Candidate",
}) => {
  const [feedback, setFeedback] = useState<IInterviewFeedback>({
    needsFollowUp: false,
    suggestedFocusAreas: [],
  });

  // Calculate overall score automatically (1-10 scale)
  const overallScore = useMemo(() => {
    const scores = [
      feedback.technicalScore,
      feedback.communicationScore,
      feedback.problemSolvingScore,
      feedback.culturalFitScore,
    ].filter((score) => score !== undefined) as number[];

    if (scores.length === 0) return undefined;
    return (
      Math.round(
        (scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10
      ) / 10
    );
  }, [
    feedback.technicalScore,
    feedback.communicationScore,
    feedback.problemSolvingScore,
    feedback.culturalFitScore,
  ]);

  const updateScore = (field: keyof IInterviewFeedback, value: number) => {
    setFeedback((prev) => ({ ...prev, [field]: value }));
  };

  const updateText = (field: keyof IInterviewFeedback, value: string) => {
    setFeedback((prev) => ({ ...prev, [field]: value }));
  };

  const updateBoolean = (field: keyof IInterviewFeedback, value: boolean) => {
    setFeedback((prev) => ({ ...prev, [field]: value }));
  };

  const updateTags = (field: keyof IInterviewFeedback, value: string[]) => {
    setFeedback((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Todo:Add validation here 

    onConfirm({ ...feedback, overallScore });
    setFeedback({
      needsFollowUp: false,
      suggestedFocusAreas: [],
    });
    onClose();
  };

  const handleClose = () => {
    setFeedback({
      needsFollowUp: false,
      suggestedFocusAreas: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-black via-gray-900 to-violet-950 border border-violet-900/40 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Premium Header */}
        <div className="relative p-6 border-b border-violet-900/30 bg-gradient-to-r from-violet-950/30 to-purple-950/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Interview Feedback
              </h2>
              <p className="text-violet-300 text-sm font-medium">
                {candidateName}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2.5 hover:bg-violet-900/40 rounded-full transition-all duration-200 group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-purple-600/5 rounded-t-2xl pointer-events-none" />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Enhanced Scoring Grid (1-10 scale) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-violet-400" />
              <h3 className="text-white font-semibold">
                Performance Evaluation
              </h3>
              <span className="text-xs text-gray-400 ml-auto">Scale: 1-10</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EnhancedScoreInput
                label="Technical Skills"
                icon={<Target className="w-4 h-4 text-violet-400" />}
                value={feedback.technicalScore}
                onChange={(value) => updateScore("technicalScore", value)}
              />

              <EnhancedScoreInput
                label="Communication"
                icon={<MessageSquare className="w-4 h-4 text-violet-400" />}
                value={feedback.communicationScore}
                onChange={(value) => updateScore("communicationScore", value)}
              />

              <EnhancedScoreInput
                label="Problem Solving"
                icon={<Star className="w-4 h-4 text-violet-400" />}
                value={feedback.problemSolvingScore}
                onChange={(value) => updateScore("problemSolvingScore", value)}
              />

              <EnhancedScoreInput
                label="Cultural Fit"
                icon={<Users className="w-4 h-4 text-violet-400" />}
                value={feedback.culturalFitScore}
                onChange={(value) => updateScore("culturalFitScore", value)}
              />
            </div>
          </div>

          {/* Auto-calculated Overall Score Display */}
          {overallScore && (
            <div className="relative p-4 bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-500/40 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-600/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-violet-400" />
                  </div>
                  <span className="text-white font-semibold">
                    Overall Score
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    {overallScore}
                  </span>
                  <span className="text-gray-400 font-medium">/10</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 pointer-events-none" />
            </div>
          )}

          {/* Enhanced Recommendation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-violet-400" />
              <h3 className="text-white font-semibold">Recommendation</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { value: "hire", label: "Hire", color: "green", emoji: "✓" },
                { value: "maybe", label: "Maybe", color: "yellow", emoji: "?" },
                {
                  value: "no-hire",
                  label: "No Hire",
                  color: "red",
                  emoji: "✗",
                },
                {
                  value: "next-round",
                  label: "Suggest Next Round",
                  color: "blue",
                  emoji: "→",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    if (feedback.recommendation === option.value) {
                      // If already selected, unselect it
                      updateText("recommendation", "");
                      if (option.value === "next-round") {
                        updateBoolean("needsFollowUp", false);
                      }
                    } else {
                      // Otherwise select it
                      updateText("recommendation", option.value as any);
                      if (option.value === "next-round") {
                        updateBoolean("needsFollowUp", true);
                      }
                    }
                  }}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium relative overflow-hidden group ${
                    feedback.recommendation === option.value
                      ? option.color === "green"
                        ? "bg-green-500/20 border-green-500 text-green-400 shadow-lg shadow-green-500/20"
                        : option.color === "yellow"
                        ? "bg-yellow-500/20 border-yellow-500 text-yellow-400 shadow-lg shadow-yellow-500/20"
                        : option.color === "red"
                        ? "bg-red-500/20 border-red-500 text-red-400 shadow-lg shadow-red-500/20"
                        : "bg-blue-500/20 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/20"
                      : "border-gray-600 text-gray-400 hover:border-violet-500 hover:text-violet-400 hover:shadow-lg hover:shadow-violet-500/10"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-lg">{option.emoji}</span>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Feedback Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-violet-400" />
              <h3 className="text-white font-semibold">Candidate Feedback</h3>
              <span className="text-xs text-gray-400 ml-auto">
                Shared with candidate
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white font-medium text-sm">
                  Strengths
                </label>
                <textarea
                  value={feedback.strengths || ""}
                  onChange={(e) => updateText("strengths", e.target.value)}
                  placeholder="What did the candidate excel at?"
                  className="w-full p-3 bg-black/50 border border-violet-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none h-24 text-sm transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium text-sm">
                  Areas for Growth
                </label>
                <textarea
                  value={feedback.areasForImprovement || ""}
                  onChange={(e) =>
                    updateText("areasForImprovement", e.target.value)
                  }
                  placeholder="Constructive improvement suggestions..."
                  className="w-full p-3 bg-black/50 border border-violet-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none h-24 text-sm transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium text-sm">
                Additional Comments
              </label>
              <textarea
                value={feedback.comments || ""}
                onChange={(e) => updateText("comments", e.target.value)}
                placeholder="Any additional observations for the candidate..."
                className="w-full p-3 bg-black/50 border border-violet-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none h-20 text-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Internal Notes Section */}
          <div className="space-y-4 p-4 bg-gradient-to-r from-gray-900/50 to-slate-900/50 border border-gray-700/50 rounded-xl">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400 drop-shadow-sm filter drop-shadow-[0_0_6px_rgba(251,191,36,0.3)]" />
              <h3 className="text-white font-semibold">Internal Notes</h3>
              <span className="text-xs text-amber-400/80 ml-auto font-medium">
                Company Only
              </span>
            </div>

            <div className="space-y-2">
              <textarea
                value={feedback.internalNotes || ""}
                onChange={(e) => updateText("internalNotes", e.target.value)}
                placeholder="Internal observations, concerns, or notes for the hiring team..."
                className="w-full p-3 bg-black/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none h-20 text-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Follow-up Interview Recommendation Section */}
          {feedback.needsFollowUp && (
            <div className="pt-4 border-t border-violet-900/30">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-violet-400 drop-shadow-sm filter drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
                  <h3 className="text-white font-semibold">
                    Follow-up Interview
                  </h3>
                </div>

                {feedback.needsFollowUp && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <label className="text-white font-medium text-sm">
                      Suggested Focus Areas
                    </label>
                    <TagInput
                      tags={feedback.suggestedFocusAreas || []}
                      onChange={(tags) =>
                        updateTags("suggestedFocusAreas", tags)
                      }
                      placeholder="e.g., System Design, Advanced Node.js, Data Structures"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Actions */}
          <div className="flex gap-3 pt-6 border-t border-violet-900/30">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-6 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 hover:border-gray-500 transition-all duration-200 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-violet-500/30 text-sm hover:scale-[1.02]"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewFeedbackModal;
