import React, { useState } from 'react';
import { Calendar, Clock, Video, User, Building, Timer, X } from 'lucide-react';

export interface IInterview {
  _id: string;
  candidate: string;
  interviewer: { name: string; avatar?: string };
  bookedBy: { name: string; logo?: string };
  job: { title: string; department?: string };
  startTime: Date;
  endTime: Date;
  duration: number;
  actualDuration?: number;
  bufferDuration?: number;
  status: "booked" | "completed" | "cancelled" | "rescheduled" | "no_show";
  meetingLink?: string;
  isRecorded: boolean;
  recordingUrl?: string;
  feedback?: {
    strengths: string;
    areasForImprovement: string;
    comments: string;
  };
}

interface InterviewCardProps {
  interview: IInterview;
  onJoinMeeting: (interview: IInterview) => void;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onJoinMeeting }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }).format(new Date(date));

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true
    }).format(new Date(date));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'rescheduled': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'no_show': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const isUpcoming = () => {
    const now = new Date();
    return new Date(interview.startTime) > now && interview.status === 'booked';
  };

  const canJoinNow = () => {
    const now = new Date();
    const startTime = new Date(interview.startTime);
    const endTime = new Date(interview.endTime);
    const joinWindow = 10 * 60 * 1000;
    return now >= new Date(startTime.getTime() - joinWindow) && now <= endTime && interview.status === 'booked';
  };

  return (
    <>
      {/* Main Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-violet-500/10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{interview.job.title}</h3>
              <p className="text-gray-300 text-sm">{interview.bookedBy.name}</p>
              {interview.job.department && <p className="text-gray-400 text-xs mt-1">{interview.job.department}</p>}
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(interview.status)}`}>
            {interview.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-violet-400" />
            <div>
              <p className="text-white font-medium text-sm">{formatDate(interview.startTime)}</p>
              <p className="text-gray-400 text-xs">Interview Date</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-white font-medium text-sm">{formatTime(interview.startTime)} - {formatTime(interview.endTime)}</p>
              <p className="text-gray-400 text-xs">{interview.duration} minutes</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-white font-medium text-sm">{interview.interviewer.name}</p>
              <p className="text-gray-400 text-xs">Interviewer</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">{interview.bufferDuration && `${interview.bufferDuration}min buffer`}</span>
          </div>

          <div className="flex space-x-2">
            {
              true?(
            
            //  {canJoinNow() ? (
              <button onClick={() => onJoinMeeting(interview)} className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-emerald-500/25">
                <Video className="w-4 h-4" /><span>Join Now</span>
              </button>
            ) : isUpcoming() ? (
              <button disabled className="px-6 py-2 bg-gray-600/50 text-gray-400 rounded-lg font-medium cursor-not-allowed flex items-center space-x-2">
                <Clock className="w-4 h-4" /><span>Upcoming</span>
              </button>
            ) : (
              <button disabled className="px-6 py-2 bg-gray-600/50 text-gray-400 rounded-lg font-medium cursor-not-allowed">
                {interview.status === 'completed' ? 'Completed' : 'Unavailable'}
              </button>
            )}

            {/* New "View Result" Button */}
            {interview.status === 'completed' && interview.feedback && (
              <button
                onClick={() => setShowFeedback(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
              >
                View Result
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Feedback Drawer */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFeedback(false)}
          ></div>

          {/* Sidebar */}
          <div className="w-96 bg-gray-900 text-white shadow-xl p-6 overflow-y-auto transform translate-x-0 transition-transform duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Interview Feedback</h2>
              <button onClick={() => setShowFeedback(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-emerald-400">Strengths</h3>
                <p className="text-gray-300 mt-1">{interview.feedback?.strengths}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-yellow-400">Areas for Improvement</h3>
                <p className="text-gray-300 mt-1">{interview.feedback?.areasForImprovement}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-400">Comments</h3>
                <p className="text-gray-300 mt-1">{interview.feedback?.comments}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewCard;
