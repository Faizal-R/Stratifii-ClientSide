import apiClient from "@/config/apiClient";

import { isAxiosError } from "axios";

export const CompanyService = {
  getCompanyProfile: async () => {
    try {
      const response = await apiClient.get("/company/profile");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
            "An Error occured During Fetching Company Profile",
        };
      }
    }
  },

  updateCompanyProfile: async (company: FormData) => {
    try {
      const response = await apiClient.put("/company/profile", company,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data.message ||
           "An error occurred while updating the company profile. Please try again later."
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Updating Company Profile",
      };
    }
  },

};
