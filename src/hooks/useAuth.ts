import { useState, useCallback } from "react";
import AuthService from "../services/AuthService";
import { IInterviewer } from "@/types/IInterviewer";
import { ICompany } from "@/types/ICompany";
import { IInterviewerSchema } from "@/validations/InterviewerSchema";

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(
    async ({
      email,
      password,
      role,
    }: {
      email: string;
      password: string;
      role: string;
    }) => {
      setLoading(true);

      try {
        const response = await AuthService.signIn(email, password, role);
        console.log("res", response);
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { signIn, loading };
};

export const useCompanyRegister = () => {
  const [loading, setLoading] = useState(false);

  const registerCompany = useCallback(async (company: ICompany) => {
    setLoading(true);
    try {
      const response = await AuthService.companyRegister(company);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { registerCompany, loading };
};

export const useInterviewerRegister = () => {
  const [loading, setLoading] = useState(false);
  const registerInterviewer = useCallback(async (interviewer: IInterviewerSchema) => {
    setLoading(true);
    try {
      const response = await AuthService.interviewerRegister(interviewer);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { registerInterviewer, loading };
};

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);

  const verifyOtp = useCallback(
    async ({
      otp,
      email,
      role,
    }: {
      otp: string;
      email: string;
      role: string;
    }) => {
      setLoading(true);
      try {
        const response = await AuthService.verifyOtp(otp, email, role);
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { verifyOtp, loading };
};

export const useTriggerOtpResend = () => {
  const [loading, setLoading] = useState(false);

  const resendOtp = useCallback(async (email: string) => {
    try {
      setLoading(true);
      const response = await AuthService.triggerOtpResend(email);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { resendOtp, loading };
};

export const useSendForgotPasswordOtpRequest = () => {
  const [loading, setLoading] = useState(false);
  const sendForgotPasswordOtpRequest = useCallback(
    async (email: string, role: string) => {
      try {
        setLoading(true);
        const response = await AuthService.sendForgotPasswordOtpRequest(
          email,
          role
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, sendForgotPasswordOtpRequest };
};

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const resetPassword = useCallback(
    async (
      newPassword: string,
      newConfirmPassword: string,
      token: string
    ) => {
      try {
        setLoading(true);
        const response = await AuthService.resetPassword(
          newPassword,
          newConfirmPassword,
          token
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { resetPassword, loading };
};
