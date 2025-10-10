import { PaymentService } from "@/services/PaymentService";
import { IRazorpayResponse } from "@/types/IRazorpay";
import { useCallback, useState } from "react";

export const usePaymentCalculation = function () {
  const [loading, setLoading] = useState(false);

  const paymentCalculation = useCallback(async (candidatesCount: number) => {
    try {
      setLoading(true);
      const response = await PaymentService.calculatePayment(candidatesCount);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, paymentCalculation };
};
export const usePaymentOrderCreation = function () {
  const [loading, setLoading] = useState(false);

  const paymentOrderCreation = useCallback(async (totalAmount: number) => {
    try {
      setLoading(true);
      const response = await PaymentService.createPaymentOrder(totalAmount);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, paymentOrderCreation };
};
export const useHandleInterviewProcessInitializationPayment = function () {
  const [loading, setLoading] = useState(false);

  const handleInterviewProcessInitializationPayment = useCallback(
    async (
      razorpay_response: IRazorpayResponse|null,
      jobId: string,
      candidatesCount: number,
      isPaymentFailed:boolean=false
    ) => {
      try {
        setLoading(true);
        const response =
          await PaymentService.handleInterviewProcessInitializationPayment({
            razorpay_response,
            jobId,
            candidatesCount,
            isPaymentFailed
          });
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, handleInterviewProcessInitializationPayment };
};


export const useHandleRetryInterviewProcessInitializationPayment=function(){
  const [loading, setLoading] = useState(false);
  const handleRetryInterviewProcessInitializationPayment = useCallback(
    async (
      jobId: string,
     
    ) => {
      try {
        setLoading(true);
        
        const response =
          await PaymentService.handleRetryInterviewProcessInitializationPayment(
            jobId,);
        return response
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, handleRetryInterviewProcessInitializationPayment };
}


export const useGetCompanyPaymentHistory=function(){
  const [loading, setLoading] = useState(false);
  const getCompanyPaymentHistory = useCallback(async (companyId: string) => {
    try {
      setLoading(true);
      const response = await PaymentService.getCompanyPaymentHistory(companyId);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);
  return { loading, getCompanyPaymentHistory };
}