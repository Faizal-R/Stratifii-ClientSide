import apiClient from "@/config/apiClient";
import { IJob } from "@/types/IJob";
import { isAxiosError } from "axios";

export const JobService = {
  getJobs: async () => {
    try {
      const response = await apiClient.get("/company/jobs");
      return response.data;
    } catch (error) {
      if (isAxiosError(error))
        return {
          success: false,
          status: error.status,
          error:
            error.response?.data.message ||
            "Unexpected error occurred While Fetching Jobs",
        };
    }
  },
  getJob: async (jobId: string) => {
    try {
      const response = await apiClient.get(`/company/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error))
        return {
          success: false,
          status: error.status,
          error: "Unexpected error occurred While Fetching Job",
        };
    }
  },

  createJob: async (job: IJob) => {
    try {
      console.log("Creating Job", job);
      const response = await apiClient.post("/company/jobs", job);
      return response.data;
    } catch (error) {
      if (isAxiosError(error))
        return {
          success: false,
          status: error.status,
          error: error.response?.data.message,
        };
    }
  },
  updateJob: async (job: IJob) => {
    try {
      const response = await apiClient.put("/company/jobs", job);
      return response.data;
    } catch (error) {
      if (isAxiosError(error))
        return {
          success: false,
          status: error.status,
          error: "Unexpected error occurred While Updating Job",
        };
    }
  },
  deleteJob: async (id: string) => {
    try {
      const response = await apiClient.delete(`/company/jobs/${id}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error))
        return {
          success: false,
          status: error.status,
          error: "Unexpected error occurred While Deleting Job",
        };
    }
  },

  uploadResumesAndCreateCandidates: async (
    jobId: string,
    resumes: FormData
  ) => {
    try {
      const response = await apiClient.post(
        `/company/jobs/${jobId}/resumes`,
        resumes,
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
          status: error.status,
          error:
            error.response?.data.message ||
            "An Error occured While Uploading Resumes",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Uploading Resumes",
      };
    }
  },

  getCandidatesByJobId: async (jobId: string) => {
    try {
      const response = await apiClient.get(`/company/jobs/${jobId}/candidates`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          status: error.status,
          error: "An Error occurred While Fetching Candidates",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While Fetching Candidates",
      };
    }
  },
};
