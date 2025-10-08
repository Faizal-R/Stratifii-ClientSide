export interface ISlotGenerationRequest {
  availableDays: number[];
 startTime:{
  hour:number,
  minute:number,
  meridian:"AM"|"PM"
 }
 endTime:{
  hour:number,
  minute:number,
   meridian:"AM"|"PM"
 }
 
  slotDuration: number;
  bufferRate: number;
  timezone: string
}
export interface ISlotGenerationRequestForServer {
  interviewerId:string;
  availableDays: number[]; 
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  duration: number;
  buffer: number;
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
