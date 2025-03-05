type Availability = {
    date?: string; // Format: "YYYY-MM-DD"
    day: string;
    timeSlot: string[];
  };
  

export interface IInterviewer{
    name: string;
    position: string;
    email: string;
    phone: string;
    password:string;
    experience: number;
    linkedinProfile: string;
    duration?: number;
    location?: string;
    language: Record<string, string>;
    availableDays:string[];
    availability?:Availability[];
    professionalSummary: string;
    expertise: string[];
    scheduleInterviews?: [];
    avatar?: string;
    isVerified?: boolean;
    rating?: number;
    reviews?: [];
  }
  