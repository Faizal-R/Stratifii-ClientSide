import { CandidateService } from "@/services/CandidateService";
import { useCallback, useState } from "react";

export const useSetupCandidateProfile = function () {
  const [loading, setLoading] = useState(false);

  const setupCandidatProfile = useCallback(
    async (candidateCredentials: FormData) => {
      try {
        setLoading(true);
        const response = await CandidateService.setupCandidatePasswordAndAvatar(
          candidateCredentials
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, setupCandidatProfile };
};

export const useGetCandidateProfile = function () {
  const [loading, setLoading] = useState(false);

  const getCandidateProfile = useCallback(async (candidateId: string) => {
    try {
      setLoading(true);
      const response = await CandidateService.getCandidateProfile(candidateId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, getCandidateProfile };
};
export const useGetDelegatedJobs = function () {
  const [loading, setLoading] = useState(false);

  const getDelegatedJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await CandidateService.getDelegatedJobs();
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, getDelegatedJobs };
};
export const useGenerateMockInterviewQuestions = function () {
  const [loading, setLoading] = useState(false);

  const generateMockInterviewQuestions = useCallback(async (delegationId:string) => {
    try {
      setLoading(true);
      const response = await CandidateService.getMockInterviewQuestions(delegationId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, generateMockInterviewQuestions };
};
