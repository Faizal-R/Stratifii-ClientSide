"use client";
import React, { useState, useEffect, useRef } from "react";
import { Calendar, Clock, Users, Send } from "lucide-react";
import {
  ISlotGenerationRequest,
  SlotPreview,
  FormErrors,
  IInterviewSlot,
} from "@/types/ISlotTypes";
import {
  calculateSlotPreview,
} from "@/utils/slotCalculator";
import {
  useGetInterviewerSlotGenerationRule,
  useSlotGeneration,
  useUpdateInterviewerSlotGenerationRule,
} from "@/hooks/api/useSlot";

import { useAuthStore } from "@/features/auth/authStore";
import { errorToast, successToast } from "@/utils/customToast";
import TimeInput from "@/components/ui/FormFields/TimeInputSettings";
import { convertTo12Hour, convertTo24Hour } from "@/utils/dateHelper";
import { validateSlotGenerationForm } from "@/validations/slotGenerationFormValidation";

interface ISlotGenerationProps {
  sendSlotsToParent: (newSlots: IInterviewSlot[]) => void;
}

const SlotGeneratorPage: React.FC<ISlotGenerationProps> = ({
  sendSlotsToParent,
}) => {
  const { user } = useAuthStore();
  const hasFetched = useRef(false);
  const [isExistingRule, setIsExistingRule] = useState(false);
  const [_slots, setSlots] = useState<IInterviewSlot[]>([]);
  const [formData, setFormData] = useState<ISlotGenerationRequest>({
    availableDays: [],
    startTime: { hour: 9, minute: 30, meridian: "AM" },
    endTime: { hour: 5, minute: 30, meridian: "PM" },
    slotDuration: 60,
    bufferRate: 15,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const { getInterviewerSlotGenerationRule } =
    useGetInterviewerSlotGenerationRule();
  const { updateInterviewerSlotGenerationRule, loading: updateLoading } =
    useUpdateInterviewerSlotGenerationRule();

 
  const [preview, setPreview] = useState<SlotPreview | null>(null);
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

  useEffect(() => {
    if (!user?.id || hasFetched.current) return;
    hasFetched.current = true;

    const fetchInterviewerSlotGenerationRule = async () => {
      const response = await getInterviewerSlotGenerationRule(user.id!);
      if (response.success && response.data) {
        const start12 = convertTo12Hour(
          response.data.startHour,
          response.data.startMinute
        );
        const end12 = convertTo12Hour(
          response.data.endHour,
          response.data.endMinute
        );

        setFormData({
          availableDays: response.data.availableDays || [],
          startTime: start12,
          endTime: end12,
          slotDuration: Number(response.data.duration) || 60,
          bufferRate: Number(response.data.buffer) || 15,
          timezone:
            response.data.timezone ||
            Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
        setIsExistingRule(true);
      } else {
        // Only show error if it's not a "not found" case (optional)
        // errorToast(response.message);
      }
    };

    fetchInterviewerSlotGenerationRule();
  }, [user?.id]);

  // Calculate preview
  useEffect(() => {
    const { availableDays, startTime, endTime, slotDuration, bufferRate } =
      formData;

    if (
      availableDays?.length > 0 &&
      startTime?.hour !== undefined &&
      startTime?.minute !== undefined &&
      endTime?.hour !== undefined &&
      endTime?.minute !== undefined &&
      slotDuration != null &&
      bufferRate != null
    ) {
      try {
        const previewData = calculateSlotPreview({
          availableDays,
          startTime,
          endTime,
          slotDuration: Number(slotDuration),
          bufferRate: Number(bufferRate),
        });
        setPreview(previewData);
      } catch (err) {
        console.error("Preview calculation error:", err);
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [
    formData.availableDays,
    formData.startTime,
    formData.endTime,
    formData.slotDuration,
    formData.bufferRate,
  ]);

  const handleInputChange = <K extends keyof ISlotGenerationRequest>(
    field: K,
    value: ISlotGenerationRequest[K]
  ) => {
  
    // Special handling for numeric fields
    // if (field === "bufferRate" || field === "slotDuration") {
    //   let numValue: number;
    //   if (typeof value === "string") {
    //     numValue = parseInt(value, 10);
    //   } else if (typeof value === "number") {
    //     numValue = value;
    //   } else {
    //     numValue = 0;
    //   }

    //   const safeValue = isNaN(numValue) || numValue < 0 ? 0 : numValue;
    //   setFormData((prev) => ({ ...prev, [field]: safeValue }));
    // } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    // }
  };

  const handleDayToggle = (dayIndex: number) => {
    const updatedDays = formData.availableDays.includes(dayIndex)
      ? formData.availableDays.filter((day) => day !== dayIndex)
      : [...formData.availableDays, dayIndex].sort();

    handleInputChange("availableDays", updatedDays);
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();


  const validation = validateSlotGenerationForm(formData);
  if (!validation.valid) {
    errorToast(validation.message!);
    return;
  }

  const start24 = convertTo24Hour(
    formData.startTime.hour,
    formData.startTime.minute,
    formData.startTime.meridian
  );
  const end24 = convertTo24Hour(
    formData.endTime.hour,
    formData.endTime.minute,
    formData.endTime.meridian
  );

  // ✅ 4. Prepare payload
  const payload = {
    interviewerId: user?.id as string,
    availableDays: formData.availableDays,
    startHour: start24.hour,
    startMinute: start24.minute,
    endHour: end24.hour,
    endMinute: end24.minute,
    duration: formData.slotDuration,
    buffer: formData.bufferRate,
    timezone: formData.timezone,
  };

  // ✅ 5. Submit to backend
  let response;
  if (isExistingRule) {
    response = await updateInterviewerSlotGenerationRule(user?.id as string, payload);
    if (!response.success) {
      errorToast(response.error || "Failed to update rule. Please try again.");
      return;
    }
    sendSlotsToParent(response.data.slots);
    successToast("Rule updated successfully!");
  } else {
    response = await generateSlots(payload);
    if (!response.success) {
      errorToast(response.message || "Failed to generate slots. Please try again.");
      return;
    }
    setSlots(response.data || []);
    sendSlotsToParent(response.data || []);
    successToast("Slots generated successfully!");
  }
};


  return (
    <div className="bg-gradient-to-br from-black via-black to-violet-950 py-8 px-4 custom-64 bg">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-3 space-y-6">
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
                          formData.availableDays?.includes(index)
                            ? "bg-violet-600/40 border-violet-400/60 scale-105"
                            : "bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105"
                        }
                      `}
                      style={{
                        border: "1px solid",
                        borderColor: formData.availableDays?.includes(index)
                          ? "rgba(139, 92, 246, 0.6)"
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.availableDays?.includes(index)}
                        onChange={() => handleDayToggle(index)}
                        className="sr-only"
                      />
                      <span
                        className={`text-sm font-medium ${
                          formData.availableDays?.includes(index)
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
                className="p-6 rounded-xl backdrop-blur-sm w-full max-w-6xl mx-auto"
                style={{
                  background: "rgba(143, 0, 187, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <div className="flex items-center mb-6">
                  <Clock className="w-5 h-5 text-violet-400 mr-3" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    Time Settings
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Start Time */}
                  <TimeInput
                    label="Start Time"
                    time={formData.startTime}
                    onChange={(val) =>
                      setFormData((p) => ({ ...p, startTime: val }))
                    }
                  />

                  {/* End Time */}
                  <TimeInput
                    label="End Time"
                    time={formData.endTime}
                    onChange={(val) =>
                      setFormData((p) => ({ ...p, endTime: val }))
                    }
                  />

                  {/* Slot Duration */}
                  <div className="flex flex-col">
                    <label className="block text-sm sm:text-base font-medium text-violet-300 mb-2 sm:mb-3">
                      Slot Duration (min)
                    </label>
                    <input
                      type="number"
                      value={formData.slotDuration}
                      onChange={(e) =>
                        handleInputChange("slotDuration", Number(e.target.value))
                      }
                      
                      step={15}
                      className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:scale-105"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                      }}
                    />
                  </div>

                  {/* Buffer Time */}
                  <div className="flex flex-col">
                    <label className="block text-sm sm:text-base font-medium text-emerald-300 mb-2 sm:mb-3">
                      Buffer Time (min)
                    </label>
                    <input
                      type="number"
                      value={formData.bufferRate}
                      onChange={(e) =>
                        handleInputChange("bufferRate", Number(e.target.value))
                      }
                      min={0}
                      max={120}
                      step={5}
                      className="w-full px-4 py-3 rounded-lg text-white transition-all duration-200 focus:scale-105"
                      style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="mt-6 p-4 rounded-lg"
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <p className="text-emerald-300 text-sm sm:text-base">
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
                          {preview.hoursPerDay.toFixed(1)}
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
                          {preview.bufferTime}min
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
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={loading || updateLoading || !preview}
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
                  {loading || updateLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {updateLoading ? "Updating Rule..." : "Generating Slots..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3" />
                      {isExistingRule
                        ? "Update Generation Rule"
                        : "Generate Interview Slots"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlotGeneratorPage;