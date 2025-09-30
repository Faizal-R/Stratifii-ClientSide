import { IconType } from "react-icons";

interface SelectFieldProps<> {
  icon: IconType;
  label: string;
  value: string;
  name: string;
  options: string[];
  isEditing: boolean;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectField = ({
  icon: Icon,
  label,
  value,
  name,
  options,
  isEditing,
  handleChange,
}: SelectFieldProps) => (
  <div className="space-y-2 mb-4">
    <label className="text-sm text-gray-400 font-semibold flex items-center gap-2">
      <Icon size={16} className="" />
      {label}
    </label>
    {isEditing ? (
      <select
        value={value}
        name={name}
        onChange={handleChange}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors"
      >
        <option value="fsdf">Select size</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <p className="w-full bg-gray-900 border border-gray-900 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors">
        {value || "Not specified"}
      </p>
    )}
  </div>
);
