import apiClient from "@/config/apiClient";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";
import { InterviewerRoutes } from "@/constants/routes/api/InterviewerRoutes";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { convertBlobUrlToFile } from "@/utils/fileConversion";
import { ApiResponse } from "@/types/api/ApiResponse";

export const InterviewerService = {
  getInterviewerProfile: async ():Promise<ApiResponse<IInterviewerProfile>>=> {
    try {
      const response = await apiClient.get(InterviewerRoutes.PROFILE);
      return response.data;
    } catch (error) {
       return parseAxiosError(
        error,
        "An error occurred while fetching interviewer profile"
      );
    }
  },

  updateInterviewerProfile: async (
    interviewer: IInterviewerProfile,
    avatar?: string,
    resume?: string|null,
  ) => {
    const formData = new FormData();
    try {
      if (avatar) {
        const avatarFile = await convertBlobUrlToFile(avatar);
        formData.append("avatar", avatarFile!);
      }
      if(resume) {
        const resumeFile = await convertBlobUrlToFile(resume);
        formData.append("resume", resumeFile!);
      }
      formData.append("interviewer", JSON.stringify(interviewer));
      const response = await apiClient.put(
        InterviewerRoutes.PROFILE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while updating the interviewer profile. Please try again later."
      );
    }
  },

  setupInterviewerAccount: async (
    interviewer: IInterviewerProfile,
    interviewerId: string
  ) => {
    try {
      const formData = new FormData();
      const { resume } = interviewer;

      if (resume instanceof File) {
        formData.append("resume", resume);
      }

      const payload = {
        interviewer,
        interviewerId,
      };

      formData.append("data", JSON.stringify(payload));

      const response = await apiClient.put(
        InterviewerRoutes.ACCOUNT_SETUP,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while setting up interviewer account"
      );
    }
  },

  changeInterviewerPassword: async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const response = await apiClient.put(InterviewerRoutes.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while updating the interviewer password. Please try again later."
      );
    }
  },
};
