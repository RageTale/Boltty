import React from 'react';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AppointmentList from '../components/AppointmentList';

const Dashboard: React.FC = () => {
  const { appointments, clients } = useAppContext();
  
  // Get today's appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayAppointments = appointments.filter(app => {
    const appDate = new Date(app.startTime);
    appDate.setHours(0, 0, 0, 0);
    return appDate.getTime() === today.getTime();
  });

  // Get upcoming appointments (next 7 days)
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const upcomingAppointments = appointments.filter(app => {
    const appDate = new Date(app.startTime);
    return appDate > today && appDate <= nextWeek;
  });

  // Stats
  const completedAppointments = appointments.filter(app => app.status === 'completed').length;

  const stats = [
    { title: 'Appointments', value: appointments.length, icon: <Calendar className="h-6 w-6 text-blue-500" /> },
    { title: 'Clients', value: clients.length, icon: <Users className="h-6 w-6 text-teal-500" /> },
    { title: 'Completed', value: completedAppointments, icon: <CheckCircle className="h-6 w-6 text-green-500" /> },
    { title: "Today's Schedule", value: todayAppointments.length, icon: <Clock className="h-6 w-6 text-indigo-500" /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white overflow-hidden shadow rounded-lg transition-all hover:shadow-md hover:scale-[1.02] duration-300"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">{stat.icon}</div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Appointments</h2>
            <AppointmentList 
              appointments={todayAppointments} 
              emptyMessage="No appointments scheduled for today" 
            />
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h2>
            <AppointmentList 
              appointments={upcomingAppointments} 
              emptyMessage="No upcoming appointments in the next week" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;