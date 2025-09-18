import React, { useState } from "react";
import { Calendar, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { IInterviewSlot } from "@/types/ISlotTypes";
import { formatDate } from "@/utils/slotCalculator";
import SlotCard from "@/components/features/common/SlotCard";

interface SlotDisplayProps {
  slots: IInterviewSlot[];
}

const SlotDisplay: React.FC<SlotDisplayProps> = ({ slots }) => {
  const [filter, setFilter] = useState<"all" | "booked" | "available">("all");

  // Apply filter
  const displayedSlots =
    filter === "all" ? slots : slots.filter((slot) => slot.status === filter);

  if (displayedSlots.length === 0) {
    return null;
  }

  // Group slots by date
  const groupedSlots = displayedSlots.reduce((acc, slot) => {
    const date = new Date(slot.startTime).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, IInterviewSlot[]>);

  const sortedDates = Object.keys(groupedSlots).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Stats
  const totalSlots = slots.length;
  const availableSlots = slots.filter(
    (slot) => slot.status === "available"
  ).length;
  const bookedSlots = slots.filter((slot) => slot.status === "booked").length;
  const availabilityRate = Math.round((availableSlots / totalSlots) * 100);

  return (
    <div className="mt-8 space-y-6 ml-64 px-8  pb-3 bg-gradient-to-br  from-black via-black to-violet-950">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total */}
        <div
          className={`p-4 rounded-lg text-center ${
            filter === "all" ? "ring-2 ring-violet-400" : ""
          }`}
          onClick={() => setFilter("all")}
          style={{
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            cursor: "pointer",
          }}
        >
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-violet-300">{totalSlots}</div>
          <div className="text-xs text-violet-400">Total Slots</div>
        </div>

        {/* Available */}
        <div
          className={`p-4 rounded-lg text-center ${
            filter === "available" ? "ring-2 ring-emerald-400" : ""
          }`}
          onClick={() =>
            setFilter(filter === "available" ? "all" : "available")
          }
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            cursor: "pointer",
          }}
        >
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-300">
            {availableSlots}
          </div>
          <div className="text-xs text-emerald-400">Available</div>
        </div>

        {/* Booked */}
        <div
          className={`p-4 rounded-lg text-center ${
            filter === "booked" ? "ring-2 ring-red-400" : ""
          } ${
            bookedSlots === 0
              ? "opacity-50 pointer-events-none"
              : "cursor-pointer"
          }`}
          onClick={() =>
            bookedSlots > 0 && setFilter(filter === "booked" ? "all" : "booked")
          }
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
          }}
        >
          <div className="flex items-center justify-center mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-300">{bookedSlots}</div>
          <div className="text-xs text-red-400">Booked</div>
        </div>

        {/* Availability rate */}
        <div
          className="p-4 rounded-lg text-center"
          style={{
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
          }}
        >
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-300">
            {availabilityRate}%
          </div>
          <div className="text-xs text-amber-400">Available</div>
        </div>
      </div>

      {/* Slots by Date */}
      <div className="space-y-6 h-full">
        {sortedDates.map((date) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: "rgba(139, 92, 246, 0.2)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                }}
              >
                <Calendar className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {formatDate(groupedSlots[date][0].startTime)}
                </h3>
                <p className="text-sm text-gray-400">
                  {groupedSlots[date].length} slots scheduled
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedSlots[date].map((slot, index) => (
                <SlotCard
                  key={slot._id || `${date}-${index}`}
                  slot={slot}
                  index={index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotDisplay;
