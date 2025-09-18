import { PayoutService } from "@/services/PayoutService";
import { useCallback, useState } from "react";

export const useCreatePayoutRequest = () => {
  const [loading, setLoading] = useState(false);
  const createPayoutRequest = useCallback(
    async (amount:number,interviewerName:string) => {
      try {
        setLoading(true);
        const response = await PayoutService.createPayoutRequest(
         amount,
         interviewerName
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createPayoutRequest, loading };
};

export const useGetAllInterviewersPayoutRequest = () => {
  const [loading, setLoading] = useState(false);
  const getAllInterviewersPayoutRequest = useCallback(async () => {
    try {
      setLoading(true);
      const response = await PayoutService.getAllInterviewersPayoutRequests();
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { getAllInterviewersPayoutRequest, loading };
};