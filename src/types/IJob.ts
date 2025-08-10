export interface IJob {
  _id?:string;
  company?: string;
  position: string;
  description: string;
  requiredSkills: string[];
  status?: "open" | "in-progress" | "completed";
  experienceRequired: number|string;
  createdAt?: Date;
  updatedAt?: Date;
}




export interface DelegatedJob {
  delegatedCandidateId: string;
  jobId: string;
  jobTitle: string;
  name: string;
  mockStatus: "mock_pending" | "mock_started"|"mock_failed" | "mock_completed" | "shortlisted" | "final_scheduled" | "final_completed" | "rejected";
  interviewDateTime?: string; // ISO string for scheduled interview
  interviewType?: "video" | "in_person" | "phone";
  interviewLocation?: string; // Meeting link or physical address
  interviewDuration?: number; // Duration in minutes
  isQualifiedForFinal?:boolean
}


export interface JobsApiResponse {
  jobs: DelegatedJob[];
  success: boolean;
  message?: string;
}
export 
interface IJobWithQualifiedCandidatesCount {
  job: IJob;
  qualifiedCandidatesCount: number;
}

