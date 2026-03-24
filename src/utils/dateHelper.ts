// Utility functions for date formatting and manipulation

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};



export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const isSlotAvailable = (slot: { startTime: Date | string; status: string }): boolean => {
  const slotTime = typeof slot.startTime === 'string' ? new Date(slot.startTime) : slot.startTime;
  const now = new Date();
  return slotTime > now && slot.status === 'available';
};

export const getTimeZoneOffset = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};




export const convertTo24Hour = (hour: number, minute: number, meridian: "AM" | "PM") => {
  let h = hour % 12; // 12 AM or 12 PM edge case
  if (meridian === "PM") h += 12;
  return { hour: h, minute };
};

export const convertTo12Hour = (hour: number, minute: number):{
  hour:number,
  minute:number,
  meridian:"AM"|"PM"
} => {
  const meridian = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return { hour: h, minute, meridian };
};
