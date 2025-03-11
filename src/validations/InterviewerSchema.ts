import { z } from "zod";

export const InterviewerProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Invalid phone number"),
  experience: z.number().min(0, "Experience must be a positive number"),
  linkedinProfile: z.string().url("Invalid LinkedIn profile URL"),
  duration: z.number().optional(),
  location: z.string().optional(),
  language: z.record(z.string(), z.string()), // Key-value pair of languages
  availableDays: z.array(z.string()).min(1, "At least one available day is required"),
  professionalSummary: z.string().min(1, "Professional summary is required"),
  expertise: z.array(z.string()).min(1, "At least one expertise is required"),
  avatar: z.string().url("Invalid avatar URL").optional(),
  rating: z.number().min(0).max(5).optional(),
  status: z.enum(["approved", "pending", "rejected"]),
});



export type IInterviewerProfile = z.infer<typeof InterviewerProfileSchema>;