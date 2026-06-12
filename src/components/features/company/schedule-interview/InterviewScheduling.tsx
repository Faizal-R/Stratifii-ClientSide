"use client";
import React, { useEffect, useRef, useState } from "react";
import JobSelection from "./JobSelectionSection";
import InterviewerList from "./InterviewersList";
import { IJobWithQualifiedCandidatesCount } from "@/types/IJob";
import {
  useGetInProgressJobs,

} from "@/hooks/api/useJob";

import CandidateList from "./CandidateList";
import { ICandidateProfile, IDelegatedCandidate } from "@/types/ICandidate";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";
import { IInterviewSlot } from "@/types/ISlotTypes";
import { useScheduleInterviewForCandidate } from "@/hooks/api/useSlot";
import { errorToast, successToast } from "@/utils/customToast";
import { useRouter } from "next/navigation";
import { Calendar, Briefcase } from "lucide-react";

const InterviewScheduling = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] =
    useState<IJobWithQualifiedCandidatesCount>();
  const { getInProgressJobs } = useGetInProgressJobs();
  const [jobsInProgress, setJobsInProgress] = useState<
    IJobWithQualifiedCandidatesCount[]
  >([]);
  const [selectedCandidate, setSelectedCandidate] =
    useState<IDelegatedCandidate>();
  const { scheduleInterview } = useScheduleInterviewForCandidate();
  const onCandidateSelect = (candidate: IDelegatedCandidate) => {
    setSelectedCandidate(candidate);
  };

  const onBookSlot = async (
    interviewer: IInterviewerProfile,
    slot: IInterviewSlot
  ) => {
    if (!selectedCandidate) {
      errorToast("Please select a candidate")
      return;
    }
    
    const res = await scheduleInterview({
      interviewer: interviewer._id!,
      slot,
      candidate: (selectedCandidate.candidate as ICandidateProfile)._id,
      job: selectedJob?.job._id!,
      isFollowUpScheduling: false,
    });
    if (!res.success) {
     errorToast(res.message);
      return;
    }

    successToast("Slot Booked Successfully");
  };

  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchGetInProgressJobs = async () => {
      const res = await getInProgressJobs();
      if (!res.success) {
      errorToast(res.message);
        return;
      }
      setJobsInProgress(res.data);
    };

    fetchGetInProgressJobs();
  }, []);

  if (jobsInProgress.length === 0) {
    return (
      <div className="text-white w-full flex items-center justify-center py-20 min-h-[70vh]">
        <div className="max-w-md w-full p-8 text-center flex flex-col items-center justify-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-violet-600/10 border border-violet-500/20 rounded-full text-violet-400">
              <Calendar className="w-12 h-12 animate-bounce" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No Active Jobs for Scheduling</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            You don't have any active job positions with qualified candidates ready for scheduling. First, delegate a job. Delegated candidates must attend and pass their AI mock interviews to qualify for the final round.
          </p>
          <button
            onClick={() => router.push("/company/interview-delegation")}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium rounded-xl shadow-lg shadow-violet-950/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Post a Job Delegation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  ">
        <JobSelection
          sendSelectedJob={(job) => setSelectedJob(job)}
          jobs={jobsInProgress}
        />

        {selectedJob && selectedJob.qualifiedCandidatesCount > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CandidateList
              selectedJob={selectedJob.job}
              selectedCandidate={selectedCandidate}
              onCandidateSelect={onCandidateSelect}
            />
            <InterviewerList
              selectedJob={selectedJob.job}
              onBookSlot={onBookSlot}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewScheduling;
