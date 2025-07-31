"use client";
import React, { useEffect, useState } from "react";
import JobSelection from "./JobSelectionSection";
import InterviewerList from "./InterviewersList";
import { IJob, IJobWithQualifiedCandidatesCount } from "@/types/IJob";
import {
  useGetCandidatesByJob,
  useGetMatchedInterviewersByJobDescription,
  useGetQualifiedCandidatesByJob,
} from "@/hooks/api/useJob";

const InterviewScheduling = () => {
  const [selectedJob, setSelectedJob] =
    useState<IJobWithQualifiedCandidatesCount>();
  const [qualifiedCandidates, setQualifiedCandidates] = useState([]);
  const [matchedInterviewers, setMatchedInterviewers] = useState([]);
  const setSelectedJobFromJoSelection = (
    job: IJobWithQualifiedCandidatesCount
  ) => {
    setSelectedJob(job);
  };

  const { getQualifiedCandidatesByJob } = useGetQualifiedCandidatesByJob();
  const { getMatchedInterviewersByJobDescription } =
    useGetMatchedInterviewersByJobDescription();

  useEffect(() => {
    const fetchQualifiedCandidatesByJob = async () => {
      const res = await getQualifiedCandidatesByJob(selectedJob?.job._id!);
      if (res.success) {
        setQualifiedCandidates(res.data);
      }
    };

    const fetchMatchedInterviewersByJob = async () => {
      const res = await getMatchedInterviewersByJobDescription(
        selectedJob?.job._id!
      );
      if (res.success) {
        setMatchedInterviewers(res.data);
      }
    };

    fetchQualifiedCandidatesByJob();
    fetchMatchedInterviewersByJob();
  }, [selectedJob]);

  return (
    <div className="text-white ml-64 h-min-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobSelection sendSelectedJob={setSelectedJobFromJoSelection} />

        {selectedJob && selectedJob.qualifiedCandidatesCount > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InterviewerList selectedJob={selectedJob?.job!} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewScheduling;
