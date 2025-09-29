import { ICompanyProfile } from "@/validations/CompanySchema";

export interface IJob {
  _id?: string;
  company?: string;
  position: string;
  description: string;
  requiredSkills: string[];
  experienceRequired: number | string;
  status?: "open" | "in-progress" | "completed";
  paymentTransaction?: string | IPaymentTransaction;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPaymentTransaction {
  _id: string;
  companyId: string;
  jobId: string;
  candidatesCount: number;
  pricePerInterview: number;
  totalAmount: number;
  taxAmount: number;
  platformFee: number;
  finalPayableAmount: number;
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentGatewayTransactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DelegatedJob {
  delegatedCandidateId: string;
 job:IJob
  companyName: string;
  mockStatus:
    | "mock_pending"
    | "mock_started"
    | "mock_failed"
    | "mock_completed"
    | "shortlisted"
    | "final_scheduled"
    | "final_completed"
    | "rejected";
  mockInterviewDeadline: Date | string; // Duration in minutes
  isQualifiedForFinal?: boolean;
}

export interface JobsApiResponse {
  jobs: DelegatedJob[];
  success: boolean;
  message?: string;
}
export interface IJobWithQualifiedCandidatesCount {
  job: IJob;
  qualifiedCandidatesCount: number;
}
