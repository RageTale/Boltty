type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';

interface Appointment {
  id: string;
  clientId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes?: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

interface Settings {
  businessName: string;
  email: string;
  phone: string;
  appointmentDuration: number; // minutes
  startHour: number; // 0-23
  endHour: number; // 0-23
  enableEmailNotifications: boolean;
  workDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}