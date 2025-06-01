import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define types
interface AppContextType {
  appointments: Appointment[];
  clients: Client[];
  settings: Settings;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  updateSettings: (settings: Settings) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Generate some initial mock data
const generateMockData = () => {
  // Create mock clients
  const mockClients: Client[] = [
    {
      id: uuidv4(),
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(123) 456-7890',
      notes: 'Prefers afternoon appointments',
    },
    {
      id: uuidv4(),
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(987) 654-3210',
      notes: 'Allergic to certain products',
    },
    {
      id: uuidv4(),
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '(555) 123-4567',
      notes: '',
    },
  ];

  // Create mock appointments
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const createAppointment = (
    clientId: string,
    title: string,
    startDate: Date,
    durationMinutes: number,
    status: AppointmentStatus,
    notes: string = ''
  ): Appointment => {
    const startTime = new Date(startDate);
    const endTime = new Date(startDate);
    endTime.setMinutes(endTime.getMinutes() + durationMinutes);

    return {
      id: uuidv4(),
      clientId,
      title,
      startTime,
      endTime,
      status,
      notes,
    };
  };

  // Set some appointment start times
  const todayAt10 = new Date(today);
  todayAt10.setHours(10, 0, 0, 0);
  
  const todayAt14 = new Date(today);
  todayAt14.setHours(14, 0, 0, 0);
  
  const tomorrowAt11 = new Date(tomorrow);
  tomorrowAt11.setHours(11, 0, 0, 0);
  
  const nextWeekAt13 = new Date(nextWeek);
  nextWeekAt13.setHours(13, 0, 0, 0);

  const mockAppointments: Appointment[] = [
    createAppointment(mockClients[0].id, 'Consultation', todayAt10, 60, 'confirmed', 'Initial consultation'),
    createAppointment(mockClients[1].id, 'Follow-up', todayAt14, 30, 'scheduled'),
    createAppointment(mockClients[2].id, 'Treatment Session', tomorrowAt11, 90, 'scheduled', 'Bring previous records'),
    createAppointment(mockClients[0].id, 'Review', nextWeekAt13, 45, 'scheduled'),
  ];

  // Create default settings
  const defaultSettings: Settings = {
    businessName: 'AppointEase',
    email: 'contact@appointease.com',
    phone: '(555) 123-4567',
    appointmentDuration: 60, // minutes
    startHour: 9, // 9 AM
    endHour: 17, // 5 PM
    enableEmailNotifications: true,
    workDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
  };

  return {
    clients: mockClients,
    appointments: mockAppointments,
    settings: defaultSettings,
  };
};

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mockData = generateMockData();
  const [appointments, setAppointments] = useState<Appointment[]>(mockData.appointments);
  const [clients, setClients] = useState<Client[]>(mockData.clients);
  const [settings, setSettings] = useState<Settings>(mockData.settings);

  // Appointment functions
  const addAppointment = (appointment: Appointment) => {
    const newAppointment = {
      ...appointment,
      id: appointment.id || uuidv4(),
      status: appointment.status || 'scheduled',
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointment = (appointment: Appointment) => {
    setAppointments(
      appointments.map((a) => (a.id === appointment.id ? appointment : a))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  // Client functions
  const addClient = (client: Client) => {
    const newClient = {
      ...client,
      id: client.id || uuidv4(),
    };
    setClients([...clients, newClient]);
  };

  const updateClient = (client: Client) => {
    setClients(clients.map((c) => (c.id === client.id ? client : c)));
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  // Settings function
  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const value = {
    appointments,
    clients,
    settings,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addClient,
    updateClient,
    deleteClient,
    updateSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};