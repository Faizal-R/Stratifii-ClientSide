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
        return { success: false, error: error.response?.data.message || "An Error Occured while setting up candidate" };
      }
    }
  },
};
