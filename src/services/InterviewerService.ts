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
setupInterviewerAccount: async (interviewer: IInterviewerProfile, interviewerId: string) => {
  try {
    const formData = new FormData();
    const { resume} = interviewer;
    console.log(resume)
      if (resume instanceof File) {
    formData.append("resume", resume);
  }


    // Create a new object that includes interviewer and interviewerId
    const payload = {
      interviewer,
      interviewerId
    };
    console.log("payload", payload);

    // Append the JSON payload as a string to the FormData
    formData.append("data", JSON.stringify(payload));

    const response = await apiClient.put(
      "/auth/interviewer/account/setup",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        status: error.status,
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

  changeCompanyPassword: async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const response = await apiClient.put("/interviewer/change-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status: error.status,
          error:
            error.response?.data.message ||
            "An error occurred while updating the company password. Please try again later.",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Updating Company Password",
      };
    }
  },

  

  
};


