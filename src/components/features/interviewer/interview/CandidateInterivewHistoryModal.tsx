"use client"
import React from 'react';
import { X, Calendar, Clock, Briefcase, Star, User, MessageSquare, Brain, Users, Target, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { IInterview } from '@/types/IInterview';
import { ICandidateProfile } from '@/types/ICandidate';

interface CandidateHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  interviews: IInterview[] | null;
  candidate: ICandidateProfile | null;
}

export const CandidateHistoryModal: React.FC<CandidateHistoryModalProps> = ({ 
  isOpen, 
  onClose, 
  interviews,
  candidate
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (score >= 3) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    if (score >= 2) return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'hire':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'no-hire':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'hire':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'no-hire':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative z-50 w-full max-w-5xl max-h-[90vh]">
        <div className="bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-violet-600/5 rounded-xl blur-xl" />
            
            {/* Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-violet-500/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-600/30 border border-violet-400/40 flex items-center justify-center">
                  <User className="w-6 h-6 text-violet-300" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{candidate?.name || 'Candidate'} - Interview History</h2>
                  <p className="text-sm text-violet-300">{interviews?.length || 0} interviews completed</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-violet-500/20 rounded-xl transition-colors text-violet-400 hover:text-white border border-violet-500/20 hover:border-violet-400/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="relative p-6 max-h-[70vh] overflow-y-auto">
              {interviews && interviews.length > 0 ? (
                <div className="space-y-4">
                  {interviews.map((interview, index) => (
                    <div key={interview._id || index} className="group">
                      {/* Interview Card */}
                      <div className="bg-gradient-to-br from-violet-900/20 via-slate-800/40 to-slate-900/60 rounded-xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 overflow-hidden">
                        <div className="p-5">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
                                <Briefcase className="w-5 h-5 text-blue-300" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white text-lg">{interview.job?.position}</h3>
                                <div className="flex items-center space-x-4 text-sm text-violet-300">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(interview.createdAt || new Date().toISOString())}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3" />
                                    <span>{interview.job?.experienceRequired}+ years</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Recommendation Badge */}
                            {interview.feedback?.recommendation && (
                              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-sm font-medium ${getRecommendationColor(interview.feedback.recommendation)}`}>
                                {getRecommendationIcon(interview.feedback.recommendation)}
                                <span className="capitalize">{interview.feedback.recommendation.replace('-', ' ')}</span>
                              </div>
                            )}
                          </div>

                          {/* Company & Interviewer */}
                         

                          {/* Skills */}
                          {interview.job?.requiredSkills && interview.job.requiredSkills.length > 0 && (
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-2">
                                {interview.job.requiredSkills.slice(0, 6).map((skill: string) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full border border-violet-400/30 font-medium"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {interview.job.requiredSkills.length > 6 && (
                                  <span className="px-2 py-1 bg-slate-500/20 text-slate-300 text-xs rounded-full border border-slate-400/30">
                                    +{interview.job.requiredSkills.length - 6} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Feedback Scores */}
                          {interview.feedback && (
                            <div className="space-y-4">
                              {/* Score Grid */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="text-center">
                                  <div className={`w-12 h-12 mx-auto rounded-full border flex items-center justify-center font-bold ${getScoreColor(interview.feedback.technicalScore!)}`}>
                                    {interview.feedback.technicalScore}
                                  </div>
                                  <div className="text-xs text-slate-400 mt-1 flex items-center justify-center space-x-1">
                                    <Brain className="w-3 h-3" />
                                    <span>Technical</span>
                                  </div>
                                </div>
                                
                                <div className="text-center">
                                  <div className={`w-12 h-12 mx-auto rounded-full border flex items-center justify-center font-bold ${getScoreColor(interview.feedback.communicationScore!)}`}>
                                    {interview.feedback.communicationScore}
                                  </div>
                                  <div className="text-xs text-slate-400 mt-1 flex items-center justify-center space-x-1">
                                    <MessageSquare className="w-3 h-3" />
                                    <span>Communication</span>
                                  </div>
                                </div>
                                
                                <div className="text-center">
                                  <div className={`w-12 h-12 mx-auto rounded-full border flex items-center justify-center font-bold ${getScoreColor(interview.feedback.problemSolvingScore!)}`}>
                                    {interview.feedback.problemSolvingScore}
                                  </div>
                                  <div className="text-xs text-slate-400 mt-1 flex items-center justify-center space-x-1">
                                    <Target className="w-3 h-3" />
                                    <span>Problem Solving</span>
                                  </div>
                                </div>
                                
                                <div className="text-center">
                                  <div className={`w-12 h-12 mx-auto rounded-full border flex items-center justify-center font-bold ${getScoreColor(interview.feedback.culturalFitScore!)}`}>
                                    {interview.feedback.culturalFitScore}
                                  </div>
                                  <div className="text-xs text-slate-400 mt-1 flex items-center justify-center space-x-1">
                                    <Users className="w-3 h-3" />
                                    <span>Cultural Fit</span>
                                  </div>
                                </div>
                              </div>

                              {/* Overall Score */}
                              <div className="flex items-center justify-center">
                                <div className="text-center">
                                  <div className={`w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center font-bold text-lg ${getScoreColor(interview.feedback.overallScore!)}`}>
                                    {interview.feedback.overallScore}
                                  </div>
                                  <div className="text-sm text-slate-300 mt-2 font-medium">Overall Score</div>
                                </div>
                              </div>

                              {/* Feedback Text */}
                              <div className="grid md:grid-cols-2 gap-4">
                                {interview.feedback.strengths && (
                                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                    <h4 className="text-green-400 font-medium text-sm mb-2">Strengths</h4>
                                    <p className="text-slate-300 text-sm">{interview.feedback.strengths}</p>
                                  </div>
                                )}
                                
                                {interview.feedback.areasForImprovement && (
                                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                                    <h4 className="text-orange-400 font-medium text-sm mb-2">Areas for Improvement</h4>
                                    <p className="text-slate-300 text-sm">{interview.feedback.areasForImprovement}</p>
                                  </div>
                                )}
                              </div>

                              {interview.feedback.comments && (
                                <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3">
                                  <h4 className="text-violet-400 font-medium text-sm mb-2">Additional Comments</h4>
                                  <p className="text-slate-300 text-sm">{interview.feedback.comments}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-violet-400" />
                  </div>
                  <p className="text-slate-400 text-center text-lg mb-2">No Interview History</p>
                  <p className="text-slate-500 text-sm text-center">
                    This candidate hasn't completed any interviews yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};