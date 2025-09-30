"use client"
import React, { useState } from 'react';
import { X, Calendar, Clock, Briefcase, Star, User, MessageSquare, Brain, Users, Target, CheckCircle, XCircle, AlertCircle, ChevronDown, Award, TrendingUp, FileText, Eye } from 'lucide-react';
import { IInterview } from '@/types/IInterview';
import { ICandidateProfile } from '@/types/ICandidate';
import Popover from '@/components/ui/Popover';

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

  const getScoreStatus = (score: number) => {
    if (score >= 4) return { 
      color: 'from-emerald-400 to-green-500', 
      bg: 'bg-emerald-500/20 border-emerald-400/40',
      text: 'text-emerald-300',
      status: 'Excellent' 
    };
    if (score >= 3) return { 
      color: 'from-blue-400 to-cyan-500', 
      bg: 'bg-blue-500/20 border-blue-400/40',
      text: 'text-blue-300',
      status: 'Good' 
    };
    if (score >= 2) return { 
      color: 'from-amber-400 to-orange-500', 
      bg: 'bg-amber-500/20 border-amber-400/40',
      text: 'text-amber-300',
      status: 'Average' 
    };
    return { 
      color: 'from-red-400 to-red-500', 
      bg: 'bg-red-500/20 border-red-400/40',
      text: 'text-red-300',
      status: 'Poor' 
    };
  };

  const getRecommendationStatus = (recommendation: string) => {
    switch (recommendation) {
      case 'hire':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          color: 'bg-gradient-to-r from-emerald-500/20 to-green-500/30 border-emerald-400/50 text-emerald-300',
          label: 'Hire',
          glow: 'shadow-emerald-500/20'
        };
      case 'no-hire':
        return {
          icon: <XCircle className="w-4 h-4" />,
          color: 'bg-gradient-to-r from-red-500/20 to-red-600/30 border-red-400/50 text-red-300',
          label: 'No Hire',
          glow: 'shadow-red-500/20'
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          color: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/30 border-amber-400/50 text-amber-300',
          label: 'Maybe',
          glow: 'shadow-amber-500/20'
        };
    }
  };

  const getOverallResult = (score: number) => {
    return score >= 3.5 ? 'PASS' : 'FAIL';
  };

  const getOverallResultStyle = (score: number) => {
    const result = getOverallResult(score);
    return result === 'PASS' 
      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30'
      : 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30';
  };

  const averageScore = interviews?.length 
    ? interviews.reduce((sum, interview) => sum + (interview.feedback?.overallScore || 0), 0) / interviews.length 
    : 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative z-40 w-full max-w-6xl max-h-[90vh]">
        <div className="bg-gradient-to-br from-slate-900/95 via-violet-950/90 to-slate-900/95 rounded-2xl border border-violet-400/20 shadow-2xl shadow-violet-500/20 backdrop-blur-xl">
          <div className="relative">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-500/5 to-violet-600/10 rounded-2xl blur-2xl animate-pulse" />
            
            {/* Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-violet-400/20">
              <div className="flex items-center space-x-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500/40 to-purple-600/40 border border-violet-300/40 flex items-center justify-center shadow-lg">
                    <User className="w-7 h-7 text-violet-200" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{interviews?.length || 0}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-200 via-white to-violet-200 bg-clip-text text-transparent">
                    {candidate?.name || 'Candidate'}
                  </h2>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-violet-300 text-sm">{interviews?.length || 0} interviews completed</span>
                    {interviews && interviews.length > 0 && (
                      <>
                        <div className="w-1 h-1 bg-violet-400 rounded-full"></div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${getOverallResultStyle(averageScore)}`}>
                          AVG: {averageScore.toFixed(1)} ({getOverallResult(averageScore)})
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-violet-500/20 rounded-xl transition-all duration-200 text-violet-300 hover:text-white border border-violet-500/30 hover:border-violet-400/60 hover:shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="relative p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {interviews && interviews.length > 0 ? (
                <div className="space-y-4">
                  {interviews.map((interview, index) => {
                    const recommendation = interview.feedback?.recommendation ? getRecommendationStatus(interview.feedback.recommendation) : null;
                    const overallScore = interview.feedback?.overallScore || 0;
                    const resultStyle = getOverallResultStyle(overallScore);
                    const result = getOverallResult(overallScore);

                    return (
                      <div key={interview._id || index} className="group">
                        {/* Compact Interview Card */}
                        <div className="bg-gradient-to-r from-slate-800/60 via-slate-800/40 to-slate-800/60 rounded-xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 backdrop-blur-sm">
                          <div className="p-4">
                            {/* Header Row */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3 flex-1">
                                <div className="p-2 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-lg border border-blue-400/30 shadow-sm">
                                  <Briefcase className="w-5 h-5 text-blue-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-white text-lg truncate">{interview.job?.position}</h3>
                                  <div className="flex items-center space-x-3 text-sm text-violet-300">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>{formatDate(interview.createdAt || new Date().toISOString())}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-3 h-3" />
                                      <span>{interview.job?.experienceRequired}+ yrs</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Result & Recommendation */}
                              <div className="flex items-center space-x-3">
                                {interview.feedback?.overallScore && (
                                  <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${resultStyle}`}>
                                    {overallScore.toFixed(1)} ({result})
                                  </div>
                                )}
                                {recommendation && (
                                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${recommendation.color} ${recommendation.glow} shadow-lg`}>
                                    {recommendation.icon}
                                    <span>{recommendation.label}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Skills Row */}
                            {interview.job?.requiredSkills && interview.job.requiredSkills.length > 0 && (
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-1.5">
                                  {interview.job.requiredSkills.slice(0, 8).map((skill: string) => (
                                    <span
                                      key={skill}
                                      className="px-2 py-0.5 bg-violet-500/15 text-violet-300 text-xs rounded-md border border-violet-400/20 font-medium hover:bg-violet-500/25 transition-colors"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                  {interview.job.requiredSkills.length > 8 && (
                                    <span className="px-2 py-0.5 bg-slate-500/15 text-slate-300 text-xs rounded-md border border-slate-400/20">
                                      +{interview.job.requiredSkills.length - 8}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Scores Row with Popovers */}
                            {interview.feedback && (
                              <div className="grid grid-cols-4 gap-3 ">
                                {/* Technical Score */}
                                <Popover
                                  title="Technical Skills"
                                  trigger={
                                    <div className="text-center group cursor-pointer">
                                      <div className={` w-12 h-12 mx-auto rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all duration-200 group-hover:scale-105 ${getScoreStatus(interview.feedback.technicalScore!).bg}`}>
                                        <span className={getScoreStatus(interview.feedback.technicalScore!).text}>
                                          {interview.feedback.technicalScore}
                                        </span>
                                      </div>
                                      <div className="text-xs text-slate-400 mt-1 flex items-center justify-center space-x-1">
                                        <Brain className="w-3 h-3" />
                                        <span>Tech</span>
                                      </div>
                                    </div>
                                  }
                                >
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span>Score:</span>
                                      <span className="font-bold">{interview.feedback.technicalScore}/5</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Status:</span>
                                      <span className={`font-medium ${getScoreStatus(interview.feedback.technicalScore!).text}`}>
                                        {getScoreStatus(interview.feedback.technicalScore!).status}
                                      </span>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2">
                                      Coding skills, problem-solving approach, and technical knowledge assessment.
                                    </div>
                                  </div>
                                </Popover>

                                {/* Communication Score */}
                                <Popover
                                  title="Communication"
                                  trigger={
                                    <div className="text-center group cursor-pointer">
                                      <div className={`w-12 h-12 mx-auto rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all duration-200 group-hover:scale-105 ${getScoreStatus(interview.feedback.communicationScore!).bg}`}>
                                        <span className={getScoreStatus(interview.feedback.communicationScore!).text}>
                                          {interview.feedback.communicationScore}
                                        </span>
                                      </div>
                                      <div className="text-xs text-slate-400 mt-1 flex items-center justify-center space-x-1">
                                        <MessageSquare className="w-3 h-3" />
                                        <span>Comm</span>
                                      </div>
                                    </div>
                                  }
                                >
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span>Score:</span>
                                      <span className="font-bold">{interview.feedback.communicationScore}/5</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Status:</span>
                                      <span className={`font-medium ${getScoreStatus(interview.feedback.communicationScore!).text}`}>
                                        {getScoreStatus(interview.feedback.communicationScore!).status}
                                      </span>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2">
                                      Clarity of expression, listening skills, and overall communication effectiveness.
                                    </div>
                                  </div>
                                </Popover>

                                {/* Problem Solving Score */}
                                <Popover
                                  title="Problem Solving"
                                  trigger={
                                    <div className="text-center group cursor-pointer">
                                      <div className={`w-12 h-12 mx-auto rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all duration-200 group-hover:scale-105 ${getScoreStatus(interview.feedback.problemSolvingScore!).bg}`}>
                                        <span className={getScoreStatus(interview.feedback.problemSolvingScore!).text}>
                                          {interview.feedback.problemSolvingScore}
                                        </span>
                                      </div>
                                      <div className="text-xs text-slate-400 mt-1 flex items-center justify-center space-x-1">
                                        <Target className="w-3 h-3" />
                                        <span>Logic</span>
                                      </div>
                                    </div>
                                  }
                                >
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span>Score:</span>
                                      <span className="font-bold">{interview.feedback.problemSolvingScore}/5</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Status:</span>
                                      <span className={`font-medium ${getScoreStatus(interview.feedback.problemSolvingScore!).text}`}>
                                        {getScoreStatus(interview.feedback.problemSolvingScore!).status}
                                      </span>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2">
                                      Analytical thinking, creative solutions, and systematic approach to challenges.
                                    </div>
                                  </div>
                                </Popover>

                                {/* Cultural Fit Score */}
                                <Popover
                                  title="Cultural Fit"
                                  trigger={
                                    <div className="text-center group cursor-pointer">
                                      <div className={`w-12 h-12 mx-auto rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all duration-200 group-hover:scale-105 ${getScoreStatus(interview.feedback.culturalFitScore!).bg}`}>
                                        <span className={getScoreStatus(interview.feedback.culturalFitScore!).text}>
                                          {interview.feedback.culturalFitScore}
                                        </span>
                                      </div>
                                      <div className="text-xs text-slate-400 mt-1 flex items-center justify-center space-x-1">
                                        <Users className="w-3 h-3" />
                                        <span>Culture</span>
                                      </div>
                                    </div>
                                  }
                                >
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span>Score:</span>
                                      <span className="font-bold">{interview.feedback.culturalFitScore}/5</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Status:</span>
                                      <span className={`font-medium ${getScoreStatus(interview.feedback.culturalFitScore!).text}`}>
                                        {getScoreStatus(interview.feedback.culturalFitScore!).status}
                                      </span>
                                    </div>
                                    <div className="text-xs text-slate-400 mt-2">
                                      Team collaboration, company values alignment, and workplace compatibility.
                                    </div>
                                  </div>
                                </Popover>
                              </div>
                            )}

                            {/* Detailed Feedback Popovers */}
                            {interview.feedback && (
                              <div className="mt-4 flex justify-center space-x-4 ">
                                {interview.feedback.strengths && (
                                  <Popover
                                    title="Strengths"
                                    trigger={
                                      <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 hover:border-emerald-400/50 rounded-lg text-emerald-300 text-sm font-medium transition-all duration-200">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>Strengths</span>
                                      </button>
                                    }
                                  >
                                    {interview.feedback.strengths}
                                  </Popover>
                                )}

                                {interview.feedback.areasForImprovement && (
                                  <Popover
                                    title="Areas for Improvement"
                                    trigger={
                                      <button className="flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 hover:border-amber-400/50 rounded-lg text-amber-300 text-sm font-medium transition-all duration-200">
                                        <Target className="w-3 h-3" />
                                        <span>Areas to Improve</span>
                                      </button>
                                    }
                                  >
                                    {interview.feedback.areasForImprovement}
                                  </Popover>
                                )}

                                {interview.feedback.comments && (
                                  <Popover
                                    title="Additional Comments"
                                    trigger={
                                      <button className="flex items-center space-x-2 px-3 py-1.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-400/30 hover:border-violet-400/50 rounded-lg text-violet-300 text-sm font-medium transition-all duration-200">
                                        <FileText className="w-3 h-3" />
                                        <span>Comments</span>
                                      </button>
                                    }
                                  >
                                    {interview.feedback.comments}
                                  </Popover>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-600/30 border border-violet-400/40 flex items-center justify-center mb-6 shadow-lg">
                      <Calendar className="w-10 h-10 text-violet-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full border-2 border-slate-800 flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-300">0</span>
                    </div>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">No Interview History</h3>
                  <p className="text-slate-400 text-center max-w-md">
                    This candidate hasn't completed any interviews yet. Once they do, you'll see detailed feedback and scores here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  );
};