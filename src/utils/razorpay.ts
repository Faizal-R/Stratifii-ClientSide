import { IRazorpayResponse, RazorpayPaymentError } from "@/types/IRazorpay";
import { toast } from "sonner";



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
  onFailure?: (error:RazorpayPaymentError) => void;
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
    toast("Razorpay SDK failed to load. Are you online?",{
      className:"custom-error-toast"
    });
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
        console.error(err);
        if (onFailure) {
          onFailure(err as RazorpayPaymentError);
        }
      }
    },
    prefill,
    theme: {
      color: "#3399cc",
    },
  };

  const razorpay = new (window as any).Razorpay(options);
  razorpay.open();
};
