"use client"
import { X } from "lucide-react";
import { useState } from "react";
export const InputField = ({
  icon: Icon,
  label,
  value,
  name,
  isEditing,
  handleChange,
  placeholder,
  type,
  disabled = false,
}: {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  value: string | number;
  name: string;
  isEditing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  disabled?: boolean;
}) => {
  return (
    <div className="mb-6">
      <label className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
        <Icon size={18} />
        {label}
      </label>
      {isEditing ? (
        <input
          disabled={disabled}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : ""} `}
        />
      ) : (
        <div className="text-white bg-gray-900 rounded-lg px-4 py-2">
          {/* {(value as string)?.length > 1 ? value : placeholder} */}
          {value}
        </div>
      )}
    </div>
  );
};


export const TagInput: React.FC<{
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
}> = ({ tags, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      onChange([...tags, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 p-3 bg-black/50 border border-violet-900/30 rounded-lg min-h-[44px] focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all duration-200">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs rounded-full shadow-lg hover:shadow-violet-500/25 transition-all duration-200 group hover:scale-105"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="w-3.5 h-3.5 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm"
        />
      </div>
      <p className="text-xs text-gray-400">
        Press Enter or comma to add • Click tags to remove
      </p>
    </div>
  );
};