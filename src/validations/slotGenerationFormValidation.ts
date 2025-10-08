import { ISlotGenerationRequest } from "@/types/ISlotTypes";
import { convertTo24Hour } from "@/utils/dateHelper";

export const validateSlotGenerationForm = (formData: ISlotGenerationRequest) => {
  // 1. Check for available days
  if (!formData.availableDays || formData.availableDays.length === 0) {
    return { valid: false, message: "Please select at least one available day." };
  }

  // 2. Check for start & end time existence
  if (!formData.startTime || !formData.endTime) {
    return { valid: false, message: "Please set both Start Time and End Time." };
  }

  // 3. Check slot duration
if (formData.slotDuration == null || formData.slotDuration < 60) {
  return { valid: false, message: "Slot Duration must be at least 60 minutes." };
}

  

  // 4. Check buffer
  if (formData.bufferRate == null || formData.bufferRate < 0) {
    return { valid: false, message: "Buffer Time must be a valid non-negative number." };
  }

  // 5. Convert 12h → 24h
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

  const startInMinutes = start24.hour * 60 + start24.minute;
  const endInMinutes = end24.hour * 60 + end24.minute;

  // 6. Compare times
  if (endInMinutes <= startInMinutes) {
    return { valid: false, message: "End Time must be later than Start Time." };
  }

  // 7. Check minimum difference (at least one slot duration)
  const diffMinutes = endInMinutes - startInMinutes;
  if (diffMinutes < formData.slotDuration) {
    return {
      valid: false,
      message: `Available time must be at least ${formData.slotDuration} minutes long to fit one slot.`,
    };
  }

  return { valid: true };
};
