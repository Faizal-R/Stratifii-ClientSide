import { useState } from "react";
import { MessageSquare } from "lucide-react";

interface FeedbackProps {
  feedback: {
    technicalScore: number;
    communicationScore: number;
    problemSolvingScore: number;
    culturalFitScore: number;
    overallScore: number;
    strengths: string;
    areasForImprovement: string;
    comments: string;
    recommendation: "hire" | "no-hire" | "maybe";
  };
}

export default function FinalInterviewFeedback({ feedback }: FeedbackProps|any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-4 border-t border-violet-800/30">
      {/* See Feedback Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300"
      >
        <MessageSquare className="h-4 w-4 text-violet-300" />
        See Final Interview Feedback
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal content */}
          <div className="relative bg-zinc-900 border border-violet-800 rounded-xl shadow-lg w-full max-w-lg mx-4 p-6 z-10 text-violet-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                Final Interview Feedback
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-violet-400 hover:text-violet-200 transition"
              >
                ✕
              </button>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-3 text-xs text-violet-300">
              <div className="flex justify-between">
                <span>Technical</span>
                <span className="font-semibold">{feedback.technicalScore}/10</span>
              </div>
              <div className="flex justify-between">
                <span>Communication</span>
                <span className="font-semibold">{feedback.communicationScore}/10</span>
              </div>
              <div className="flex justify-between">
                <span>Problem Solving</span>
                <span className="font-semibold">{feedback.problemSolvingScore}/10</span>
              </div>
              <div className="flex justify-between">
                <span>Cultural Fit</span>
                <span className="font-semibold">{feedback.culturalFitScore}/10</span>
              </div>
              <div className="col-span-2 flex justify-between border-t border-violet-800/30 pt-2 mt-1">
                <span>Overall Score</span>
                <span className="font-semibold">{feedback.overallScore}/10</span>
              </div>
            </div>

            {/* Strengths */}
            <div className="mt-3">
              <span className="block text-violet-400 text-xs font-medium">Strengths:</span>
              <p className="text-violet-300 text-xs mt-1">{feedback.strengths}</p>
            </div>

            {/* Areas for Improvement */}
            <div className="mt-3">
              <span className="block text-violet-400 text-xs font-medium">
                Areas for Improvement:
              </span>
              <p className="text-violet-300 text-xs mt-1">{feedback.areasForImprovement}</p>
            </div>

            {/* Comments */}
            <div className="mt-3">
              <span className="block text-violet-400 text-xs font-medium">Comments:</span>
              <p className="text-violet-300 text-xs mt-1">{feedback.comments}</p>
            </div>

            {/* Recommendation */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-violet-400">Recommendation:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${
                  feedback.recommendation === "hire"
                    ? "bg-green-200/20 text-green-400 border border-green-500/40"
                    : feedback.recommendation === "no-hire"
                    ? "bg-red-200/20 text-red-400 border border-red-500/40"
                    : "bg-yellow-200/20 text-yellow-400 border border-yellow-500/40"
                }`}
              >
                {feedback.recommendation}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
