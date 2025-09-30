"use client";
import React, { useState } from "react";
import { Briefcase } from "lucide-react";
import { IJobWithQualifiedCandidatesCount } from "@/types/IJob";

interface IJobSelectionProps {
  sendSelectedJob: (job: IJobWithQualifiedCandidatesCount) => void;
  jobs: IJobWithQualifiedCandidatesCount[];
}

const JobSelection: React.FC<IJobSelectionProps> = ({
  sendSelectedJob,
  jobs,
}) => {
  const [selectedJob, setSelectedJob] = useState<IJobWithQualifiedCandidatesCount | null>(null);

  const onJobSelect = (job: IJobWithQualifiedCandidatesCount) => {
    setSelectedJob(job);
    sendSelectedJob(job);
    console.log("Selected job:", job.job);
  };

  return (
    <div className="p-6 mb-6">
  <h2 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-6">
    Select Job Position
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {jobs.map((job) => (
      <div
        key={job.job._id}
        onClick={() => onJobSelect(job)}
        className={`group relative p-6 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
          selectedJob?.job._id === job.job._id
            ? "border-violet-400 bg-gradient-to-br from-violet-900/40 to-purple-900/40 shadow-lg shadow-violet-500/20 ring-1 ring-violet-400/30"
            : "border-gray-700 bg-gradient-to-br from-gray-900/60 to-black/40 hover:border-violet-500/50 hover:bg-gradient-to-br hover:from-gray-900/80 hover:to-violet-950/40 backdrop-blur-sm"
        }`}
      >
        {/* Subtle glow effect for selected state */}
        {selectedJob?.job._id === job.job._id && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/10 to-purple-600/10 blur-xl"></div>
        )}
        
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg text-white group-hover:text-violet-200 transition-colors">
              {job.job.position}
            </h3>
            <Briefcase className={`h-6 w-6 transition-colors ${
              selectedJob?.job._id === job.job._id 
                ? "text-violet-400" 
                : "text-gray-400 group-hover:text-violet-300"
            }`} />
          </div>
          
          <p className="text-sm text-gray-300 mb-4 font-medium">
            {job.job.experienceRequired}+ years experience required
          </p>
          
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-violet-200 font-medium">
              {job.qualifiedCandidatesCount} qualified candidates
            </span>
          
          </div>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {job.job.requiredSkills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-gradient-to-r from-violet-800/50 to-purple-800/50 text-violet-200 text-xs rounded-full font-medium border border-violet-700/30"
                >
                  {skill}
                </span>
              ))}
              {job.job.requiredSkills.length > 3 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-800/50 to-gray-700/50 text-gray-300 text-xs rounded-full font-medium border border-gray-600/30">
                  +{job.job.requiredSkills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Selection indicator */}
          {selectedJob?.job._id === job.job._id && (
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default JobSelection;
