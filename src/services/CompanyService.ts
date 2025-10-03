import apiClient from "@/config/apiClient";
import { CompanyRoutes } from "@/constants/routes/api/CompanyRoutes";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { ICompanyProfile } from "@/validations/CompanySchema";

export const CompanyService = {
  getCompanyProfile: async () => {
    try {
      const response = await apiClient.get(CompanyRoutes.PROFILE);
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while fetching company profile"
      );
    }
  },

  updateCompanyProfile: async (company: FormData|ICompanyProfile) => {
    try {
      const response = await apiClient.put(CompanyRoutes.PROFILE, company, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while updating the company profile. Please try again later."
      );
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
      const response = await apiClient.put(CompanyRoutes.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while updating the company password. Please try again later."
      );
    }
  },

  getCompanyDashboard: async () => {
    try {
      const response = await apiClient.get(CompanyRoutes.DASHBOARD);
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while fetching company dashboard data."
      );
    }
  },
};
