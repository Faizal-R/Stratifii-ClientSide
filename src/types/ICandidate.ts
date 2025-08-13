import { ICompany } from "./ICompany";
import { IInterviewer } from "./IInterviewer";
import { IJob } from "./IJob";

export interface ICandidateProfile {
  _id: string;
  email: string;
  avatar: string;
  resume: string;
  status: "active" | "pending" | "deactive";
  isBlocked?: boolean;
  name?: string;
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

export interface IDelegatedCandidate {
  candidate: string | ICandidateProfile;
  company: string | ICompany;
  job: string | IJob;
  status:
    | "mock_pending"
    | "mock_started"
    | "mock_completed"
    | "mock_failed"
    | "shortlisted"
    | "final_scheduled"
    | "final_completed"
    | "rejected";
  assignedInterviewer?: string | IInterviewer;
  scheduledTime?: Date;
  interviewTimeZone?: string;
  finalInterviewFeedback?: {
    technicalScore?: number;
    communicationScore?: number;
    problemSolvingScore?: number;
    culturalFitScore?: number;
    overallScore?: number;
    strengths?: string;
    areasForImprovement?: string;
    comments?: string;
    recommendation?: "hire" | "no-hire" | "maybe";
  };

  aiMockResult?: {
    totalQuestions: number;
    correctAnswers: number;
    scoreInPercentage: number;
  };
  isQualifiedForFinal?: boolean;
}
