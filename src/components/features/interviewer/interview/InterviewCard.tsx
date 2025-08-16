"use client"
import React from 'react';
import { Calendar, Clock, User, Briefcase, ExternalLink, Video, Star, MapPin, FileText, Eye } from 'lucide-react';
import { IInterview } from '@/types/IInterview';
import { ICompany } from '@/validations/CompanySchema';

interface InterviewCardProps {
  interview: IInterview;
  onJoinMeeting: (meetingLink: string,interviewId:string) => void;

}

export const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onJoinMeeting }) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      booked: 'bg-blue-900/30 text-blue-300 border-blue-500/30',
      completed: 'bg-green-900/30 text-green-300 border-green-500/30',
      cancelled: 'bg-red-900/30 text-red-300 border-red-500/30',
      rescheduled: 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30',
      no_show: 'bg-gray-700/30 text-gray-300 border-gray-500/30'
    };
    return colors[status as keyof typeof colors] || colors.booked;
  };

  const getStatusLabel = (status: string) => {
    return status === 'booked' ? 'UPCOMING' : status.replace('_', ' ').toUpperCase();
  };

  const isOngoing = () => {
    const now = new Date();
    const start = new Date(interview.startTime);
    const end = new Date(interview.endTime);
    return now >= start && now <= end;
  };

  const canJoinSoon = () => {
    const now = new Date();
    const start = new Date(interview.startTime);
    const tenMinutesBefore = new Date(start.getTime() - 10 * 60 * 1000);
    return now >= tenMinutesBefore;
  };

  const canJoin = () => {
    return interview.meetingLink && canJoinSoon() && interview.status === 'booked';
  };

  const getTimeUntilJoin = () => {
    const now = new Date();
    const start = new Date(interview.startTime);
    const tenMinutesBefore = new Date(start.getTime() - 10 * 60 * 1000);
    
    if (now < tenMinutesBefore) {
      const diff = tenMinutesBefore.getTime() - now.getTime();
      const minutes = Math.ceil(diff / (1000 * 60));
      return `Available in ${minutes} min`;
    }
    return null;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/10">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={interview.candidate.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face`}
                alt={interview.candidate.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {isOngoing() && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white">{interview.candidate.name}</h3>
              <p className="text-sm text-gray-300">{interview.candidate.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(interview.status)}`}>
              {getStatusLabel(interview.status)}
            </span>
            {interview.isRecorded && (
              <div className="flex items-center text-purple-400">
                <Video className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Job Information */}
        <div className="bg-white/5 rounded-lg p-4 mb-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <Briefcase className="w-4 h-4 text-gray-300" />
            <h4 className="font-medium text-white">{interview.job.position}</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-300">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{(interview.bookedBy as ICompany).name}</span>
            </div>
            {interview.job.requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {interview.job.requiredSkills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                  >
                    {skill}
                  </span>
                ))}
                {interview.job.requiredSkills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full border border-gray-500/30">
                    +{interview.job.requiredSkills.length - 3} more
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-300">
              <Star className="w-4 h-4 mr-2" />
              <span>{interview.job.experienceRequired} years experience required</span>
            </div>
          </div>
        </div>

        {/* Time Information */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(interview.startTime)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(interview.startTime)} - {formatTime(interview.endTime)}</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {interview.duration} minutes
          </div>
        </div>

    
        {/* Action Buttons */}
        <div className="flex items-center just
        ify-between">
          {/* Resume Button */}
          <a
           href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                        interview.candidate.resume as string
                      )}&embedded=true`}
                      target="_blank"
                      rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all duration-200 border border-white/20 hover:border-white/30"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
          </a>

          <div className="flex space-x-2">
            {/* {canJoin() && ( */}
              <button
                onClick={() => onJoinMeeting(interview.meetingLink!,interview._id!)}
                className={`flex ml-2 items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isOngoing() 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg animate-pulse' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>{isOngoing() ? 'Join Now' : 'Join Meeting'}</span>
              </button>
             {/* )} */}
            
            {!canJoin() && interview.status === 'booked' && interview.meetingLink && (
              <div className="flex items-center space-x-2">
                <button
                  disabled
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600/50 text-gray-400 rounded-lg font-medium text-sm cursor-not-allowed"
                >
                  <Clock className="w-4 h-4" />
                  <span>Join Meeting</span>
                </button>
                {getTimeUntilJoin() && (
                  <span className="text-xs text-gray-400">{getTimeUntilJoin()}</span>
                )}
              </div>
            )}

            {interview.status === 'completed' && (
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};