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

export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
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