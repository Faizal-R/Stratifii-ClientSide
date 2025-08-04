"use client";
import SlotDisplay from "@/components/features/interviewer/SlotDisplay";
import SlotGeneratorPage from "@/components/features/interviewer/SlotGeneratorPage";
import { useAuthStore } from "@/features/auth/authStore";
import {
  useGetAllSlotsByRule,
} from "@/hooks/api/useSlot";
import { IInterviewSlot } from "@/types/ISlotTypes";

import { Sparkles } from "lucide-react";
import { useState, useEffect, use, useRef } from "react";
import { RiseLoader } from "react-spinners";
import { toast } from "sonner";

const ScheduleManagmentPage = () => {
  const [slots, setSlots] = useState<IInterviewSlot[]>([]);
  const [isShownSlots, setIsShownSlots] = useState<boolean>(false);
  const hasFetched = useRef(false);
  const { user } = useAuthStore();
  const { getSlotsByRule, loading } = useGetAllSlotsByRule();

  function updateSlotsFromChild(newSlots: IInterviewSlot[]) {
    setSlots((prev) => [...prev, ...newSlots]);
  }

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    async function getAllSlotsBasedOnRule() {
      setIsShownSlots(true);
      const response = await getSlotsByRule(user?.id as string);
      console.log(response);
      if (response.success) {
        setSlots(response.data);
      } else {
        toast.error(response.error, {
          className: "custom-toast-error",
        });
      }
    }
    getAllSlotsBasedOnRule();
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <RiseLoader />
    </div>
  ) : (
    <div className="">
      <div className="text-center mb-8  pt-10 flex flex-col items-center justify-center pl-44">
        <div className="flex justify-center mb-4">
          <div
            className="p-3 rounded-full animate-pulse"
            style={{
              background: "rgba(139, 92, 246, 0.2)",
              border: "2px solid rgba(139, 92, 246, 0.4)",
            }}
          >
            <Sparkles className="w-8 h-8 text-violet-300" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
          {!isShownSlots ? "Interview Slot Generator" : "My Interview Slots"}
        </h1>
        <p className="text-gray-300 text-lg">
          {isShownSlots
            ? " View all your upcoming and available interview slots in one place"
            : "Create your perfect interview schedule with intelligent slot generation"}
        </p>
        <button
          onClick={() => setIsShownSlots(!isShownSlots)}
          className="absolute right-5 top-40 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition"
        >
          {isShownSlots ? "+ Generate New Slots" : "See My Slots"}
        </button>
      </div>

      {isShownSlots ? (
        <SlotDisplay slots={slots} />
      ) : (
        <SlotGeneratorPage sendSlotsToParent={updateSlotsFromChild} />
      )}
    </div>
  );
};

export default ScheduleManagmentPage;
