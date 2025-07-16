import apiClient from "@/config/apiClient";
import { isAxiosError } from "axios";

export const CandidateService = {
  setupCandidatePasswordAndAvatar: async (candidateCredentials: FormData) => {
    try {
      const response = await apiClient.post(
        `/candidate/setup`,
        candidateCredentials,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error Occured while setting up candidate",
        };
      }
    }
  },

  getCandidateProfile: async (candidateId: string) => {
    try {
      const response = await apiClient.get(`/candidate/profile/${candidateId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error Occured while fetching candidate profile",
        };
      }
    }
  },
  getDelegatedJobs: async () => {
    try {
      const response = await apiClient.get("/candidate/delegated-jobs");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error Occured while fetching delegated jobs "
        };
      }
    }
  },

  getMockInterviewQuestions: async (delegationId:string) => {
    try {
      const response = await apiClient.get(`/candidate/mock-interview/questions/${delegationId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error Occured while fetching delegated jobs "
        };
      }
    }
  },
};
