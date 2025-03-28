import { AdminService } from "@/services/AdminService";
import { useCallback, useState } from "react";

export const useAdminSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);

      try {
        const response = await AdminService.signIn(email, password);
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

export const useAdminCompany = () => {
  const [loading, setLoading] = useState(false);
  const companies = useCallback(async (status:string) => {
    setLoading(true);

    try {
      const response = await AdminService.getCompanies(status);
      console.log("res", response);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { companies, loading };
};

export const useAdminCompanyUpdate = () => {
  const [loading, setLoading] = useState(false);
  const updateCompany = useCallback(async (companyId:string) => {
    setLoading(true);
    try {
      const response = await AdminService.updateCompany(companyId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateCompany, loading };
};


export const useAdminInterviewers = () => {
  const [loading, setLoading] = useState(false);
  const fetchInterviewers = useCallback(async (status:string) => {
    setLoading(true);

    try {
      const response = await AdminService.getInterviewers(status);
      console.log("res", response);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { fetchInterviewers, loading };
};

export const useInterviewerUpdate = () => {
  const [loading, setLoading] = useState(false);
  const updatedInterviewer = useCallback(async (interviewerId:string) => {
    setLoading(true);
    try {
      const response = await AdminService.updateInterviewer(interviewerId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updatedInterviewer, loading };
};


export const useHandleCompanyVerification=()=>{
  const [loading, setLoading] = useState(false);
  const verifyOrRejectCompany = useCallback(async (companyId:string,isApproved:boolean) => {
    setLoading(true);
    try {
      const response = await AdminService.handleCompanyVerification(companyId,isApproved);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { verifyOrRejectCompany, loading };
}
export const useHandleInterveiwerVerification=()=>{
  const [loading, setLoading] = useState(false);
  const verifyOrRejectInterviewer = useCallback(async (interviewerId:string,isApproved:boolean) => {
    setLoading(true);
    try {
      const response = await AdminService.handleInterviewerVerification(interviewerId,isApproved);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { verifyOrRejectInterviewer, loading };
}