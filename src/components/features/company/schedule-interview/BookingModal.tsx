import React from 'react';
import { Calendar, Clock, Briefcase, CheckCircle, User, Star } from 'lucide-react';
import { IBookingModalProps } from '../types';
import { formatDate, formatTime, formatDuration } from '@/utils/dateHelper';

const BookingModal: React.FC<IBookingModalProps> = ({
  isOpen,
  candidate,
  interviewer,
  slot,
  job,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !candidate || !interviewer || !slot) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Confirm Interview Booking</h3>
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
        
        <div className="space-y-4 mb-6">
          {/* Candidate Section */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <User className="h-4 w-4 text-blue-600 mr-2" />
              <h4 className="font-medium text-blue-900">Candidate</h4>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{candidate.name}</p>
                <p className="text-sm text-gray-600">{candidate.email}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Mock Score: {candidate.mockScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interviewer Section */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-purple-600 mr-2" />
              <h4 className="font-medium text-purple-900">Interviewer</h4>
            </div>
            <div className="flex items-center space-x-3">
              <img
                src={interviewer.avatar}
                alt={interviewer.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{interviewer.name}</p>
                <p className="text-sm text-gray-600">{interviewer.title}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span className="text-xs text-gray-600">{interviewer.rating} • {interviewer.experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Details Section */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Interview Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Date:</span>
                <span>{formatDate(slot.startTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Time:</span>
                <span>{formatTime(slot.startTime)} - {formatTime(slot.endTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Duration:</span>
                <span>{formatDuration(slot.duration)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-gray-400" />
                <span className="font-medium">Position:</span>
                <span>{job?.position}</span>
              </div>
              {slot.meetingLink && (
                <div className="mt-3 p-2 bg-blue-50 rounded border">
                  <p className="text-xs text-blue-700 font-medium">Meeting Link:</p>
                  <p className="text-xs text-blue-600 break-all">{slot.meetingLink}</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills Match */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-2">Skills Match</h4>
            <div className="flex flex-wrap gap-1">
              {job?.requiredSkills.map((skill:string) => {
                const hasSkill = interviewer.skills.includes(skill) && candidate.skills.includes(skill);
                return (
                  <span
                    key={skill}
                    className={`px-2 py-1 text-xs rounded ${
                      hasSkill
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {skill}
                    {hasSkill && ' ✓'}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;