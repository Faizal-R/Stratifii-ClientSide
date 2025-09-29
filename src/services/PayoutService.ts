import apiClient from "@/config/apiClient";
import { PayoutRoutes } from "@/constants/routes/api/PayoutRoutes";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const PayoutService = {
  async createPayoutRequest(amount: number,interviewerName:string) {
    try {
      const response = await apiClient.post(
        PayoutRoutes.CREATE_PAYOUT_REQUEST,
        { amount ,interviewerName}
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while creating the payout request."
      );
    }
  },
  getAllInterviewersPayoutRequests: async () => {
    try {
      const response = await apiClient.get(
        PayoutRoutes.GET_INTERVIEWER_PAYOUT_REQUESTS
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while fetching payout requests."
      );
    }
  },
 updateInterviewerPayoutStatus:async(payoutRequestId:string,status:string)=>{
   try {
     const response = await apiClient.patch(
       `${PayoutRoutes.UPDATE_INTERVIEWER_PAYOUT_REQUEST_STATUS}${payoutRequestId}`,
       {status}
     );
     return response.data;
   } catch (error) {
     return parseAxiosError(
       error,
       "An error occurred while approving the payout request."
     );
   }
 }

};
