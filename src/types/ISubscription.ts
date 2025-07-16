export interface ISubscriptionFeatures {
  candidateSlotPerMonth: number;
  finalInterviewAccess: boolean;
  interviewRecordingAccess: boolean;
  feedbackDownloadAccess: boolean;
  jobPostLimitPerMonth: number;
  companySpecificQuestionAccess: boolean;
}

export interface ISubscription {
  _id?:string;
  name: string;
  price: number;
  isActive: boolean;
  features: ISubscriptionFeatures;
}


export interface ISubscriptionDetails {
  subscriberId: string;
  planId: string;
  status: "active" | "expired" | "canceled" | "pending";
  planDetails: {
    name: string;
    price: number;
    currency: string;
    features: ISubscriptionFeatures;
  };
  startDate: Date;
  endDate: Date;
  transactionId: string;
}