import { useState, ChangeEvent } from "react";

interface IPasswordRestFormModalProps {
  role: string;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (state: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => void;
}
import { Input } from "../Buttons/FormFields/FormInput";
import { toast } from "sonner";

export default function PasswordResetFormModal({
  isOpen,
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
      toast.error("All fields are required. Please make sure no field is left empty.",{
        className:'custom-error-toast'
      });
      return
    }

    if (formData.newPassword === formData.currentPassword) {
      toast.error("New Password should not be same as Current Password!",{
        className:'custom-error-toast'
      });
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New Password and Confirm New Password must be same!",{
        className:'custom-error-toast'
      });
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className=" w-full max-w-md   relative  border-violet-900  dark:bg-neutral-900 rounded-2xl p-8  animate-fadeIn overflow-y-auto max-h-[90vh] bg-gradient-to-br from-violet-950/50 via-black/95 to-black/90  border border-violet-500/20 shadow-2xl shadow-violet-500/10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-violet-200">
          Reset Password
        </h2>

        <form
          onSubmit={handleOnSubmit}
          className="space-y-5"
        >
          <Input
            name="currentPassword"
            label="Current Password"
            type="password"
            value={formData.currentPassword}
            onChange={(val) => handleChange("currentPassword", val)}
          />

          <Input
            name="newPassword"
            label="New Password"
            type="password"
            value={formData.newPassword}
            onChange={(val) => handleChange("newPassword", val)}
          />

          <Input
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            value={formData.confirmNewPassword}
            onChange={(val) => handleChange("confirmNewPassword", val)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
