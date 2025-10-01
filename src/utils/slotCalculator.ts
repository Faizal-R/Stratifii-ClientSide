

export function calculateSlotPreview({
  availableDays,
  startHour,
  endHour,
  slotDuration,
  bufferRate = 15
}: {
  availableDays: number[];
  startHour: number;
  endHour: number;
  slotDuration: number;
  bufferRate?: number;
}) {
  // Calculate daily available time in minutes
  const hoursPerDay = endHour - startHour;
  const minutesPerDay = hoursPerDay * 60;

  // Total time per slot
  const totalSlotDuration = slotDuration + bufferRate;

  // Slots per day
  const slotsPerDay = Math.floor(minutesPerDay / totalSlotDuration);

  return {
    slotsPerDay,
    daysCount: availableDays.length,
    totalSlots: availableDays.length * slotsPerDay,
    bufferTime: bufferRate,
    hoursPerDay,
  };
}


// export function validateSlotRequest(request: ISlotGenerationRequest): string[] {
//   const errors: string[] = [];
  
//   const fromDate = new Date(request.fromDate);
//   const toDate = new Date(request.toDate);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
  
//   if (fromDate < today) {
//     errors.push('From date cannot be in the past');
//   }
  
//   if (fromDate > toDate) {
//     errors.push('From date must be before or equal to To date');
//   }
  
//   if (request.availableDays.length === 0) {
//     errors.push('Please select at least one available day');
//   }
  
//   if (request.startHour >= request.endHour) {
//     errors.push('Start hour must be before end hour');
//   }
  
//   if (request.slotDuration <= 0 || request.slotDuration > 480) {
//     errors.push('Slot duration must be between 1 and 480 minutes');
//   }
  
//   if (request.bufferRate < 0 || request.bufferRate > 120) {
//     errors.push('Buffer rate must be between 0 and 120 minutes');
//   }
  
//   const hoursPerDay = request.endHour - request.startHour;
//   const minutesPerDay = hoursPerDay * 60;
//   const totalSlotDuration = request.slotDuration + request.bufferRate;
  
//   if (totalSlotDuration > minutesPerDay) {
//     errors.push('Slot duration plus buffer time cannot exceed daily available time');
//   }
  
//   return errors;
// }

export const formatTime = (date: string): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getDateString = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};