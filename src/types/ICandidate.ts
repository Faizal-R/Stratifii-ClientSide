import { ICompany } from "./ICompany";
import { IInterviewer } from "./IInterviewer";
import { IJob } from "./IJob";

export interface ICandidateProfile {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  resume: string;
  status: "active" | "pending" | "deactive";
  isBlocked: boolean;
  companyName?: string;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
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

export interface ICandidateJob{
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



export interface IDelegatedCandidate{

  candidate:string|ICandidateProfile;
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
   feedback?: string;
   aiMockResult?: {
     totalQuestions: number;
     correctAnswers: number;
     scoreInPercentage: number;
   };
   isQualifiedForFinal?: boolean;
}
