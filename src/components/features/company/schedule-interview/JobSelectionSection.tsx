"use client";
import React, { useState } from "react";
import { Briefcase, CheckCircle2, Sparkles, ChevronRight, Layers } from "lucide-react";
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
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Layers className="text-violet-400" size={22} />
            Select Position for Scheduling
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Choose an active job position to review qualified candidate pipelines and book expert interview slots.
          </p>
        </div>
        <span className="text-xs font-bold text-violet-400 bg-violet-950/80 border border-violet-800/60 px-3 py-1 rounded-full">
          {jobs.length} Active Positions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs.map((job) => {
          const isSelected = selectedJob?.job._id === job.job._id;

          return (
            <div
              key={job.job._id}
              onClick={() => onJobSelect(job)}
              className={`group relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-violet-500 bg-gradient-to-b from-violet-950/80 via-zinc-950 to-black shadow-2xl shadow-violet-600/20 ring-1 ring-violet-500/50"
                  : "border-zinc-800/80 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/60"
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 size={12} /> SELECTED
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-start justify-between pr-16">
                  <div>
                    <h3 className="font-extrabold text-base text-white group-hover:text-violet-300 transition-colors">
                      {job.job.position}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">
                      {job.job.experienceRequired}+ Yrs Experience
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs">
                  <span className="text-zinc-400 font-bold">Qualified Candidates</span>
                  <span className="font-black text-emerald-400 text-sm">
                    {job.qualifiedCandidatesCount} Ready
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.job.requiredSkills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 bg-violet-950/60 text-violet-300 text-[10px] font-bold rounded-lg border border-violet-800/40"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.job.requiredSkills.length > 3 && (
                    <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] font-bold rounded-lg border border-zinc-800">
                      +{job.job.requiredSkills.length - 3} more
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
