import apiClient from "@/config/apiClient";
import { isAxiosError } from "axios";

export const InterviewService = {
  getMockInterviewQuestions: async (delegationId: string) => {
    try {
      const response = await apiClient.get(
        `/candidate/mock-interview/questions/${delegationId}`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error Occured while fetching delegated jobs ",
        };
      }
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
    console.log(resultData)
    try {
      const response = await apiClient.put(
        "candidate/mock-interview/submit-result",
        { delegationId, resultData }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error Occured while fetching delegated jobs ",
        };
      }
    }
  },
};
