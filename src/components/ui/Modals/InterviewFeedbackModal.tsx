import React, { useState } from 'react';
import { X, Star, User, MessageSquare, Target, Users } from 'lucide-react';
import { IInterviewFeedback } from '@/types/IInterview';

interface InterviewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (feedback: IInterviewFeedback) => void;
  candidateName?: string;
}

import { ScoreInput } from '../Buttons/FormFields/ScoreInput';

const InterviewFeedbackModal: React.FC<InterviewFeedbackModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  candidateName = 'Candidate',
}) => {
  const [feedback, setFeedback] = useState<IInterviewFeedback>({});

  const updateScore = (field: keyof IInterviewFeedback, value: number) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  const updateText = (field: keyof IInterviewFeedback, value: string) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(feedback);
    setFeedback({});
    onClose();
  };

  const handleClose = () => {
    setFeedback({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-black via-black to-violet-950 border border-violet-900/30 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-violet-900/30">
          <div>
            <h2 className="text-2xl font-bold text-white">Interview Feedback</h2>
            <p className="text-violet-300 mt-1">Evaluation for {candidateName}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-violet-900/30 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Scoring Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScoreInput
              label="Technical Skills"
              icon={<Target className="w-5 h-5 text-violet-400" />}
              value={feedback.technicalScore}
              onChange={(value) => updateScore('technicalScore', value)}
            />
            
            <ScoreInput
              label="Communication"
              icon={<MessageSquare className="w-5 h-5 text-violet-400" />}
              value={feedback.communicationScore}
              onChange={(value) => updateScore('communicationScore', value)}
            />
            
            <ScoreInput
              label="Problem Solving"
              icon={<Star className="w-5 h-5 text-violet-400" />}
              value={feedback.problemSolvingScore}
              onChange={(value) => updateScore('problemSolvingScore', value)}
            />
            
            <ScoreInput
              label="Cultural Fit"
              icon={<Users className="w-5 h-5 text-violet-400" />}
              value={feedback.culturalFitScore}
              onChange={(value) => updateScore('culturalFitScore', value)}
            />
          </div>

          {/* Overall Score */}
          <div className="pt-6 border-t border-violet-900/30">
            <ScoreInput
              label="Overall Score"
              icon={<User className="w-5 h-5 text-violet-400" />}
              value={feedback.overallScore}
              onChange={(value) => updateScore('overallScore', value)}
            />
          </div>

          {/* Recommendation */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-white font-medium">
              <Star className="w-5 h-5 text-violet-400" />
              Recommendation
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'hire', label: 'Hire', color: 'green' },
                { value: 'maybe', label: 'Maybe', color: 'yellow' },
                { value: 'no-hire', label: 'No Hire', color: 'red' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateText('recommendation', option.value as any)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    feedback.recommendation === option.value
                      ? option.color === 'green'
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : option.color === 'yellow'
                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                        : 'bg-red-500/20 border-red-500 text-red-400'
                      : 'border-gray-600 text-gray-400 hover:border-violet-500 hover:text-violet-400'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-white font-medium">Strengths</label>
              <textarea
                value={feedback.strengths || ''}
                onChange={(e) => updateText('strengths', e.target.value)}
                placeholder="What did the candidate do well?"
                className="w-full p-4 bg-black/50 border border-violet-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none h-32"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-white font-medium">Areas for Improvement</label>
              <textarea
                value={feedback.areasForImprovement || ''}
                onChange={(e) => updateText('areasForImprovement', e.target.value)}
                placeholder="What could be improved?"
                className="w-full p-4 bg-black/50 border border-violet-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none h-32"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-white font-medium">Additional Comments</label>
            <textarea
              value={feedback.comments || ''}
              onChange={(e) => updateText('comments', e.target.value)}
              placeholder="Any additional feedback or observations..."
              className="w-full p-4 bg-black/50 border border-violet-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none h-24"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-violet-900/30">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-6 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-violet-500/25"
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