"use client";
import React, { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import { IJob, IJobWithQualifiedCandidatesCount } from "@/types/IJob"; // Assuming this type aligns with JobSchema
import { useGetInProgressJobs } from "@/hooks/api/useJob";
import { toast } from "sonner";


interface IJobSelectionProps{
 sendSelectedJob:(job:IJobWithQualifiedCandidatesCount)=>void
}

const JobSelection: React.FC<IJobSelectionProps> = ({sendSelectedJob}) => {
  const [selectedJob, setSelectedJob] =
    useState<IJobWithQualifiedCandidatesCount | null>(null);
  const { getInProgressJobs, loading } = useGetInProgressJobs();
  const [jobs, setJobs] = useState<IJobWithQualifiedCandidatesCount[]>([]);

  // Dummy handler
  const onJobSelect = (job: IJobWithQualifiedCandidatesCount) => {
    // if(!job.qualifiedCandidatesCount){
    //   toast.error("No Candidates Qualified Till Now",{
    //     className:"custom-error-toast"
    //   })
    //   return
    // }
    setSelectedJob(job);
    sendSelectedJob(job)

    console.log("Selected job:", job.job.position);
  };

  // Dummy counts (can be derived dynamically if needed)
  const qualifiedCandidatesCount = 10;
  const matchedInterviewersCount = 5;
  useEffect(() => {
    const fetchGetInProgressJobs = async () => {
      const res = await getInProgressJobs();
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setJobs(res.data);
    };
    fetchGetInProgressJobs();
  }, []);

  return (
    <div className="  p-6 mb-6 ">
      <h2 className="text-lg font-semibold text-violet-300 mb-4">
        Select Job Position
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => {
          return (
<div
  key={job.job?._id}
  onClick={() => onJobSelect(job)}
  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
    selectedJob?.job?._id === job.job?._id
      ? "border-blue-500 bg-blue-50"
      : "border-gray-200 hover:border-gray-300"
  }`}
>
  <div className="flex items-center justify-between mb-2">
    <h3 className="font-medium text-violet-300">
      {job.job?.position}
    </h3>
    <Briefcase className="h-5 w-5 text-gray-400" />
  </div>
  <p className="text-sm text-gray-400 mb-3">
    {job.job?.experienceRequired}+ years experience required
  </p>
  <div className="flex items-center justify-between text-sm mb-3">
    <span className="text-gray-400">
      {/* {selectedJob?._id === job._id ? qualifiedCandidatesCount : job.qualifiedCandidateCount} qualified candidates */}
      {job.qualifiedCandidatesCount} qualifiedCandidatesCount
    </span>
    <span className="text-gray-400">
      {/* {selectedJob?._id === job._id ? matchedInterviewersCount : job.interviewerCount} matched interviewers */}
      {matchedInterviewersCount} matched Interviewers
    </span>
  </div>
  <div className="mt-2">
    <div className="flex flex-wrap gap-1">
      {job.job?.requiredSkills.slice(0, 3).map((skill: string) => (
        <span
          key={skill}
          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
        >
          {skill}
        </span>
      ))}
      {job.job?.requiredSkills.length > 3 && (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
          +{job.job?.requiredSkills.length - 3} more
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
