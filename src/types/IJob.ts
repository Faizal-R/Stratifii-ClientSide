export interface IJob {
  companyId?: string;
  position: string;
  description: string;
  requiredSkills: string[];
  deadline: Date;
  status?: "open" | "in-progress" | "completed";
  experienceRequired: number;
  candidates?: ICandidateJob[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICandidateJob {
  candidateId: string;
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
