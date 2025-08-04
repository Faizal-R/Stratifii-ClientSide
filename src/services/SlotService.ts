import apiClient from "@/config/apiClient";
import { ISlotGenerationRequest } from "@/types/ISlotTypes";
import { SlotRoutes } from "@/constants/routes/api/SlotRoutes";
import { parseAxiosError } from "@/utils/parseAxiosError";

export const SlotService = {
  generateSlots: async (slotGenerationRule: ISlotGenerationRequest) => {
    try {
      const response = await apiClient.post(
        SlotRoutes.GENERATE_SLOTS,
        slotGenerationRule
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while generating slots.");
    }
  },

  getAllSlotsByRule: async (interviewerId: string) => {
    try {
      const response = await apiClient.get(
        `${SlotRoutes.GET_INTERVIEWER_SLOTS}/${interviewerId}`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while fetching slots.");
    }
  },

  getInterviewerSlotGenerationRule: async (interviewerId: string) => {
    try {
      const response = await apiClient.get(
        `${SlotRoutes.GET_INTERVIEWER_SLOT_GENERATION_RULE}/${interviewerId}`
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred while fetching slot generation rule.");
    }
  },
};
