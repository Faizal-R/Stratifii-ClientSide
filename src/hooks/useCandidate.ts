import { CandidateService } from "@/services/CandidateService";
import { useCallback, useState } from "react";

export const useSetupCandidateProfile = function () {
  const [loading, setLoading] = useState(false);

  const setupCandidatProfile = useCallback(async (candidateCredentials: FormData) => {
    try {
      setLoading(true);
      const response = await CandidateService.setupCandidatePasswordAndAvatar(candidateCredentials);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

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