// src/validations/authSchema.ts
import * as z from "zod";
import { SkillExpertiseSchema } from "./InterviewerSchema";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>; 



const statusEnum = z.enum(["pending", "approved", "rejected"]);

export const InterviewerRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  linkedinProfile: z.string().url("Invalid LinkedIn profile URL"),
  position: z.string().min(2, "Position must be at least 2 characters long"),
  experience: z.number().min(0, "Experience cannot be negative"),
  expertise: z
    .array(SkillExpertiseSchema)
    .min(1, "At least one expertise area is required"),

  resume: z
    .custom<File | null>((file) => file instanceof File, {
      message: "Resume file is required",
    }),
  status: statusEnum.default("pending").optional(),
  isVerified: z.boolean().optional(),
});




export const InterviewerRegistrationStep1 = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  linkedinProfile: z.string().url("Invalid LinkedIn profile URL"),
});



export const GoogleAuthInterviewerRegistrationStep1 = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  linkedinProfile: z.string().url("Invalid LinkedIn profile URL"),
});

export const InterviewerRegistrationStep2 = z.object({
  position: z.string().min(2, "Position must be at least 2 characters long"),
  experience: z
    .number()
    .gt(0, "Experience must be more that 3 years")
    .nonnegative("Experience cannot be negative"),
    resume: z
  .custom<File>((file) => file instanceof File, {
    message: "Resume file is required",
  }),
});

export const InterviewerRegistrationStep3 = z.object({

 expertise: z
    .array(SkillExpertiseSchema)
    .nonempty("At least one expertise area is required"),
 
});

export type IInterviewerRegistrationStep1 = z.infer<
  typeof InterviewerRegistrationStep1
>;
export type IInterviewerRegistrationStep2 = z.infer<
  typeof InterviewerRegistrationStep2
>;
export type IInterviewerRegistrationStep3 = z.infer<
  typeof InterviewerRegistrationStep3
>;



export type IInterviewerRegistration = z.infer<
  typeof InterviewerRegistrationSchema
>;
