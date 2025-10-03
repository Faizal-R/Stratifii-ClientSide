import apiClient from "@/config/apiClient";
import { AdminRoutes } from "@/constants/routes/api/AdminRoutes";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const AdminService = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/admin/signin", { email, password });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred during login");
    }
  },

  getCompanies: async (status: string) => {
    try {
      const response = await apiClient.get(`${AdminRoutes.GET_COMPANIES}${status}`);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while fetching companies");
    }
  },

  updateCompany: async (companyId: string) => {
    try {
      const response = await apiClient.patch(AdminRoutes.UPDATE_COMPANY_STATUS, { companyId });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while updating company status");
    }
  },

  getInterviewers: async (status: string) => {
    try {
      const response = await apiClient.get(`${AdminRoutes.GET_INTERVIEWERS}${status}`);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while fetching interviewers");
    }
  },

  updateInterviewer: async (interviewerId: string) => {
    try {
      const response = await apiClient.patch(AdminRoutes.UPDATE_INTERVIEWER_STATUS, {
        interviewerId,
      });
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while updating interviewer status");
    }
  },

  handleCompanyVerification: async (companyId: string, isApproved: boolean,reasonForRejection?: string,isPermanentBan?:boolean) => {
    try {
      const response = await apiClient.patch(
        `${AdminRoutes.UPDATE_COMPANY_STATUS}/${companyId}/verify`,
        { isApproved,reasonForRejection,isPermanentBan }
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred during company verification");
    }
  },

  handleInterviewerVerification: async (
    interviewerId: string,
    isApproved: boolean,
    interviewerName: string,
    interviewerEmail: string,
    reasonForRejection?: string,
    isPermanentBan?:boolean
  ) => {
    try {
      const response = await apiClient.patch(
        `${AdminRoutes.UPDATE_INTERVIEWER_STATUS}/${interviewerId}/verify`,
        {
          isApproved,
          interviewerName,
          interviewerEmail,
          reasonForRejection,
          isPermanentBan
        }
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred during interviewer verification");
    }
  },

   getAdminDashboard: async () => {
    try {
      const response = await apiClient.get(AdminRoutes.GET_DASHBOARD);
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while fetching company dashboard data."
      );
    }
  },
};
