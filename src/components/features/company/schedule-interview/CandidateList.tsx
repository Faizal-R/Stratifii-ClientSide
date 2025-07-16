import React from 'react';
import { User, MapPin, Mail, CheckCircle, Circle, Award, Clock } from 'lucide-react';
// import { ICandidateListProps } from '../types';
import { formatDateTime } from '@/utils/dateHelper';

const CandidateList: React.FC<any> = ({
  candidates,
  selectedJob,
  selectedCandidate,
  onCandidateSelect
}) => {
  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-600 bg-gray-100';
    if (score >= 90) return 'text-green-600 bg-green-100 border-green-300';
    if (score >= 80) return 'text-blue-600 bg-blue-100 border-blue-300';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    return 'text-red-600 bg-red-100 border-red-300';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'final_scheduled':
        return 'text-green-600 bg-green-100 border-green-300';
      case 'final_completed':
        return 'text-purple-600 bg-purple-100 border-purple-300';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'Shortlisted';
      case 'final_scheduled':
        return 'Interview Scheduled';
      case 'final_completed':
        return 'Interview Completed';
      default:
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Qualified Candidates {selectedJob && `for ${selectedJob.title}`}
          </h2>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {candidates.length} qualified
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Candidates who passed AI mock interviews and are ready for final interviews
        </p>
      </div>
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {candidates.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {selectedJob 
                ? 'No qualified candidates found for this job'
                : 'Select a job to view qualified candidates'
              }
            </p>
          </div>
        ) : (
          candidates.map((candidate) => (
            <div
              key={candidate._id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedCandidate?._id === candidate._id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => onCandidateSelect(candidate)}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                    <div className="flex items-center space-x-2">
                      {candidate.mockScore && (
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getScoreColor(candidate.mockScore)}`}>
                          <Award className="h-3 w-3 inline mr-1" />
                          {candidate.mockScore}%
                        </div>
                      )}
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.delegationStatus)}`}>
                        {formatStatus(candidate.delegationStatus)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{candidate.experience} experience</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        candidate.status === 'active' ? 'bg-green-100 text-green-700' :
                        candidate.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {candidate.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className={`px-2 py-1 text-xs rounded border ${
                          selectedJob?.requiredSkills.includes(skill)
                            ? 'bg-blue-100 text-blue-700 border-blue-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        {skill}
                        {selectedJob?.requiredSkills.includes(skill) && ' ✓'}
                      </span>
                    ))}
                    {candidate.skills.length > 5 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300">
                        +{candidate.skills.length - 5} more
                      </span>
                    )}
                  </div>
                  
                  {candidate.scheduledInterview ? (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center text-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Interview Scheduled</p>
                          <p className="text-xs">
                            {formatDateTime(candidate.scheduledInterview.scheduledTime)}
                            {candidate.scheduledInterview.timeZone && (
                              <span className="ml-1">({candidate.scheduledInterview.timeZone})</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center text-blue-600">
                        <Circle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Ready for scheduling</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCandidateSelect(candidate);
                        }}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          selectedCandidate?._id === candidate._id
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {selectedCandidate?._id === candidate._id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidateList;