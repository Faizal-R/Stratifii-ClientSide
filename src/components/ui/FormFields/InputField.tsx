"use client";
import { X } from "lucide-react";
import React, { useState } from "react";

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
  icon: React.ComponentType<{ size: number; className?: string }>;
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
    <div className="space-y-2">
      <label className="text-zinc-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
        {Icon && <Icon size={15} className="text-violet-400 shrink-0" />}
        {label}
      </label>
      {isEditing ? (
        <input
          disabled={disabled}
          type={type}
          name={name}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={handleChange}
          className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      ) : (
        <div className="w-full bg-zinc-950/80 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm font-medium text-zinc-200 min-h-[44px] flex items-center">
          {value ? String(value) : <span className="text-zinc-600 italic">{placeholder}</span>}
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
      if (inputValue.trim()) {
        onChange([...tags, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl">
      {tags.map((tag, index) => (
        <span key={index} className="flex items-center gap-1.5 px-3 py-1 bg-violet-950/80 border border-violet-800/60 text-violet-300 text-xs font-bold rounded-lg">
          {tag}
          <button type="button" onClick={() => removeTag(index)} className="hover:text-white">
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-white focus:outline-none min-w-[120px]"
      />
    </div>
  );
};