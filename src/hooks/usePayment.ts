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
export const usePaymentVerificationAndCreatePaymentRecord = function () {
  const [loading, setLoading] = useState(false);

  const paymentVerificationAndCreatePaymentRecord = useCallback(
    async (
      razorpay_response: IRazorpayResponse,
      jobId: string,
      candidatesCount: number
    ) => {
      try {
        setLoading(true);
        const response =
          await PaymentService.verifyPaymentAndCreatePaymentRecord({
            razorpay_response,
            jobId,
            candidatesCount,
          });
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, paymentVerificationAndCreatePaymentRecord };
};
