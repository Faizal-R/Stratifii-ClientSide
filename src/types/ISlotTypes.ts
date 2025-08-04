export interface ISlotGenerationRequest {
  availableDays: number[];
  startHour: number;
  endHour: number;
  slotDuration: number;
  bufferRate: number|string|undefined;
  timezone?: string;
}

export interface SlotPreview {
  totalSlots: number;
  daysCount: number;
  hoursPerDay: number;
  slotsPerDay: number;
  bufferTime: number;
  // effectiveSlots: number;
}

export interface FormErrors {
  availableDays?: string;
  startHour?: string;
  endHour?: string;
  slotDuration?: string;
  bufferRate?: string;
  general?: string;
}



export interface IInterviewSlot {
  _id: string;
  interviewerId: string;
  startTime: string;
  endTime: string;
  duration: number;
  isAvailable: boolean;
  status: 'available' | 'booked' | 'completed' | 'cancelled' | 'expired';
  bookedBy?: string | null;
  meetingLink?: string;
  ruleId?: string;
  createdAt: string;
  updatedAt: string;
}
