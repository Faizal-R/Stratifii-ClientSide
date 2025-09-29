import { IRazorpayResponse, RazorpayPaymentError } from "@/types/IRazorpay";
import { toast } from "sonner";
import { errorToast } from "./customToast";

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface RazorpayConfig {
  amount: number;
  orderId: string;
  name: string;
  description: string;
  image?: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  onSuccess: (response: IRazorpayResponse) => Promise<void>;
  onFailure?: () => void; // Remove error parameter since you don't need it
}

export const initiateRazorpayPayment = async ({
  amount,
  orderId,
  name,
  description,
  image,
  prefill,
  onSuccess,
  onFailure,
}: RazorpayConfig) => {
  const isScriptLoaded = await loadRazorpayScript();

  if (!isScriptLoaded) {
    errorToast("Razorpay SDK failed to load. Are you online?")
    return;
  }

  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  const options = {
    key: razorpayKey,
    amount,
    currency: "INR",
    name,
    description,
    image,
    order_id: orderId,
    handler: async (response: IRazorpayResponse) => {
      try {
        await onSuccess(response);
      } catch (err) {
        errorToast("razorpay")
      }
    },
    modal: {
      ondismiss:async function() {
        // Handle when user closes the modal without paying
        if (onFailure) {
          await onFailure();
        }
      }
    },
    prefill,
    theme: {
      color: "#3399cc",
    },
  };

  const razorpay = new (window as any).Razorpay(options);

  // REMOVE THIS ENTIRE EVENT HANDLER - it's causing the double calls
  // razorpay.on("payment.failed", async(error: RazorpayPaymentError) => {
  //   console.error("Payment Failed:", error);
  //   if (onFailure) {
  //     await onFailure(error);
  //   } else {
  //     errorToast("Payment failed. Please try again.")
  //   }
  // });

  razorpay.open();
};