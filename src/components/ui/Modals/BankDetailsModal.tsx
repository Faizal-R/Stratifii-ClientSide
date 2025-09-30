"use client";

import { IBankDetails } from "@/validations/InterviewerSchema";
import { Banknote, X } from "lucide-react";
import { useState, useEffect } from "react";
import { RiseLoader } from "react-spinners";

interface BankDetailsModalProps {
  onClose: () => void;
  onSave: (details: IBankDetails) => void;
  initialValues?: IBankDetails|null;
  loading?: boolean; // optional for update case
}

const BankDetailsModal: React.FC<BankDetailsModalProps> = ({
  onClose,
  onSave,
  initialValues,
  loading,
}) => {
  const [form, setForm] = useState<IBankDetails>({
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    upiId: "",
  });

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10 p-8 max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center">
              <Banknote className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {initialValues ? "Update Bank Details" : "Add Bank Account"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={form.accountHolderName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
              placeholder="Enter account holder name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
              placeholder="Enter account number"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifsc"
              value={form.ifsc}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
              placeholder="Enter IFSC code"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              UPI ID (Optional)
            </label>
            <input
              type="text"
              name="upiId"
              value={form.upiId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
              placeholder="example@upi"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-xl transition-all duration-200 border border-gray-700/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-violet-500/25"
            >
              {loading ? (
                <RiseLoader color="#ffffff" size={10} />
              ) : initialValues ? (
                "Update Details"
              ) : (
                "Save Bank Details"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankDetailsModal;
