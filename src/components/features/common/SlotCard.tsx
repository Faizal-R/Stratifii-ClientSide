import React from 'react';
import { Clock, Calendar, Users, Check, X } from 'lucide-react';
import { IInterviewSlot } from '@/types/ISlotTypes';
import { formatTime, formatDate, getDateString } from '@/utils/slotCalculator';

interface SlotCardProps {
  slot: IInterviewSlot;
  index: number;
}

const SlotCard: React.FC<SlotCardProps> = ({ slot, index }) => {
  const isBooked = slot.status === 'booked';
  const startTime = formatTime(slot.startTime);
  const endTime = formatTime(slot.endTime);
  const dateString = getDateString(slot.startTime);
  
  return (
    <div
      className={`
        p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg
        border backdrop-blur-sm
        ${isBooked 
          ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/15' 
          : 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/15'
        }
      `}
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'slideInUp 0.6s ease-out forwards'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`
            p-1.5 rounded-full
            ${isBooked ? 'bg-red-500/20' : 'bg-emerald-500/20'}
          `}>
            {isBooked ? (
              <X className="w-3 h-3 text-red-400" />
            ) : (
              <Check className="w-3 h-3 text-emerald-400" />
            )}
          </div>
          <span className={`
            text-xs font-medium px-2 py-1 rounded-full
            ${isBooked 
              ? 'bg-red-500/20 text-red-300' 
              : 'bg-emerald-500/20 text-emerald-300'
            }
          `}>
            {isBooked ? 'Booked' : 'Available'}
          </span>
        </div>
        <div className="text-xs text-gray-400">
          {dateString}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-white">
          <Clock className="w-4 h-4 mr-2 text-violet-400" />
          <span className="text-sm font-medium">
            {startTime} - {endTime}
          </span>
        </div>
        
        <div className="flex items-center text-gray-300">
          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
          <span className="text-xs">
            {slot.duration} minutes
          </span>
        </div>
        
        {isBooked && (
          <div className="flex items-center text-gray-300">
            <Users className="w-4 h-4 mr-2 text-orange-400" />
            <span className="text-xs">
              Reserved
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotCard;