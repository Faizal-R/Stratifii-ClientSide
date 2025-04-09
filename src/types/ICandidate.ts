interface ICandidate {
  _id: string;
  name: string;
  resume:string
  password?:string;
  email: string;
  status:string;
  avatar?:string
}

interface ICandidateJob{
    candidate: ICandidate;
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
