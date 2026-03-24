import { ISubscription } from "@/types/ISubscription";

export const LANDING_SUBSCRIPTION_PLANS: ISubscription[] = [
  {
    name: "Basic",
    price: 2499,
    isActive: true,
    features: {
      jobPostLimitPerMonth: 1,
      candidateSlotPerMonth: 50,
      companySpecificQuestionAccess: false,
      feedbackDownloadAccess: false,
      finalInterviewAccess: true,
      interviewRecordingAccess: false,
    }
  },
  {
    name: "Premium",
    price: 5499,
    isActive: true,
    features: {
      jobPostLimitPerMonth: 2,
      candidateSlotPerMonth: 100,
      companySpecificQuestionAccess: false,
      feedbackDownloadAccess: false,
      finalInterviewAccess: true,
      interviewRecordingAccess: false,
    }
  },
  {
    name: "Elite",
    price: 10199,
    isActive: true,
    features: {
      jobPostLimitPerMonth: 15,
      candidateSlotPerMonth: 400,
      companySpecificQuestionAccess: false,
      feedbackDownloadAccess: false,
      finalInterviewAccess: true,
      interviewRecordingAccess: false,
    }
  }
];
