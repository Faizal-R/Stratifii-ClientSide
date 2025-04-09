import apiClient from "@/config/apiClient";
import { isAxiosError } from "axios";

export const AdminService = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/admin/signin", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("axios", error);
        return {
          success: false,
          error:
            error.response?.data?.message || "An error occurred during login",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While SignIn",
      };
    }
  },

  getCompanies: async function (status: string) {
    try {
      const response = await apiClient.get(`/admin/companies?status=${status}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error occured During Fetching Companies",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Fetching Companies",
      };
    }
  },

  updateCompany: async function (companyId: string) {
    try {
      const response = await apiClient.patch("/admin/companies", { companyId });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error occured During Updating Companies",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Updating Companies",
      };
    }
  },

  getInterviewers: async function (status: string) {
    try {
      const response = await apiClient.get(
        `/admin/interviewers?status=${status}`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error occured During Fetching Interviewers",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Fetching Interviewers",
      };
    }
  },
  updateInterviewer: async function (interviewerId: string) {
    try {
      const response = await apiClient.patch("/admin/interviewers", {
        interviewerId,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error occured During Updating Interviewer",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Updating Interviewer",
      };
    }
  },

  handleCompanyVerification: async (companyId: string, isApproved: boolean) => {
    try {
      const response = await apiClient.patch(
        `/admin/companies/${companyId}/verify`,
        {
          isApproved,
        }
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error occured During Company Verification",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Company Verification",
      };
    }
  },
  handleInterviewerVerification: async (interviewerId: string, isApproved: boolean) => {
    try {
      const response = await apiClient.patch(
        `/admin/interviewers/${interviewerId}/verify`,
        {
          isApproved,
        }
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "An Error occured During Interviewer Verification",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Interviewer Verification",
      };
    }
  },
};
