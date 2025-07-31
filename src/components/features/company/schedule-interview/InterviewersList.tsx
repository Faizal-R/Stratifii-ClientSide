"use client"
import React from 'react';
import {
  Star,
  MapPin,
  Mail,
  Calendar,
  Clock,
} from 'lucide-react';
import { IJob } from '@/types/IJob';

const formatDate = (date: Date) => new Date(date).toDateString();
const formatTime = (date: Date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const formatDuration = (minutes: number) => `${minutes} mins`;
const isSlotAvailable = (slot: any) => slot.isAvailable && slot.status === 'available';

const InterviewerList: React.FC<{selectedJob:IJob}> = ({selectedJob}) => {
  // const selectedJob = {
  //   requiredSkills: ['React', 'Node.js', 'MongoDB'],
  // };

  const selectedCandidate = {
    name: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  };

  const onBookSlot = (interviewer: any, slot: any) => {
    console.log('Booking slot:', slot, 'with interviewer:', interviewer.name);
  };

  const interviewers = [
    {
      _id: 'i1',
      name: 'John Doe',
      position: 'Senior Frontend Engineer',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      password: 'hashed_password',
      experience: 6,
      linkedinProfile: 'https://linkedin.com/in/johndoe',
      location: 'San Francisco, CA',
      languages: [
        { language: 'English', level: 'Fluent' },
        { language: 'Spanish', level: 'Intermediate' },
      ],
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      availability: [
        { day: 'Monday', startTime: '10:00', endTime: '16:00' },
        { day: 'Wednesday', startTime: '12:00', endTime: '18:00' },
      ],
      professionalSummary:
        'Experienced frontend engineer with strong knowledge in React and UI/UX design.',
      expertise: ['React', 'JavaScript', 'TypeScript', 'CSS'],
      scheduleInterviews: [],
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      isVerified: true,
      rating: 4.8,
      reviews: [],
      status: 'active',
      isBlocked: false,
      resume: 'https://example.com/johndoe_resume.pdf',
      availableSlots: [
        {
          _id: 'slot1',
          startTime: new Date(),
          endTime: new Date(Date.now() + 60 * 60000),
          duration: 60,
          isAvailable: true,
          status: 'available',
          meetingLink: 'https://meet.example.com/john-slot1',
        },
        {
          _id: 'slot2',
          startTime: new Date(Date.now() + 2 * 60 * 60000),
          endTime: new Date(Date.now() + 3 * 60 * 60000),
          duration: 60,
          isAvailable: false,
          status: 'booked',
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Matched Interviewers</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {interviewers.length} available
          </span>
        </div>
        {selectedCandidate && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <p className="text-sm text-blue-700">
                Booking slots for:{' '}
                <span className="font-medium">{selectedCandidate.name}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
        {interviewers.length === 0 ? (
          <div className="text-center py-8">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {selectedJob
                ? 'No matched interviewers found for this job'
                : 'Select a job to view matched interviewers'}
            </p>
          </div>
        ) : (
          interviewers.map((interviewer) => (
            <div
              key={interviewer._id}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={interviewer.avatar}
                  alt={interviewer.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{interviewer.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-600">{interviewer.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{interviewer.position}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {interviewer.isVerified ?? 'Independent'} • {interviewer.experience} yrs
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {interviewer.location}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {interviewer.email}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {interviewer.expertise.slice(0, 4).map((skill: string) => (
                      <span
                        key={skill}
                        className={`px-2 py-1 text-xs rounded ${
                          selectedJob.requiredSkills.includes(skill)
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {skill}
                        {selectedJob.requiredSkills.includes(skill) && ' ✓'}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Available Slots:
                    </h4>
                    {interviewer.availableSlots.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No available slots</p>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {interviewer.availableSlots.map((slot: any) => {
                          const available = isSlotAvailable(slot);
                          return (
                            <div
                              key={slot._id}
                              className={`p-3 rounded border text-sm transition-all ${
                                available
                                  ? 'border-green-200 bg-green-50 hover:bg-green-100'
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium">
                                      {formatDate(slot.startTime)}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>{formatTime(slot.startTime)}</span>
                                  </div>
                                  <span className="text-gray-500">
                                    ({formatDuration(slot.duration)})
                                  </span>
                                </div>
                                {available && selectedCandidate ? (
                                  <button
                                    onClick={() => onBookSlot(interviewer, slot)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium"
                                  >
                                    Book Slot
                                  </button>
                                ) : (
                                  <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                      available
                                        ? selectedCandidate
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-yellow-100 text-yellow-700'
                                        : 'bg-gray-100 text-gray-500'
                                    }`}
                                  >
                                    {available
                                      ? selectedCandidate
                                        ? 'Available'
                                        : 'Select candidate first'
                                      : 'Not Available'}
                                  </span>
                                )}
                              </div>
                              {slot.meetingLink && (
                                <div className="mt-2 text-xs text-gray-600">
                                  <span className="font-medium">Meeting:</span>{' '}
                                  {slot.meetingLink}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InterviewerList;
