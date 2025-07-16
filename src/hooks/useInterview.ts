import { InterviewService } from "@/services/InterviewService";
import { useCallback, useState } from "react";

export const useSubmitMockResultAndUpdateQualificationStatus = function () {
  const [loading, setLoading] = useState(false);

  const submitMockResult = useCallback(async (delegationId:string,resultData: {
      percentage: number;
      correct: number;
      total: number;
    }) => {
    try {
      setLoading(true);
      const response = await InterviewService.submitMockResultAndUpdateQualificationStatus(delegationId,resultData);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, submitMockResult };
};