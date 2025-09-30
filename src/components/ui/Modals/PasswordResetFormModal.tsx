import { useState, ChangeEvent } from "react";

interface IPasswordRestFormModalProps {
  role: string;
  userId: string;
  
  onClose: () => void;
  handleSubmit: (state: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => void;
}
import { Input } from "../FormFields/FormInput";
import { errorToast } from "@/utils/customToast";
import { X ,Lock} from "lucide-react";

export default function PasswordResetFormModal({
  onClose,
  handleSubmit,
}: IPasswordRestFormModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!formData.currentPassword.trim() || !formData.newPassword.trim() || !formData.confirmNewPassword.trim()) {
      errorToast("All fields are required. Please make sure no field is left empty.");
      return
    }

    if (formData.newPassword === formData.currentPassword) {
      errorToast("New Password should not be same as Current Password!");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      errorToast("New Password and Confirm New Password must be same!");
      return;
    }
    await handleSubmit(formData);
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    onClose();
  };

 

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10 p-8 max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-violet-500/20 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-violet-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Reset Password
            </h2>
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
          onSubmit={handleOnSubmit}
          className="space-y-4"
        >
          <Input
            name="currentPassword"
            label="Current password"
            type="password"
            value={formData.currentPassword}
            onChange={(val) => handleChange("currentPassword", val)}
            className={'w-full px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500'}
          />

          <Input
            name="newPassword"
            label="New password"
            type="password"
            value={formData.newPassword}
            onChange={(val) => handleChange("newPassword", val)}
            className={'w-full px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500'}

          />

          <Input
            name="confirmNewPassword"
            label="Confirm new password"
            type="password"
            value={formData.confirmNewPassword}
            onChange={(val) => handleChange("confirmNewPassword", val)}
            className={'w-full px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500'}

          />

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
              Update Password
            </button>
            </div>
        </form>
      </div>
    </div>
  );
}
