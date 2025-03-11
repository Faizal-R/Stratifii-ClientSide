import { z } from "zod";
const statusEnum = z.enum(["pending", "approved", "rejected"]);

export const CompanyProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required").trim(),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .trim(),
  companyWebsite: z.string().url("Invalid Website URL format").trim(),
  registrationCertificateNumber: z
    .string()
    .min(1, "Registration certificate number is required")
    .trim(),
  linkedInProfile: z
    .string()
    .url("Invalid LinkedIn profile URL")
    .trim()
    .optional(),
  phone: z.string().min(1, "Phone number is required"),
  status: statusEnum.optional().default("approved"),
});

export type ICompanyProfile = z.infer<typeof CompanyProfileSchema>;

// Define the Zod schema for ICompany
export const companySchema = z.object({
  companyName: z.string().min(1, "Company name is required").trim(),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .trim(),
  companyWebsite: z.string().url("Invalid URL format").trim(),
  registrationCertificateNumber: z
    .string()
    .min(1, "Registration certificate number is required")
    .trim(),
  linkedInProfile: z
    .string()
    .url("Invalid LinkedIn profile URL")
    .trim()
    .optional(),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyType: z.string().min(1, "Company type is required").trim(), // Array of ObjectIds referencing Candidate
  isVerified: z.boolean().optional().default(false),
  status: statusEnum.optional().default("pending"),
});

// Export TypeScript type inferred from the Zod schema
export type ICompany = z.infer<typeof companySchema>;
