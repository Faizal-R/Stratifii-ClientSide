


// export interface IJob {
  //   _id: string;
  //   company: string;
  //   position: string;
  //   description?: string;
  //   requiredSkills: string[];
  //   status: "open" | "in-progress" | "completed";
  //   experienceRequired: number;
  // }
  
  
  
  import { ICompany } from "@/validations/CompanySchema";
  import { IInterviewerProfile } from "@/validations/InterviewerSchema";
  import { IJob } from "./IJob";
  import { ICandidate } from "./ICandidate";


export interface IInterview {
  _id: string;
  candidate: ICandidate;
  interviewer: Partial<IInterviewerProfile>|string;
  bookedBy: Partial<ICompany>|string;
  job: IJob;
  startTime: string;
  endTime: string;
  duration: number;
  status: "booked" | "completed" | "cancelled" | "rescheduled" | "no_show";
  meetingLink?: string;
  rescheduledFrom?: string;
  cancellationReason?: string;
  isRecorded?: boolean;
  createdAt: string;
  updatedAt: string;
}