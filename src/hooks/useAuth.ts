import { useState, useCallback } from "react";
import AuthService from "../services/AuthService";
import { IInterviewer } from "@/types/IInterviewer";
import { ICompany } from "@/types/ICompany";

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(
    async ({ email, password, role }: { email: string; password: string; role: string }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await AuthService.signIn(email, password, role);
        window.location.href = `/${role}/`; // Redirect after successful login
        return response;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Sign-in error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { signIn, loading, error };
};

export const useCompanyRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerCompany = useCallback(async (company:ICompany) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthService.companyRegister(company);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Company registration error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { registerCompany, loading, error };
};

export const useInterviewerRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerInterviewer = useCallback(async (interviewer:IInterviewer) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthService.interviewerRegister(interviewer);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Interviewer registration error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { registerInterviewer, loading, error };
};

export const useSendVerificationCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sendVerificationCode = useCallback(async (email: string, role: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthService.sendOtpVerificiationCode(email, role);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("OTP verification error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendVerificationCode, loading, error };
};
