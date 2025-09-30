import { IndianRupee, Loader2, Banknote } from "lucide-react";

interface IPayoutModalProps {
  onClose: () => void;
  currentBalance: number;
  onSendPayoutRequest: () => void;
  handleOnChangePayoutAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  payoutAmount: number;
  isLoading?: boolean;
  bankDetails?: {
    type: "bank" | "vpa";
    accountNumber?: string;
    ifsc?: string;
    bankName?: string;
    vpa?: string;
  };
}

const PayoutModal: React.FC<IPayoutModalProps> = ({
  onClose,
  currentBalance,
  onSendPayoutRequest,
  handleOnChangePayoutAmount,
  payoutAmount,
  isLoading = false,
  bankDetails,
}) => {
  const isValidAmount =
    payoutAmount > 0 && payoutAmount <= currentBalance && payoutAmount >= 100; 

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <IndianRupee className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Request Payout</h3>
          <p className="text-gray-400">
            Enter the amount you want to withdraw from your wallet
          </p>
        </div>

        {/* Current Balance */}
        <div className="bg-gray-800/50 rounded-xl p-4 mb-4 border border-gray-700/30">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Available Balance</span>
            <span className="text-2xl font-bold text-violet-400">
              ₹{currentBalance}
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 text-sm">
            Payout Amount
          </label>
          <input
            type="number"
            value={payoutAmount || ""}
            onChange={handleOnChangePayoutAmount}
            min={100}
            max={currentBalance}
            placeholder="Enter amount"
            className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700/50 
                       focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Min ₹100, Max ₹{currentBalance}
          </p>
          {!isValidAmount && payoutAmount > 0 && (
            <p className="text-xs text-red-400 mt-1">
              Please enter a valid amount.
            </p>
          )}
        </div>

        {/* Bank Details Preview */}
        {bankDetails && (
          <div className="bg-gray-800/50 rounded-xl p-4 mb-4 border border-gray-700/30">
            <div className="flex items-center gap-2 mb-2">
              <Banknote className="w-4 h-4 text-violet-400" />
              <span className="text-gray-300 font-medium">Payout Account</span>
            </div>
            {bankDetails.type === "bank" ? (
              <div className="text-sm text-gray-400 space-y-1">
                <p>Bank: {bankDetails.bankName}</p>
                <p>Account: ****{bankDetails.accountNumber?.slice(-4)}</p>
                <p>IFSC: {bankDetails.ifsc}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                UPI: {bankDetails.vpa}
              </p>
            )}
            <p className="text-xs text-violet-400 mt-2 cursor-pointer hover:underline">
              Change payout details in Profile
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mb-6">
          Note: Payouts are processed within 24 hours after admin
          approval.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 px-4 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-xl transition-all duration-200 border border-gray-700/50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onSendPayoutRequest}
            disabled={!isValidAmount || isLoading}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 
                       hover:from-violet-700 hover:to-purple-700 text-white rounded-xl 
                       transition-all duration-200 font-semibold shadow-lg shadow-violet-500/25
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Request"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayoutModal;
