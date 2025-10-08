import { SlotService } from "@/services/SlotService";
import { IInterviewSlot, ISlotGenerationRequest, ISlotGenerationRequestForServer } from "@/types/ISlotTypes";
import { useCallback, useState } from "react";

export const useSlotGeneration = () => {
  const [loading, setLoading] = useState(false);

  const generateSlots = useCallback(
    async (slotGenerationRule: ISlotGenerationRequestForServer) => {
      setLoading(true);

      try {
        const response = await SlotService.generateSlots(slotGenerationRule);
        
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { generateSlots, loading };
};

export const useGetAllSlotsByRule = () => {
  const [loading, setLoading] = useState(false);

  const getSlotsByRule = useCallback(async (interviewerId: string) => {
    setLoading(true);
    try {
      const response = await SlotService.getAllSlotsByRule(interviewerId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getSlotsByRule, loading };
};
export const useGetAllSlotsByInterviewer = () => {
  const [loading, setLoading] = useState(false);

  const getSlotsByInterviewer = useCallback(async (interviewerId: string) => {
    setLoading(true);
    try {
      const response = await SlotService.getAllSlotsByInterviewer(
        interviewerId
      );
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getSlotsByInterviewer, loading };
};
export const useGetInterviewerSlotGenerationRule = () => {
  const [loading, setLoading] = useState(false);

  const getInterviewerSlotGenerationRule = useCallback(
    async (interviewerId: string) => {
      setLoading(true);
      try {
        const response = await SlotService.getInterviewerSlotGenerationRule(
          interviewerId
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { getInterviewerSlotGenerationRule, loading };
};

export const useScheduleInterviewForCandidate = () => {
  const [loading, setLoading] = useState(false);

  const scheduleInterview = useCallback(
    async (payloadForSlotBooking: {
      interviewer: string;
      slot: IInterviewSlot;
      candidate: string;
      job: string;
      isFollowUpScheduling: boolean;
    }) => {
      setLoading(true);
      try {
        const response = await SlotService.scheduleInterviewForCandidate(
          payloadForSlotBooking
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { scheduleInterview, loading };
};

export const useUpdateInterviewerSlotGenerationRule = () => {
  const [loading, setLoading] = useState(false);

  const updateInterviewerSlotGenerationRule = useCallback(
    async (interviewerId: string, ruleData: ISlotGenerationRequestForServer) => {
      setLoading(true);
      try {
        const response = await SlotService.updateInterviewerSlotGenerationRule(
          interviewerId,
          ruleData
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateInterviewerSlotGenerationRule, loading };
};
