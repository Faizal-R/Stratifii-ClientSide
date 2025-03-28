import {
  CompanyRegistrationStep1Schema,
  CompanyRegistrationStep2Schema,
} from "@/validations/CompanySchema";
import { ICompanyRegistration } from "@/validations/CompanySchema";

export const handleCompanyRegistrationStep = async (
  formData: ICompanyRegistration,
  step: number
) => {
  switch (step) {
    case 1:
      const validatedCompanyStep1 =
        await CompanyRegistrationStep1Schema.safeParse(formData);
      if (validatedCompanyStep1.success) {
        return { success: true, company: validatedCompanyStep1.data };
      } else {
        return { success: false, errors: validatedCompanyStep1.error.issues };
      }
    case 2:
      const validatedCompanyStep2 =
        await CompanyRegistrationStep2Schema.safeParse(formData);
      if (validatedCompanyStep2.success) {
        return { success: true, company: validatedCompanyStep2.data };
      } else {
        return { success: false, errors: validatedCompanyStep2.error.issues };
      }

  }
};
