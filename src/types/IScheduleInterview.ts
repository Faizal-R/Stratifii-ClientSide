import { ICandidate, IDelegatedCandidate } from "./ICandidate";
import { IInterviewer } from "./IInterviewer";
import { IJob } from "./IJob";

export interface IInterviewSlot {
  _id: string;
  interviewerId: string; // ObjectId
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  isAvailable: boolean;
  status: 'available' | 'booked' | 'completed' | 'cancelled' | 'expired';
  bookedBy?: string | null; // Company ObjectId
  meetingLink?: string;
  ruleId?: string; // ObjectId
  createdAt: Date;
  updatedAt: Date;
}

export interface ICandidateWithStatus extends ICandidate {
  delegationStatus: IDelegatedCandidate['status'];
  mockScore?: number;
  isQualifiedForFinal: boolean;
  scheduledInterview?: {
    interviewerId: string;
    scheduledTime: Date;
    timeZone?: string;
  };
}

export interface IInterviewerWithSlots extends IInterviewer {
  availableSlots: IInterviewSlot[];
}

export interface IJobWithCounts extends IJob {
  candidateCount: number;
  interviewerCount: number;
  qualifiedCandidateCount: number;
}