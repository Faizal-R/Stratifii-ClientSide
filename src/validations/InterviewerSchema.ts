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
  availableDays: z
    .array(z.string())
    .min(1, "At least one available day is required"),
    availability: z
    .array(
      z.object({
        day: z.string(),
        timeSlot: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
          })
        ),
      })
    )
    .optional(),
  professionalSummary: z.string().min(1, "Professional summary is required"),
  expertise: z.array(z.string()).min(1, "At least one expertise is required"),
  avatar: z.string().url("Invalid avatar URL").optional(),
  rating: z.number().min(0).max(5).optional(),
  status: z.enum(["approved", "pending", "rejected"]),
  isVerified: z.boolean().optional(),
});

const statusEnum = z.enum(["pending", "approved", "rejected"])
;
export const interviewerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  position: z.string().min(2, "Position must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  experience: z.number().min(0, "Experience cannot be negative"),
  linkedinProfile: z.string().url("Invalid LinkedIn profile URL"),
  location: z.string().optional(),
  language: z.record(z.string(), z.string()), // Accepts an object { language: proficiency }
  availableDays: z
    .array(z.string())
    .nonempty("At least one available day is required"),
  availability: z
    .array(
      z.object({
        day: z.string(),
        timeSlot: z.array(
          z.object({
            startTime: z.string(),
            endTime: z.string(),
          })
        ),
      })
    )
    .optional(),
  isBlocked: z.boolean().optional(),
  professionalSummary: z
    .string()
    .min(10, "Professional summary must be at least 10 characters"),
  expertise: z
    .array(z.string())
    .nonempty("At least one expertise area is required"),
  scheduleInterviews: z.array(z.string()).optional(), // Array of ObjectIds (strings)
  avatar: z.string().optional(),
  isVerified: z.boolean().default(false),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.array(z.string()).optional(), // Array of ObjectIds (strings)
  status: statusEnum.default("pending"),
});


export const InterviewerRegistrationSchema=z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  linkedinProfile: z.string().url("Invalid LinkedIn profile URL"),
  position: z.string().min(2, "Position must be at least 2 characters long"),
  experience: z.number().min(0, "Experience cannot be negative"),
  professionalSummary: z
    .string()
    .min(10, "Professional summary must be at least 10 characters"),
    language: z.record(z.string(), z.string()),
  expertise: z
  .array(z.string()).min(1, "At least one expertise area is required"),
  
  availableDays: z.array(z.string())
  
  
})

export const InterviewerRegistrationStep1=z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  linkedinProfile: z.string().url("Invalid LinkedIn profile URL"),
  
})
export const GoogleAuthInterviewerRegistrationStep1=z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  linkedinProfile: z.string().url("Invalid LinkedIn profile URL"),
  
})


export const InterviewerRegistrationStep2=z.object({
  position: z.string().min(2, "Position must be at least 2 characters long"),
  experience: z.number().gt(0, "Experience must be more that 3 years").nonnegative("Experience cannot be negative"),
  professionalSummary: z
    .string()
    .min(10, "Professional summary must be at least 10 characters"),

})

export const InterviewerRegistrationStep3=z.object({
  language: z.record(z.string(), z.string()),
  expertise: z
  .array(z.string())
  .nonempty("At least one expertise area is required"),
  availableDays: z
  .array(z.string())
  .nonempty("At least one available day is required"),
})

export type IInterviewerRegistration=z.infer<typeof InterviewerRegistrationSchema>
export type IInterviewerRegistrationStep1=z.infer<typeof InterviewerRegistrationStep1>
export type IInterviewerRegistrationStep2=z.infer<typeof InterviewerRegistrationStep2>
export type IInterviewerRegistrationStep3=z.infer<typeof InterviewerRegistrationStep3>

export type IInterviewerSchema = z.infer<typeof interviewerSchema>;
export type IInterviewerProfile = z.infer<typeof InterviewerProfileSchema>;



