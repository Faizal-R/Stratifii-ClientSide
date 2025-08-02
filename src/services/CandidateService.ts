import apiClient from "@/config/apiClient";
import { CandidateRoutes } from "@/constants/routes/api/CandidateRoutes";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const CandidateService = {
  setupCandidatePasswordAndAvatar: async (candidateCredentials: FormData) => {
    try {
      const response = await apiClient.post(
        CandidateRoutes.SETUP,
        candidateCredentials,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while setting up candidate");
    }
  },

  getCandidateProfile: async (candidateId: string) => {
    try {
      const response = await apiClient.get(
        `${CandidateRoutes.PROFILE}/${candidateId}`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while fetching candidate profile");
    }
  },

  getDelegatedJobs: async () => {
    try {
      const response = await apiClient.get(CandidateRoutes.DELEGATED_JOBS);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while fetching delegated jobs");
    }
  },

  getMockInterviewQuestions: async (delegationId: string) => {
    try {
      const response = await apiClient.get(
        `${CandidateRoutes.MOCK_INTERVIEW_QUESTIONS}/${delegationId}`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while fetching mock interview questions"
      );
    }
  },
};
