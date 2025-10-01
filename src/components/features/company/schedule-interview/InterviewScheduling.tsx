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

const InterviewScheduling = () => {
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
    console.log(interviewer, slot, selectedCandidate);
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

  return (
    <div className="text-white custom-64 h-min-screen bg-gradient-to-br from-black via-black">
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
