import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { IJob } from '@/types/IJob'; // Assuming this type aligns with JobSchema

const JobSelection: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);

  // Dummy handler
  const onJobSelect = (job:any) => {
    setSelectedJob(job);
    console.log('Selected job:', job.position);
  };

  // Dummy counts (can be derived dynamically if needed)
  const qualifiedCandidatesCount = 10;
  const matchedInterviewersCount = 5;

  // Dummy job data
  const jobs= [
    {
      _id: '1',
      position: 'Frontend Developer',
      description: 'Build UI components using React and Tailwind.',
      requiredSkills: ['React', 'Tailwind', 'JavaScript', 'HTML'],
      deadline: new Date(),
      status: 'open',
      experienceRequired: 2,
      company: 'dummyCompanyId1',
      interviewerCount: 3,
      qualifiedCandidateCount: 8,
    },
    {
      _id: '2',
      position: 'Backend Developer',
      description: 'Work with Node.js and MongoDB to develop APIs.',
      requiredSkills: ['Node.js', 'MongoDB', 'Express', 'TypeScript'],
      deadline: new Date(),
      status: 'open',
      experienceRequired: 3,
      company: 'dummyCompanyId2',
      interviewerCount: 4,
      qualifiedCandidateCount: 12,
    },
    {
      _id: '3',
      position: 'Fullstack Developer',
      description: 'Develop fullstack applications using MERN stack.',
      requiredSkills: ['React', 'Node.js', 'MongoDB', 'Express'],
      deadline: new Date(),
      status: 'open',
      experienceRequired: 4,
      company: 'dummyCompanyId3',
      interviewerCount: 5,
      qualifiedCandidateCount: 15,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-black via-black to-violet-950 border-emerald-500/20 rounded-lg shadow-sm border p-6 mb-6">
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
              <p className="text-sm text-gray-400 mb-3">{job.experienceRequired}+ years experience required</p>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-400">
                  {selectedJob?._id === job._id ? qualifiedCandidatesCount : job.qualifiedCandidateCount} qualified candidates
                </span>
                <span className="text-gray-400">
                  {selectedJob?._id === job._id ? matchedInterviewersCount : job.interviewerCount} matched interviewers
                </span>
              </div>
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.slice(0, 3).map((skill: string) => (
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
