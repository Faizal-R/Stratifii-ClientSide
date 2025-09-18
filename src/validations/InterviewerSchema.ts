import { z } from "zod";

// Enums
export const SkillProficiencyLevels = ["beginner", "intermediate", "advanced", "expert"] as const;
export const SkillSources = ["professional", "academic", "personal", "certification"] as const;

// Skill Expertise Schema
export const SkillExpertiseSchema = z.object({
  skill: z.string().min(1, "Skill name is required"),
  proficiencyLevel: z.enum(SkillProficiencyLevels, {
    errorMap: () => ({ message: "Invalid proficiency level" }),
  }),
  yearsOfExperience: z.number().min(0, "Experience must be a positive number").optional(),
  skillSource: z
    .array(z.enum(SkillSources))
    .min(1, "At least one skill source is required"),
});

export const bankDetailsSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  ifsc: z.string().min(1, "IFSC code is required"),
  accountHolderName: z.string().min(1, "Account holder name is required"),
  upiId: z.string().optional(),
  addedAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Main Interviewer Profile Schema
export const InterviewerProfileSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Invalid phone number"),
  experience: z.number().min(0, "Experience must be a positive number"),
  linkedinProfile: z.string().url("Invalid LinkedIn profile URL"),
  avatar: z.string().url("Invalid avatar URL").or(z.null()).optional(),
  rating: z.number().min(0).max(5).optional(),
  status: z.enum(["approved", "pending", "rejected"]),
  isVerified: z.boolean().optional(),
  resume: z
    .custom<File | string | null>((file) => {
      return typeof file === "string" || file instanceof File || file === null;
    }, {
      message: "Invalid resume file",
    })
    .optional(),

  // ✅ Use structured expertise schema
  expertise: z
    .array(SkillExpertiseSchema)
    .min(1, "At least one expertise is required"),
    isBlocked: z.boolean().optional(),
    createdAt: z.string().optional(),
  stripeAccountId: z.string().optional(),
    bankDetails:bankDetailsSchema.optional(),
    resubmissionPeriod:z.string().optional(),
    resubmissionNote:z.string().optional()
});

// Type export
export type IInterviewerProfile = z.infer<typeof InterviewerProfileSchema>;
export type ISkillExpertise = z.infer<typeof SkillExpertiseSchema>;
export type IBankDetails = z.infer<typeof bankDetailsSchema>;
