import React from 'react';
import { Calendar, Clock, Users, TrendingUp, CheckCircle, XCircle,Sparkles } from 'lucide-react';
import { IInterviewSlot } from '@/types/ISlotTypes';
import { formatDate } from '@/utils/slotCalculator';
import SlotCard from '@/components/features/common/SlotCard';

interface SlotDisplayProps {
  slots: IInterviewSlot[];
  
}

const SlotDisplay: React.FC<SlotDisplayProps> = ({ slots }) => {
  if (slots.length === 0) {
    return null;
  }

  // Group slots by date
  const groupedSlots = slots.reduce((acc, slot) => {
    const date = new Date(slot.startTime).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, IInterviewSlot[]>);

  const sortedDates = Object.keys(groupedSlots).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  const totalSlots = slots.length;
  const availableSlots = slots.filter(slot => slot.status === 'available').length;
  const bookedSlots = slots.filter(slot => slot.status === 'booked').length;
  const availabilityRate = Math.round((availableSlots / totalSlots) * 100);

  return (
    <div className="mt-8 space-y-6 ml-64 px-8 bg-gradient-to-br from-black via-black to-violet-950 pb-3">
        {/* <div className="text-center mb-8">
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
    My Interview Slots
  </h1>
  <p className="text-gray-300 text-lg">
    View all your upcoming and available interview slots in one place
  </p>
<button
  // onClick={}
  className="absolute right-5 top-40 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition"
>
  + Generate New Slots
</button>

</div> */}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className="p-4 rounded-lg text-center"
          style={{
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
          }}
        >
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-violet-300">{totalSlots}</div>
          <div className="text-xs text-violet-400">Total Slots</div>
        </div>

        <div
          className="p-4 rounded-lg text-center"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        >
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-300">{availableSlots}</div>
          <div className="text-xs text-emerald-400">Available</div>
        </div>

        <div
          className="p-4 rounded-lg text-center"
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
          <div className="text-2xl font-bold text-amber-300">{availabilityRate}%</div>
          <div className="text-xs text-amber-400">Available</div>
        </div>
      </div>

      {/* Slots by Date */}
      <div className="space-y-6">
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
                <SlotCard key={slot._id} slot={slot} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotDisplay;