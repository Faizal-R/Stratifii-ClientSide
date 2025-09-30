import apiClient from "@/config/apiClient";
import { IInterviewSlot, ISlotGenerationRequest } from "@/types/ISlotTypes";
import { SlotRoutes } from "@/constants/routes/api/SlotRoutes";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";

export const SlotService = {
  generateSlots: async (slotGenerationRule: ISlotGenerationRequest) => {
    try {
      const response = await apiClient.post(
        SlotRoutes.GENERATE_SLOTS,
        slotGenerationRule
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while generating slots."
      );
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
  getAllSlotsByInterviewer: async (interviewerId: string) => {
    try {
      const response = await apiClient.get(
        `${SlotRoutes.GET_ALL_INTERVIEWER_SLOTS}/${interviewerId}`
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
      return parseAxiosError(
        error,
        "An error occurred while fetching slot generation rule."
      );
    }
  },

  scheduleInterviewForCandidate: async (payloadForSlotBooking: {
    interviewer: string;
    slot: IInterviewSlot;
    candidate: string;
    job: string;
    isFollowUpScheduling: boolean;
  }) => {
    try {
      const response = await apiClient.post(
        SlotRoutes.BOOK_SLOT_FOR_CANDIDATE,
        payloadForSlotBooking
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while booking slot for candidate."
      );
    }
  },

  updateInterviewerSlotGenerationRule: async (interviewerId:string,ruleData:ISlotGenerationRequest)=>{
    try {
      const response = await apiClient.put(
       `${SlotRoutes.UPDATE_INTERVIEWER_SLOT_GENERATION_RULE}/${interviewerId}`,
        ruleData
      );
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred while updating slot generation rule."
      );
    }
  }
};



