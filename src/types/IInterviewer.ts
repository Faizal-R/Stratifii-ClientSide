


export interface IInterviewer {
  _id?: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  password: string;
  experience: number;
  linkedinProfile: string;
  location?: string;
  languages: {
    language: string;
    level: string;
  }[];
  availableDays: string[];
  professionalSummary: string;
  expertise: string[];
  scheduleInterviews?: [];
  avatar?: string;
  isVerified?: boolean;
  rating?: number;
  reviews?: [];
  status: 'approved' | 'pending' | 'rejected';
  createdAt?: Date;
  isBlocked: boolean;
  resume:string;
}
