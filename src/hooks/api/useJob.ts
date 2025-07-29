import { JobService } from "@/services/JobService";
import { IJob } from "@/types/IJob";
import { useCallback, useState } from "react";
export const useCreateJob = function () {
  const [loading, setLoading] = useState(false);
  const createJob = useCallback(
    async (
      position: string,
      description: string,
      deadline: Date,
      experienceRequired: number,
      requiredSkills: string[],
      interviewDuration: number
    ) => {
      try {
        setLoading(true);
        const response = await JobService.createJob({
          position,
          deadline,
          experienceRequired,
          requiredSkills,
          description,
          interviewDuration,
        });
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createJob, loading };
};

export const useGetJobs = function () {
  const [loading, setLoading] = useState(false);
  const getJobs = useCallback(async (status?:string) => {
    try {
      setLoading(true);
      const response = await JobService.getJobs(status);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { getJobs, loading };
};

export const useUpdateJob = function () {
  const [loading, setLoading] = useState(false);
  const updateJob = useCallback(async (job: IJob) => {
    try {
      setLoading(true);
      const response = await JobService.updateJob(job);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, updateJob };
};

export const useDeleteJob = function () {
  const [loading, setLoading] = useState(false);

  const deleteJob = useCallback(async (jobId: string) => {
    try {
      setLoading(true);
      const response = await JobService.deleteJob(jobId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, deleteJob };
};
export const useUploadResumesAndCreateCandidates = function () {
  const [loading, setLoading] = useState(false);

  const uploadResumesAndCreateCandidates = useCallback(
    async (jobId: string, files: FormData) => {
      try {
        setLoading(true);
        const response = await JobService.uploadResumesAndCreateCandidates(
          jobId,
          files
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, uploadResumesAndCreateCandidates };
};
export const useGetCandidatesByJob = function () {
  const [loading, setLoading] = useState(false);

  const getCandidatesByJob = useCallback(async (jobId: string) => {
    try {
      setLoading(true);
      const response = await JobService.getCandidatesByJobId(jobId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, getCandidatesByJob };
};

