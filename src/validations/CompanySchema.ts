import { z } from "zod";
const statusEnum = z.enum(["pending", "approved", "rejected"]);

export const CompanyProfileSchema = z.object({
  _id: z.string().optional(),
  password: z.string().optional(),
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
  companyType: z.string().optional(),
  description: z.string().optional(),
  numberOfEmployees: z.string().optional(),
  headquartersLocation: z.string().optional(),
  companySize: z.string().optional(),
  companyLogo: z.string().optional(),
  isVerified: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  activePlan: z.string().nullable().optional(),
  usage: z
    .object({
      jobPostsThisMonth: z.number().nonnegative().default(0),
      candidatesAddedThisMonth: z.number().nonnegative().default(0),
    })
    .optional(),
});

export type ICompanyProfile = z.infer<typeof CompanyProfileSchema>;

// Define the Zod schema for ICompany
export const companySchema = z.object({
  _id: z.string().optional(),
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
  createdAt: z.date(),
  isBlocked: z.boolean(),
  description: z.string().optional(),
});

export type ICompany = z.infer<typeof companySchema>;

export const CompanyRegistrationSchema = z.object({
  companyName: z.string().min(3, "Company name must be at least 3 characters."),
  companyWebsite: z.string().url("Invalid website URL."),
  registrationCertificateNumber: z
    .string()
    .min(5, "Registration Certificate Number must be at least 5 characters."),
  companyType: z.string().min(1, "Company type is required"),

  email: z.string().min(1, "Email is required").email("Invalid email format."),
  linkedInProfile: z
    .string()
    .min(1, "LinkedIn Url is required")
    .url("Invalid LinkedIn URL."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number must not exceed 15 digits."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one digit.")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character."
    ),
});

export type ICompanyRegistration = z.infer<typeof CompanyRegistrationSchema>;

export const CompanyRegistrationStep1Schema = z.object({
  companyName: z.string().min(3, "Company name must be at least 3 characters."),
  companyWebsite: z.string().url("Invalid website URL."),
  registrationCertificateNumber: z
    .string()
    .min(5, "Registration Certificate Number must be at least 5 characters."),
  companyType: z.string().min(1, "Company type is required"),
});

export const CompanyRegistrationStep2Schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format."),
  linkedInProfile: z
    .string()
    .min(1, "LinkedIn Url is required")
    .url("Invalid LinkedIn URL."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number must not exceed 15 digits."),
});

export const CompanyRegistrationStep3Schema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one digit.")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character."
    ),
});
