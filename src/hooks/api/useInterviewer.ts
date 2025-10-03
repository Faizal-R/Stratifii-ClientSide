import { useCallback, useState } from "react";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";
import { InterviewerService } from "@/services/InterviewerService";
import { IBankDetails } from "@/validations/InterviewerSchema";

export const useFetchInterviewerProfile = () => {
  const [loading, setLoading] = useState(false);

  const interviewerProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await InterviewerService.getInterviewerProfile();
      
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { interviewerProfile, loading };
};

export const useUpdateInterviewerProfile = () => {
  const [loading, setLoading] = useState(false);

  const updateInterviewerProfile = useCallback(
    async ( updatedInterviewer: IInterviewerProfile,avatar?: string,resume?: string|null) => {
      try {
        setLoading(true);
        const response = await InterviewerService.updateInterviewerProfile(
          updatedInterviewer,
          avatar,
          resume
          
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateInterviewerProfile, loading };
};

export const useSetupInterviewerAccount = () => {
  const [loading, setLoading] = useState(false);

  const setupInterviewerAccount = useCallback(
    async ( updatedInterviewer: any,interviewerId:string) => {
      try {
        setLoading(true);
        const response = await InterviewerService.setupInterviewerAccount(
          updatedInterviewer,
          interviewerId
          
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { setupInterviewerAccount, loading };
};


export const useChangeInterviewerPassword = () => {
  const [loading, setLoading] = useState(false);
  const changeInterviewerPassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      try {
        setLoading(true);
        const response = await InterviewerService.changeInterviewerPassword(
          {
            currentPassword,
            newPassword,
          }
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { changeInterviewerPassword, loading };
};

export const useAddBankDetails = () => {
  const [loading, setLoading] = useState(false);
  const addBankDetails = useCallback(
    async (bankDetails: IBankDetails) => {
      try {
        setLoading(true);
        const response = await InterviewerService.addBankDetails(bankDetails);
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { addBankDetails, loading };
}

export const useUpdateBankDetails = () => {
  const [loading, setLoading] = useState(false);
  const updateBankDetails = useCallback(
    async (bankDetails: IBankDetails) => {
      try {
        setLoading(true);
        const response = await InterviewerService.updateBankDetails(bankDetails);
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { updateBankDetails, loading };
}

export const useGetInterviewerWallet = () => {
  const [loading, setLoading] = useState(false);
  const getInterviewerWallet = useCallback(
    async () => {
      try {
        setLoading(true);
        const response = await InterviewerService.getInterviewerWallet();
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return { getInterviewerWallet, loading };
}