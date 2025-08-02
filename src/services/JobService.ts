import apiClient from "@/config/apiClient";
import { IJob } from "@/types/IJob";
import { isAxiosError } from "axios";
import { JobRoutes } from "@/constants/routes/api/JobRoutes";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const JobService = {
  getJobs: async () => {
    try {
      const response = await apiClient.get(JobRoutes.BASE);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Fetching Jobs");
    }
  },

  getInProgressJobs: async () => {
    try {
      const response = await apiClient.get(JobRoutes.IN_PROGRESS);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Fetching In-Progress Jobs");
    }
  },

  getJob: async (jobId: string) => {
    try {
      const response = await apiClient.get(`${JobRoutes.SINGLE}/${jobId}`);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Fetching Single Job");
    }
  },

  createJob: async (job: IJob) => {
    try {
      const response = await apiClient.post(JobRoutes.BASE, job);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Creating Job");
    }
  },

  updateJob: async (job: IJob) => {
    try {
      const response = await apiClient.put(JobRoutes.BASE, job);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Updating Job");
    }
  },

  deleteJob: async (id: string) => {
    try {
      const response = await apiClient.delete(`${JobRoutes.SINGLE}/${id}`);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Deleting Job");
    }
  },

  uploadResumesAndCreateCandidates: async (
    jobId: string,
    resumes: FormData
  ) => {
    try {
      const response = await apiClient.post(
        `${JobRoutes.UPLOAD_RESUMES}/${jobId}/resumes`,
        resumes,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Uploading Resumes");
    }
  },

  getCandidatesByJobId: async (jobId: string) => {
    try {
      const response = await apiClient.get(
        `${JobRoutes.CANDIDATES}/${jobId}/candidates`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Fetching Candidates");
    }
  },

  getQualifiedCandidatesByJobId: async (jobId: string) => {
    try {
      const response = await apiClient.get(
        `${JobRoutes.QUALIFIED_CANDIDATES}/${jobId}/qualified-candidates`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Fetching Qualified Candidates");
    }
  },

  getMatchedInterviewersByJobDescription: async (jobId: string) => {
    try {
      const response = await apiClient.get(
        `${JobRoutes.MATCHED_INTERVIEWERS}/${jobId}/matched-interviewers`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "Fetching Matched Interviewers");
    }
  },
};
