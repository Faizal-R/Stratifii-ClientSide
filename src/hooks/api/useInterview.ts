import { InterviewService } from "@/services/InterviewService";
import { IInterviewFeedback } from "@/types/IInterview";
import { useCallback, useState } from "react";

export const useSubmitMockResultAndUpdateQualificationStatus = function () {
  const [loading, setLoading] = useState(false);

  const submitMockResult = useCallback(async (delegationId:string,resultData: {
      percentage: number;
      correct: number;
      total: number;
    }) => {
    try {
      setLoading(true);
      const response = await InterviewService.submitMockResultAndUpdateQualificationStatus(delegationId,resultData);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, submitMockResult };
};


export const useGetAllUpcomingInterviews = function () {
  const [loading, setLoading] = useState(false);
  const getAllUpcomingInterviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await InterviewService.getAllUpcomingInterviews();
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { getAllUpcomingInterviews, loading };
};


export const useUpdateInterviewWithFeedback = function () {
  const [loading, setLoading] = useState(false);
  const updateInterviewWithFeedback = useCallback(async (interviewId:string,feedback:IInterviewFeedback) => {
    try {
      setLoading(true);
      const response = await InterviewService.updateInterviewWithFeedback(interviewId,feedback);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { updateInterviewWithFeedback, loading };
};

export const useGetScheduledInterviews = function () {
  const [loading, setLoading] = useState(false);
  const getAllScheduledInterviews = useCallback(async (candidateId:string) => {
    try {
      setLoading(true);
      const response = await InterviewService.getAllScheduledInterviews(candidateId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { getAllScheduledInterviews, loading };
};



export const useGetAllInterviewsByCandidateId = function () {
  const [loading, setLoading] = useState(false);
  const getAllInterviewsByCandidateId = useCallback(async (candidateId:string) => {
    try {
      setLoading(true);
      const response = await InterviewService.getAllInterviewsByCandidateId(candidateId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { getAllInterviewsByCandidateId, loading };
};

export const useCompleteCandidateInterviewProcess= function () {
  const [loading, setLoading] = useState(false);
  const completeCandidateInterviewProcess = useCallback(async (delegatedCandidateId:string) => {
    try {
      setLoading(true);
      const response = await InterviewService.completeCandidateInterviewProcess(delegatedCandidateId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { completeCandidateInterviewProcess, loading };
}