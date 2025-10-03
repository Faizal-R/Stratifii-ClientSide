"use client";
import SlotDisplay from "@/components/features/interviewer/slot/SlotDisplay";
import SlotGeneratorPage from "@/components/features/interviewer/slot/SlotGeneratorPage";
import { useAuthStore } from "@/features/auth/authStore";
import { Plus, RefreshCw, Eye } from "lucide-react";
import { useGetAllSlotsByRule } from "@/hooks/api/useSlot";
import { IInterviewSlot } from "@/types/ISlotTypes";

import { Sparkles } from "lucide-react";
import { useState, useEffect, use, useRef } from "react";
import { RiseLoader } from "react-spinners";

import { errorToast } from "@/utils/customToast";

const ScheduleManagmentPage = () => {
  const [slots, setSlots] = useState<IInterviewSlot[]>([]);
  const [isShownSlots, setIsShownSlots] = useState<boolean>(false);
  const hasFetched = useRef(false);
  const { user } = useAuthStore();
  const { getSlotsByRule, loading } = useGetAllSlotsByRule();

  function updateSlotsFromChild(newSlots: IInterviewSlot[]) {
    setSlots(newSlots);
    setIsShownSlots(true);
  }

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    async function getAllSlotsBasedOnRule() {
      const response = await getSlotsByRule(user?.id as string);
      
      if (response.success) {
        setSlots(response.data);
        if (response.data.length > 0) {
          setIsShownSlots(true);
        }
      } else {
        errorToast(response.message);
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
      <div className="text-center mb-8  pt-10 flex flex-col items-center justify-center ">
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
          className="absolute right-5 top-40 flex items-center gap-2 px-3 py-1.5 text-sm font-medium 
             bg-violet-600 text-white rounded-lg shadow-sm hover:bg-violet-700 
             transition-all duration-200"
        >
          {isShownSlots ? (
            slots.length > 0 ? (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Update Slots</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Generate Slots</span>
              </>
            )
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>View Slots</span>
            </>
          )}
        </button>
      </div>

      {isShownSlots ? (
        <SlotDisplay slots={slots} />
      ) : (
        <SlotGeneratorPage sendSlotsToParent={updateSlotsFromChild}  />
      )}
    </div>
  );
};

export default ScheduleManagmentPage;
