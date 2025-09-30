import {
  X,
  Shield,
  Users,
  Brain,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { PaymentConfig } from "@/constants/enums/AppPayment";
import { RiseLoader } from "react-spinners";

interface PaymentProceedModalProps {
  isOpen: boolean;
  onClosed: () => void;
  onProceed: (totalAmount: number) => void;
  candidatesCount: number;
  paymentLoading?: boolean;
}

interface Benefit {
  icon: React.ElementType;
  text: string;
  color: string;
}

const PaymentProceedModal: React.FC<PaymentProceedModalProps> = ({
  isOpen,
  onClosed,
  onProceed,
  candidatesCount,
  paymentLoading,
}) => {
  const subtotal = candidatesCount * PaymentConfig.RATE_PER_CANDIDATE;
  const platformFeeTotal = PaymentConfig.PLATFORM_FEE;
  const gstAmount = (subtotal + platformFeeTotal) * PaymentConfig.GST_RATE;
  const total = subtotal + platformFeeTotal + gstAmount;

  const benefits: Benefit[] = [
    {
      icon: Shield,
      text: "Enterprise-Grade Security",
      color: "text-emerald-400",
    },
    { icon: Users, text: "Senior Tech Interviewers", color: "text-cyan-400" },
    { icon: Brain, text: "AI Assessment Engine", color: "text-purple-400" },
    { icon: Receipt, text: "Comprehensive Reports", color: "text-violet-400" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50 p-4 ">
      <div className="bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10 w-full max-w-4xl animate-[fadeIn_0.3s_ease-in-out] overflow-hidden">
        <div className="flex flex-col md:flex-row h-full border border-violet-500/20">
          {/* Left Panel */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(139,69,199,0.3),transparent)] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-yellow-300 animate-pulse" size={24} />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                  Premium Interview Package
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                  <p className="text-lg font-semibold mb-2 text-violet-100">What's Included:</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-300" />
                      <span className="text-white/90">Technical Assessment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-300" />
                      <span className="text-white/90">AI Mock Interview</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-300" />
                      <span className="text-white/90">Problem Solving Round</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-green-300" />
                      <span className="text-white/90">System Design Discussion</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl p-4 backdrop-blur-sm border border-violet-300/30">
                  <p className="text-sm text-violet-200">
                    Trusted by leading companies
                  </p>
                  <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">500+</p>
                  <p className="text-sm text-violet-200">Successful placements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-3/5 p-8 relative">
            <button
              onClick={onClosed}
              className="absolute right-6 top-6 text-violet-300 hover:text-white transition p-2 hover:bg-violet-500/20 rounded-full border border-transparent hover:border-violet-400/30"
            >
              <X size={20} />
            </button>

            <div className="max-w-lg mx-auto space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Interview Package Details
                </h3>
                <p className="text-violet-300">
                  Fixed package for {candidatesCount} candidates
                </p>
              </div>

              <div className="bg-gradient-to-br from-violet-900/30 to-black/50 rounded-2xl p-6 space-y-4 border border-violet-500/30">
                <div className="flex justify-between items-center pb-3 border-b border-violet-400/20">
                  <div className="flex items-center gap-2">
                    <span className="text-violet-100">Candidates</span>
                    <span className="bg-violet-600/40 text-violet-300 px-2 py-0.5 rounded-full text-sm font-medium border border-violet-400/30">
                      {candidatesCount}
                    </span>
                  </div>
                  <span className="font-medium text-white">
                    ₹ {PaymentConfig.RATE_PER_CANDIDATE.toLocaleString()}/each
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-violet-300">Subtotal</span>
                    <span className="font-medium text-white">
                      ₹ {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-violet-300">Platform Fee</span>
                      <AlertCircle size={14} className="text-cyan-400" />
                    </div>
                    <span className="font-medium text-white">
                      ₹ {platformFeeTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-violet-300">GST({PaymentConfig.GST_RATE*100}%)</span>
                    <span className="font-medium text-white">
                      ₹ {gstAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-3 border-t border-violet-400/20">
                  <span className="font-semibold text-white">
                    Total Amount
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    ₹ {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {benefits.map(({ icon: Icon, text, color }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 bg-gradient-to-br from-violet-800/30 to-black/40 p-3 rounded-xl border border-violet-500/20 hover:border-violet-400/40 transition-all duration-200"
                  >
                    <Icon size={18} className={color} />
                    <span className="text-sm text-violet-100">{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onProceed(total)}
                disabled={paymentLoading}
                className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white py-4 rounded-2xl hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg shadow-violet-500/30 border border-violet-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {paymentLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <RiseLoader color="#ffffff" size={8} />
                    {/* <span>Processing...</span> */}
                  </div>
                ) : (
                  "Proceed to Payment"
                )}
              </button>

              <p className="text-center text-sm text-violet-400">
                🔒 Secure payment processing by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProceedModal;