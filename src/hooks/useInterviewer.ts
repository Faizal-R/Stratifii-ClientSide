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

export const useUpadteInterviewerProfile = () => {
  const [loading, setLoading] = useState(false);

  const updateInterviewerProfile = useCallback(
    async ( updatedInterviewer: IInterviewerProfile,) => {
      try {
        setLoading(true);
        const response = await InterviewerService.updateInterviewerProfile(
          updatedInterviewer,
          
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
    async ( updatedInterviewer: IInterviewerProfile,interviewerId:string) => {
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
