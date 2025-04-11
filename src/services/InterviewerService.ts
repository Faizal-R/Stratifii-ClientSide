import apiClient from "@/config/apiClient";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";
import { isAxiosError } from "axios";

export const InterviewerService = {
  getInterviewerProfile: async () => {
    try {
      const response = await apiClient.get("/interviewer/profile");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
            "An Error occured During Fetching Interviewer Profile",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Fetching Company Profile",
      };
    }
  },

  updateInterviewerProfile: async (interviewer:IInterviewerProfile) => {
    try {
      const response = await apiClient.put("/interviewer/profile", interviewer);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
           "An error occurred while updating the interviewer profile. Please try again later."
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Updating Interviewer Profile",
      };
    }
  },
  setupInterviewerAccount: async (interviewer:IInterviewerProfile,interviewerId:string) => {
    try {
      const response = await apiClient.put("/auth/interviewer/account/setup", {interviewer,interviewerId});
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
           "An error occurred while updating the interviewer profile. Please try again later."
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Updating Interviewer Profile",
      };
    }
  },
  

  
};


