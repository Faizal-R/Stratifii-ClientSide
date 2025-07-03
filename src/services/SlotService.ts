import apiClient from "@/config/apiClient";
import { isAxiosError } from "axios";
import { ISlotGenerationRequest } from "@/types/ISlotTypes";

export const SlotService = {
    generateSlots: async (slotGenerationRule:ISlotGenerationRequest) => {
        try {
            const response = await apiClient.post(`/interviewer/generate-slots`,slotGenerationRule );
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                return {
                    success: false,
                    status: error.status,
                    error: error.response?.data.message || "An error occurred while generating slots.",
                };
            }
            return {
                success: false,
                error: "Unexpected error occurred while generating slots.",
            };
        }
    },
    getAllSlotsByInterviewerId: async (interviewerId: string) => {
        try {
            const response = await apiClient.get(`/interviewer/slots/${interviewerId}`);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log("error", error);
                return {
                    success: false,
                    status: error.status,
                    error: error.response?.data.message || "An error occurred while fetching slots.",
                };
            }
            return {
                success: false,
                error: "Unexpected error occurred while fetching slots.",
            };
        }
    }


}