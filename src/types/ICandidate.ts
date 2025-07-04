export interface ICandidateProfile {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  resume: string;
  status: "active" | "pending" | "deactive";
  isBlocked: boolean;
  companyId: string;
  companyName: string;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
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
