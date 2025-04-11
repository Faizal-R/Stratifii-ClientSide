import { useState, ChangeEvent } from "react";

interface IPasswordRestFormModalProps {
  role: string;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordResetFormModal({
  role,
  userId,
  isOpen,
  onClose,
}: IPasswordRestFormModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPassword === formData.currentPassword) {
      alert("New Password should not be same as Current Password!");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New Password and Confirm New Password must be same!");
      return;
    }

    // API call logic here with role & userId
    console.log("Password Updated For:", { role, userId, formData });

    // Reset form
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1 text-sm">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm new password"
              required
            />
          </div>

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
