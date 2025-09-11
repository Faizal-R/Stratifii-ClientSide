import apiClient from "@/config/apiClient";
import { InterviewRoutes } from "@/constants/routes/api/InterviewRoutes";
import { IInterviewFeedback } from "@/types/IInterview";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const InterviewService = {
  getMockInterviewQuestions: async (delegationId: string) => {
    try {
      const response = await apiClient.get(
        `${InterviewRoutes.GET_MOCK_QUESTIONS}/${delegationId}`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while fetching mock interview questions."
      );
    }
  },

  submitMockResultAndUpdateQualificationStatus: async (
    delegationId: string,
    resultData: {
      percentage: number;
      correct: number;
      total: number;
    }
  ) => {
    try {
      const response = await apiClient.put(InterviewRoutes.SUBMIT_MOCK_RESULT, {
        delegationId,
        resultData,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while submitting mock interview results."
      );
    }
  },
  getAllUpcomingInterviews: async () => {
    try {
      const response = await apiClient.get(
        InterviewRoutes.GET_ALL_UPCOMING_INTERVIEWS
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while fetching upcoming interviews."
      );
    }
  },

  getAllScheduledInterviews: async (candidateId:string) => {
    try {
      const response = await apiClient.get(
       `${InterviewRoutes.GET_ALL_SCHEDULED_INTERVIEWS}/${candidateId}/scheduled-interviews`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while fetching scheduled interviews."
      );
    }
  },
  updateInterviewWithFeedback: async (
    interviewId: string,
    feedback: IInterviewFeedback
  ) => {
    try {
      const response = await apiClient.put(
        `${InterviewRoutes.UPDATE_INTERVIEW_WITH_FEEDBACK}/${interviewId}`,
        { feedback }
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while updating interview with feedback."
      );
    }
  },

 getAllInterviewsByCandidateId: async (candidateId: string) => {
    try {
      const response = await apiClient.get(
        `${InterviewRoutes.GET_ALL_INTERVIEWS_BY_CANDIDATE_ID}/${candidateId}`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while fetching interviews by candidate ID."
      );
    }
  },

 completeCandidateInterviewProcess: async (delegatedCandidateId: string) => {
    try {
      const response = await apiClient.put(
        `${InterviewRoutes.COMPLETE_CANDIDATE_INTERVIEW_PROCESS}/${delegatedCandidateId}`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while completing candidate interview process."
      );
    }
  }

};
