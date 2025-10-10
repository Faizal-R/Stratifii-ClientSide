import { IInterviewerProfile } from "@/validations/InterviewerSchema";
import { ICompany } from "./ICompany";

import { IJob } from "./IJob";

export interface ICandidateProfile {
  _id: string;
  email: string;
  avatar: string;
  resume: string;
  status: "active" | "pending" | "deactive";
  isBlocked?: boolean;
  name: string;
  createdAt?: string; // ISO 8601 datetime string
  updatedAt?: string; // ISO 8601 datetime string
}

export interface ICandidate {
  _id: string;
  email: string;
  password?: string;
  name: string;
  resume: string;
  avatar: string;
  status?: "active" | "pending" | "deactive";
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICandidateJob {
  candidate: ICandidateProfile;
  interviewStatus:
    | "pending"
    | "mock_started"
    | "mock_completed"
    | "shortlisted"
    | "final_scheduled"
    | "final_completed"
    | "rejected";
  interviewerId?: string | null;
}

export interface IInterviewFeedback {
  technicalScore?: number;
  communicationScore?: number;
  problemSolvingScore?: number;
  culturalFitScore?: number;
  overallScore?: number;
  strengths?: string;
  areasForImprovement?: string;
  comments?: string;
  recommendation?: "hire" | "no-hire" | "maybe"|"next-round";
  needsFollowUp?: boolean;
  suggestedFocusAreas?: string[];
  internalNotes?:string;
}

export interface IInterviewRound {
  roundNumber: number;
  type: "mock" | "final" | "followup";
  timeZone?: string;
  status: "scheduled" | "started" | "completed" | "cancelled"|"no_show";
  feedback?: IInterviewFeedback;
  interviewer:string | IInterviewerProfile;
  isFollowUpScheduled: boolean;
}
export interface IDelegatedCandidate {
  _id?:string;
  candidate: string | ICandidateProfile;
  company: string | ICompany;
  job: string | IJob;
 status:
    | "mock_pending"
    | "mock_started" 
    | "mock_completed"
    | "mock_failed"
    | "in_interview_process" 
    | "interview_completed"  
    | "shortlisted"
    | "hired"
    | "rejected"
    | "disqualified";
  interviewRounds: IInterviewRound[];
  totalNumberOfRounds?: number;
  currentRound?:number
  isQualifiedForFinal?: boolean;
  aiMockResult?: {
    totalQuestions: number;
    correctAnswers: number;
    scoreInPercentage: number;
  };
  mockInterviewDeadline?: Date|string
  isInterviewScheduled?: boolean
}
