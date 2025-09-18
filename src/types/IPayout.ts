export type TPayoutStatus = "pending" | "approved" | "rejected" | "processing" | "completed" | "failed";
export interface IPayoutRequest {
  _id: string;
  interviewerId: string;
  interviewerName: string;
  amount: number;
  status: TPayoutStatus;
  requestedAt: string;
  approvedAt?: string;
  processedAt?: string;
  payoutId?: string;
  failureReason?: string;
  adminId?: string;
}