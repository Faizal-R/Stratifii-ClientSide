import { ISlotGenerationRequest, SlotPreview } from '@/types/ISlotTypes';

export function calculateSlotPreview(request: ISlotGenerationRequest): SlotPreview {
  const fromDate = new Date(request.fromDate);
  const toDate = new Date(request.toDate);
  
  // Calculate number of days in range
  const timeDiff = toDate.getTime() - fromDate.getTime();
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  
  // Count available days in the date range
  let availableDaysCount = 0;
  const currentDate = new Date(fromDate);
  
  for (let i = 0; i < totalDays; i++) {
    const dayOfWeek = currentDate.getDay();
    if (request.availableDays.includes(dayOfWeek)) {
      availableDaysCount++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Calculate slots per day
  const hoursPerDay = request.endHour - request.startHour;
  const minutesPerDay = hoursPerDay * 60;
  const totalSlotDuration = request.slotDuration + request.bufferRate;
  const slotsPerDay = Math.floor(minutesPerDay / totalSlotDuration);
  
  // Calculate total slots
  const totalSlots = availableDaysCount * slotsPerDay;
  const bufferTime = request.bufferRate;
  const effectiveSlots = totalSlots;
  
  return {
    totalSlots,
    daysCount: availableDaysCount,
    hoursPerDay,
    slotsPerDay,
    bufferTime,
    effectiveSlots
  };
}

export function validateSlotRequest(request: ISlotGenerationRequest): string[] {
  const errors: string[] = [];
  
  const fromDate = new Date(request.fromDate);
  const toDate = new Date(request.toDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (fromDate < today) {
    errors.push('From date cannot be in the past');
  }
  
  if (fromDate > toDate) {
    errors.push('From date must be before or equal to To date');
  }
  
  if (request.availableDays.length === 0) {
    errors.push('Please select at least one available day');
  }
  
  if (request.startHour >= request.endHour) {
    errors.push('Start hour must be before end hour');
  }
  
  if (request.slotDuration <= 0 || request.slotDuration > 480) {
    errors.push('Slot duration must be between 1 and 480 minutes');
  }
  
  if (request.bufferRate < 0 || request.bufferRate > 120) {
    errors.push('Buffer rate must be between 0 and 120 minutes');
  }
  
  const hoursPerDay = request.endHour - request.startHour;
  const minutesPerDay = hoursPerDay * 60;
  const totalSlotDuration = request.slotDuration + request.bufferRate;
  
  if (totalSlotDuration > minutesPerDay) {
    errors.push('Slot duration plus buffer time cannot exceed daily available time');
  }
  
  return errors;
}

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