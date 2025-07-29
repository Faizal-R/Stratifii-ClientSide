import { SlotService } from "@/services/SlotService";
import { ISlotGenerationRequest } from "@/types/ISlotTypes";
import { useCallback, useState } from "react";

export const useSlotGeneration = () => {
  const [loading, setLoading] = useState(false);

  const generateSlots = useCallback(
    async (slotGenerationRule:ISlotGenerationRequest) => {
      setLoading(true);

      try {
        const response = await SlotService.generateSlots(slotGenerationRule);
        console.log("res", response);
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { generateSlots, loading };
};

export const useGetSlotsByInterviewerId = () => {
  const [loading, setLoading] = useState(false);

  const getSlotsByInterviewerId = useCallback(
    async (interviewerId: string) => {
      setLoading(true);
      try {
        const response = await SlotService.getAllSlotsByInterviewerId(interviewerId);
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { getSlotsByInterviewerId, loading };
};
