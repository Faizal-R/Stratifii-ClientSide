import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Eye icons

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  disabled = false,
  name,
}: {
  name?: string;
  label: string;
  type?: string;
  value: string | number;
  onChange: (val: string | number) => void;
  disabled?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-sm text-gray-600">{label}</label>

      <div className="relative">
        <input
          name={name}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`px-3 py-2 border rounded-lg w-full outline-none pr-10 ${
            disabled
              ? "bg-black/80 border-2 border-violet-800 text-gray-600"
              : "bg-black/80 border-2 border-violet-800 text-gray-400"
          }`}
        />

        {isPassword && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </span>
        )}
      </div>
    </div>
  );
};
