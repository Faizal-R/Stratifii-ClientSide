"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Users, Send, Sparkles } from "lucide-react";
import {
  ISlotGenerationRequest,
  SlotPreview,
  FormErrors,
  IInterviewSlot,
} from "@/types/ISlotTypes";
import {
  calculateSlotPreview,
  validateSlotRequest,
} from "@/utils/slotCalculator";
import { useSlotGeneration } from "@/hooks/api/useSlot";
import SlotDisplay from "@/components/features/interviewer/SlotDisplay";
import { toast } from "sonner";

interface ISlotGenerationProps {
  
sendSlotsToParent: (newSlots: IInterviewSlot[]) => void;
}

const SlotGeneratorPage: React.FC<ISlotGenerationProps> = ({ sendSlotsToParent}) => {
  const [slots, setSlots] = useState<IInterviewSlot[]>([]);
  const [formData, setFormData] = useState<ISlotGenerationRequest>({
    fromDate: "",
    toDate: "",
    availableDays: [],
    startHour: 9,
    endHour: 17,
    slotDuration: 60,
    bufferRate: 15,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [preview, setPreview] = useState<SlotPreview | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { generateSlots, loading } = useSlotGeneration();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Set default dates - only from date, leave to date empty
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setFormData((prev) => ({
      ...prev,
      fromDate: formattedDate,
      toDate: "",
    }));
  }, []);

  // Calculate preview
  useEffect(() => {
    if (
      formData.fromDate &&
      formData.toDate &&
      formData.availableDays.length > 0
    ) {
      try {
        const previewData = calculateSlotPreview(formData);
        setPreview(previewData);
      } catch {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [formData]);

  const handleInputChange = (
    field: keyof ISlotGenerationRequest,
    value: any
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDayToggle = (dayIndex: number) => {
    const updatedDays = formData.availableDays.includes(dayIndex)
      ? formData.availableDays.filter((day) => day !== dayIndex)
      : [...formData.availableDays, dayIndex].sort();

    handleInputChange("availableDays", updatedDays);
  };

  const validateForm = (): boolean => {
    const validationErrors = validateSlotRequest(formData);

    if (validationErrors.length > 0) {
      setErrors({ general: validationErrors.join(", ") });
      alert(validationErrors[0]);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
console.log("Form Data:", formData);
    const response = await generateSlots(formData);

    if (!response.success) {
      alert(response.error || "Failed to generate slots. Please try again.");
      return;
    }
    console.log("Generated Slots:", response);

    setSlots(response.data || []);
    setShowSuccess(true);
    setTimeout(()=>{
      sendSlotsToParent(response.data || []);

    },2000)
    toast.success("Slots generated successfully!");
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className=" bg-gradient-to-br from-black via-black to-violet-950 min-h-screen py-8 px-4 ml-64 bg" >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="p-3 rounded-full animate-pulse"
              style={{
                background: "rgba(139, 92, 246, 0.2)",
                border: "2px solid rgba(139, 92, 246, 0.4)",
              }}
            >
              <Sparkles className="w-8 h-8 text-violet-300" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Interview Slot Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Create your perfect interview schedule with intelligent slot generation
          </p>
        </div> */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Date Range */}
              <div
                className="p-6 rounded-xl backdrop-blur-sm"
                style={{
                  background: "rgba(143, 0, 187, 0.08)",
                  border: "1px solid rgba(184, 184, 184, 0.15)",
                }}
              >
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-violet-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">
                    Date Range
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-violet-300 mb-3">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={formData.fromDate}
                      min={getTodayDate()}
                      onChange={(e) =>
                        handleInputChange("fromDate", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:scale-105"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-violet-300 mb-3">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={formData.toDate}
                      min={formData.fromDate || getTodayDate()}
                      onChange={(e) =>
                        handleInputChange("toDate", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:scale-105"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Available Days */}
              <div
                className="p-6 rounded-xl backdrop-blur-sm"
                style={{
                  background: "rgba(143, 0, 187, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <div className="flex items-center mb-4">
                  <Users className="w-5 h-5 text-violet-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">
                    Available Days
                  </h2>
                </div>
                <div className="grid grid-cols-7 gap-3">
                  {dayNames.map((day, index) => (
                    <label
                      key={index}
                      className={`
                        flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200
                        ${
                          formData.availableDays.includes(index)
                            ? "bg-violet-600/40 border-violet-400/60 scale-105"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105"
                        }
                      `}
                      style={{
                        border: "1px solid",
                        borderColor: formData.availableDays.includes(index)
                          ? "rgba(139, 92, 246, 0.6)"
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.availableDays.includes(index)}
                        onChange={() => handleDayToggle(index)}
                        className="sr-only"
                      />
                      <span
                        className={`text-sm font-medium ${
                          formData.availableDays.includes(index)
                            ? "text-violet-200"
                            : "text-gray-400"
                        }`}
                      >
                        {day.slice(0, 3)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Settings */}
              <div
                className="p-6 rounded-xl backdrop-blur-sm"
                style={{
                  background: "rgba(143, 0, 187, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-violet-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">
                    Time Settings
                  </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-violet-300 mb-3">
                      Start Hour
                    </label>
                    <select
                      value={formData.startHour}
                      onChange={(e) =>
                        handleInputChange("startHour", parseInt(e.target.value))
                      }
                      className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:scale-105"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                      }}
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i} className="bg-gray-900">
                          {i.toString().padStart(2, "0")}:00
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-violet-300 mb-3">
                      End Hour
                    </label>
                    <select
                      value={formData.endHour}
                      onChange={(e) =>
                        handleInputChange("endHour", parseInt(e.target.value))
                      }
                      className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:scale-105"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                      }}
                    >
                      {Array.from({ length: 24 }, (_, i) => (
                        <option
                          key={i + 1}
                          value={i + 1}
                          className="bg-gray-900"
                        >
                          {(i + 1).toString().padStart(2, "0")}:00
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-violet-300 mb-3">
                      Slot Duration (min)
                    </label>
                    <input
                      type="number"
                      value={formData.slotDuration}
                      onChange={(e) =>
                        handleInputChange(
                          "slotDuration",
                          parseInt(e.target.value)
                        )
                      }
                      min="15"
                      max="480"
                      step="15"
                      className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:scale-105"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-300 mb-3">
                      Buffer Time (min)
                    </label>
                    <input
                      type="number"
                      value={formData.bufferRate}
                      onChange={(e) =>
                        handleInputChange(
                          "bufferRate",
                          parseInt(e.target.value)
                        )
                      }
                      min="0"
                      max="120"
                      step="5"
                      className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:scale-105"
                      style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <p className="text-emerald-300 text-sm">
                    <strong>Buffer Time:</strong> Extra time between interviews
                    for preparation and breaks.
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Sidebar */}
            <div className="lg:col-span-1">
              <div
                className="p-6 rounded-xl sticky top-4 backdrop-blur-sm"
                style={{
                  background: "rgba(143, 0, 187, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  Preview
                </h2>

                {preview ? (
                  <div className="space-y-4">
                    <div
                      className="rounded-lg p-4 text-center"
                      style={{
                        background: "rgba(139, 92, 246, 0.2)",
                        border: "1px solid rgba(139, 92, 246, 0.4)",
                      }}
                    >
                      <div className="text-3xl font-bold text-violet-300 mb-2">
                        {preview.totalSlots}
                      </div>
                      <div className="text-sm text-violet-400">Total Slots</div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Available Days:</span>
                        <span className="text-white font-medium">
                          {preview.daysCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Hours per Day:</span>
                        <span className="text-white font-medium">
                          {preview.hoursPerDay}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Slots per Day:</span>
                        <span className="text-white font-medium">
                          {preview.slotsPerDay}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-300">Buffer Time:</span>
                        <span className="text-emerald-200 font-medium">
                          {formData.bufferRate}min
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Complete the form to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading || !preview}
              className="
                flex items-center px-8 py-4 font-semibold rounded-xl text-white
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300 hover:scale-105 transform
                shadow-lg hover:shadow-xl
              "
              style={{
                background: preview
                  ? "linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(168, 85, 247, 0.9) 100%)"
                  : "rgba(107, 114, 128, 0.5)",
                border: "1px solid rgba(139, 92, 246, 0.5)",
              }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generating Slots...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" />
                  Generate Interview Slots
                </>
              )}
            </button>
          </div>
        </form>

        {/* Success Message */}
        {showSuccess && slots.length > 0 && (
          <div
            id="results-section"
            className="mt-8 p-6 rounded-xl backdrop-blur-sm"
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Slots Generated Successfully!
              </h3>
              <p className="text-emerald-300">
                Your interview schedule is ready. {slots.length} slots have been created.
              </p>
            </div>
          </div>
        )}

        {/* Generated Slots Display */}
        {/* {slots.length > 0 && <SlotDisplay slots={slots} />} */}
      </div>
    </div>
  );
};

export default SlotGeneratorPage;