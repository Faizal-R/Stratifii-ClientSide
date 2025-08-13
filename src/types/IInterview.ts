// types/IQuestion.ts

export interface IQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: "A" | "B" | "C" | "D";
}

import { ICompany } from "@/validations/CompanySchema";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";
import { IJob } from "./IJob";
import { ICandidate } from "./ICandidate";

// export interface IInterview {
// _id: string;
// candidate: ICandidate;
// interviewer: Partial<IInterviewerProfile>|string;
// bookedBy: Partial<ICompany>|string;
// job: IJob;
//   startTime: string;
//   endTime: string;
//   duration: number;
//   status: "booked" | "completed" | "cancelled" | "rescheduled" | "no_show";
//   meetingLink?: string;
//   rescheduledFrom?: string;
//   cancellationReason?: string;
//   isRecorded?: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

export interface IInterviewFeedback {
  technicalScore?: number;
  communicationScore?: number;
  problemSolvingScore?: number;
  culturalFitScore?: number;
  overallScore?: number;
  strengths?: string;
  areasForImprovement?: string;
  comments?: string;
  recommendation?: 'hire' | 'no-hire' | 'maybe';
}

export interface IInterview {
  _id: string;
  candidate: ICandidate;
  interviewer: Partial<IInterviewerProfile> | string;
  bookedBy: Partial<ICompany> | string;
  job: IJob;

  startTime: string;
  endTime: string;
  duration: number; // planned duration (minutes)
  actualDuration?: number;
  bufferDuration?: number;

  status: "booked" | "completed" | "cancelled" | "rescheduled" | "no_show";

  meetingLink?: string;
  rescheduledFrom?: string;
  cancellationReason?: string;

  isRecorded: boolean;
  recordingUrl?: string;

  feedback?: IInterviewFeedback;

  payoutStatus?: "pending" | "paid";
  createdAt: string;
  updatedAt: string;
}
