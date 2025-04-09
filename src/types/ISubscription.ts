export interface ISubscriptionFeatures {
  candidateSlotPerMonth: number;
  minimumCandidatesPerJob: number;
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