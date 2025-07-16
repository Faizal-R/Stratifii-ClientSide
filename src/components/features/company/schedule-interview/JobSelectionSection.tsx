import React from 'react';
import { Briefcase } from 'lucide-react';
import { IJob } from '@/types/IJob';
// import { IJobSelectionProps } from '../types';

const JobSelection: React.FC<any> = ({
  jobs,
  selectedJob,
  onJobSelect,
  qualifiedCandidatesCount,
  matchedInterviewersCount
}) => {
  return (
    <div className="bg-emerald-500/10  border-emerald-500/20 rounded-lg shadow-sm border p-6 mb-6">
      <h2 className="text-lg font-semibold text-violet-300 mb-4">Select Job Position</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => {
          return (
            <div
              key={job._id}
              onClick={() => onJobSelect(job)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedJob?._id === job._id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-violet-300">{job.position}</h3>
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-3">{job.experienceRequired}+ years experience required</p>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-500">
                  {selectedJob?._id === job._id ? qualifiedCandidatesCount : job.qualifiedCandidateCount} qualified candidates
                </span>
                <span className="text-gray-500">
                  {selectedJob?._id === job._id ? matchedInterviewersCount : job.interviewerCount} matched interviewers
                </span>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.slice(0, 3).map((skill:string) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{job.requiredSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobSelection;