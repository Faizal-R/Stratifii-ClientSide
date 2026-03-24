import React from "react";

interface TimeInputProps {
  label: string;
  time: { hour: number; minute: number; meridian: "AM" | "PM" };
  onChange: (time: {
    hour: number;
    minute: number;
    meridian: "AM" | "PM";
  }) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ label, time, onChange }) => {
  const handleChange = (
    field: "hour" | "minute" | "meridian",
    value?: string
  ) => {
    if (field === "hour" || field === "minute") {
      const num = parseInt(value || "0") || 0;
      onChange({
        ...time,
        [field]: Math.min(field === "hour" ? 12 : 59, Math.max(0, num)),
      });
    } else {
      onChange({ ...time, meridian: time.meridian === "AM" ? "PM" : "AM" });
    }
  };

  return (
    <div
      className="flex flex-col items-start gap-2 p-3 rounded-lg backdrop-blur-md"
      style={{
        background: "rgba(143, 0, 187, 0.1)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <span className="text-sm font-semibold text-white">{label}</span>
      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          max={12}
          value={time.hour.toString().padStart(2, "0")}
          onChange={(e) => handleChange("hour", e.target.value)}
          className="w-12 text-center py-1 rounded-md text-white font-semibold text-sm focus:scale-105 transition-transform"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(139,92,246,0.4)",
          }}
        />
        <input
          type="number"
          min={0}
          max={59}
          value={time.minute.toString().padStart(2, "0")}
          onChange={(e) => handleChange("minute", e.target.value)}
          className="w-12 text-center py-1 rounded-md text-white font-semibold text-sm focus:scale-105 transition-transform"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(139,92,246,0.4)",
          }}
        />
        <button
          type="button"
          onClick={() => handleChange("meridian")}
          className="w-12 py-1 rounded-md text-white font-semibold text-sm focus:scale-105 transition-transform hover:bg-violet-500/20"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(139,92,246,0.4)",
          }}
        >
          {time.meridian}
        </button>
      </div>
    </div>
  );
};

export default TimeInput;
