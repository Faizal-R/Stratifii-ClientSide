
import { 
  X, 
  Shield, 
  Users, 
  Brain, 
  Receipt, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { PaymentConfig } from '@/constants/AppPayment';

interface PaymentProceedModalProps {
  isOpen: boolean;
  onClosed: () => void;
  onProceed:(totalAmount:number)=>void
  candidatesCount:number
}

interface Benefit {
  icon: React.ElementType;
  text: string;
  color: string;

}

const PaymentProceedModal: React.FC<PaymentProceedModalProps> = ({ isOpen, onClosed,onProceed,candidatesCount }) => {

  
  const subtotal = candidatesCount * PaymentConfig.RATE_PER_CANDIDATE;

  const platformFeeTotal = PaymentConfig.PLATFORM_FEE;

  const gstAmount = (subtotal + platformFeeTotal) * PaymentConfig.GST_RATE;
  const total = subtotal + platformFeeTotal + gstAmount;

  const benefits: Benefit[] = [
    { icon: Shield, text: 'Enterprise-Grade Security', color: 'text-emerald-500' },
    { icon: Users, text: 'Senior Tech Interviewers', color: 'text-blue-500' },
    { icon: Brain, text: 'AI Assessment Engine', color: 'text-purple-500' },
    { icon: Receipt, text: 'Comprehensive Reports', color: 'text-indigo-500' },
  ];
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl animate-[fadeIn_0.3s_ease-in-out] overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Panel */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-yellow-300" size={24} />
              <h2 className="text-2xl font-bold">Premium Interview Package</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-lg font-semibold mb-2">Whats Included:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-300" />
                    <span>Technical Assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-300" />
                    <span>Behavioral Interview</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-300" />
                    <span>Problem Solving Round</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-300" />
                    <span>System Design Discussion</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-sm text-white/80">Trusted by leading companies</p>
                <p className="text-3xl font-bold mt-2">500+</p>
                <p className="text-sm text-white/80">Successful placements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-3/5 p-8 relative">
          <button 
            onClick={onClosed}
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>

          <div className="max-w-lg mx-auto space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Interview Package Details</h3>
              <p className="text-gray-500">Fixed package for {candidatesCount} candidates</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Candidates</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-sm font-medium">
                    {candidatesCount}
                  </span>
                </div>
                <span className="font-medium text-gray-900">₹ {PaymentConfig.RATE_PER_CANDIDATE.toLocaleString()}/each</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Platform Fee</span>
                    <AlertCircle size={14} className="text-blue-400" />
                  </div>
                  <span className="font-medium">₹ {platformFeeTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹ {gstAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between pt-3 border-t">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="text-xl font-bold text-blue-600">₹ {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {benefits.map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                  <Icon size={18} className={color} />
                  <span className="text-sm text-gray-700">{text}</span>
                </div>
              ))}
            </div>

            <button onClick={()=>onProceed(total)} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-lg shadow-blue-200/50">
              Proceed to Payment
            </button>

            <p className="text-center text-sm text-gray-500">
              Secure payment processing by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PaymentProceedModal;
