import {
  CompanyRegistrationStep1Schema,
  CompanyRegistrationStep2Schema,
} from "@/validations/CompanySchema";
import { ICompanyRegistration } from "@/validations/CompanySchema";
import { IInterviewerRegistration, IInterviewerSchema, InterviewerRegistrationStep1, InterviewerRegistrationStep2, InterviewerRegistrationStep3 } from "@/validations/InterviewerSchema";

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



export const  handleInterviewerRegistrationStep=async (formData:IInterviewerRegistration,step:number)=>{
  switch (step) {
    case 1:
      const validatedInterviewerStep1 =
        await InterviewerRegistrationStep1.safeParse(formData);
      if (validatedInterviewerStep1.success) {
        return { success: true, company: validatedInterviewerStep1.data };
      } else {
        return { success: false, errors: validatedInterviewerStep1.error.issues };
      }
    case 2:
      const validatedInterviewerStep2 =
        await InterviewerRegistrationStep2.safeParse(formData);
      if (validatedInterviewerStep2.success) {
        return { success: true, company: validatedInterviewerStep2.data };
      } else {
        return { success: false, errors: validatedInterviewerStep2.error.issues };
      }
    case 3:
      const validatedInterviewerStep3 =
        await InterviewerRegistrationStep3.safeParse(formData);
      if (validatedInterviewerStep3.success) {
        return { success: true, company: validatedInterviewerStep3.data };
      } else {
        return { success: false, errors: validatedInterviewerStep3.error.issues };
      }

  }
}
