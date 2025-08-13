import { useCallback, useState } from "react";
import { IInterviewerProfile } from "@/validations/InterviewerSchema";
import { InterviewerService } from "@/services/InterviewerService";

export const useFetchInterviewerProfile = () => {
  const [loading, setLoading] = useState(false);

  const interviewerProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await InterviewerService.getInterviewerProfile();
      console.log("res", response);
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
    async ( updatedInterviewer: IInterviewerProfile,avatar?: string) => {
      try {
        setLoading(true);
        const response = await InterviewerService.updateInterviewerProfile(
          updatedInterviewer,
          avatar
          
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