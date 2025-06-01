import { v4 as uuidv4 } from 'uuid';

// Get color based on appointment status
export const getStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-purple-100 text-purple-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Generate a new UUID
export const generateId = (): string => {
  return uuidv4();
};

// Format date to display
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Format time to display
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Check if two dates are the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Calculate appointment duration in minutes
export const getAppointmentDuration = (startTime: Date, endTime: Date): number => {
  return Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));
};

// Check if time slot is available (no conflicts with existing appointments)
export const isTimeSlotAvailable = (
  startTime: Date,
  endTime: Date,
  appointments: Appointment[],
  excludeAppointmentId?: string
): boolean => {
  for (const appointment of appointments) {
    if (excludeAppointmentId && appointment.id === excludeAppointmentId) {
      continue;
    }
    
    const appointmentStart = new Date(appointment.startTime);
    const appointmentEnd = new Date(appointment.endTime);
    
    // Check for overlap
    if (
      (startTime >= appointmentStart && startTime < appointmentEnd) ||
      (endTime > appointmentStart && endTime <= appointmentEnd) ||
      (startTime <= appointmentStart && endTime >= appointmentEnd)
    ) {
      return false;
    }
  }
  
  return true;
};