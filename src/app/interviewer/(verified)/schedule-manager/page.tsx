"use client";
import SlotDisplay from "@/components/features/interviewer/SlotDisplay";
import SlotGeneratorPage from "@/components/features/interviewer/SlotGeneratorPage";
import { useAuthStore } from "@/features/auth/authStore";
import { useGetSlotsByInterviewerId } from "@/hooks/api/useSlot";
import { IInterviewSlot } from "@/types/ISlotTypes";
import { get } from "http";
import { Sparkles } from "lucide-react";
import { useState, useEffect, use } from "react";
import { RiseLoader } from "react-spinners";
import { toast } from "sonner";

const ScheduleManagmentPage = () => {
  const [slots, setSlots] = useState<IInterviewSlot[]>([]);
  const [isShownSlots, setIsShownSlots] = useState<boolean>(false);
  const { user } = useAuthStore();
  const { getSlotsByInterviewerId, loading } = useGetSlotsByInterviewerId();
  function updateSlotsFromChild(newSlots: IInterviewSlot[]) {
    setSlots((prev) => [...prev, ...newSlots]);
  }
  async function getAllSlotsFromServer() {
    const response = await getSlotsByInterviewerId(user?.id as string);
    if (response.success) {
      setSlots(response.data);
      setIsShownSlots(true);
    } else {
      toast.error(response.error, {
        className: "custom-toast-error",
      });
    }
  }

  useEffect(() => {
    getAllSlotsFromServer();
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
