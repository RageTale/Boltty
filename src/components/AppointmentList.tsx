import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getStatusColor } from '../utils/helpers';
import { Clock, Calendar, User } from 'lucide-react';

interface AppointmentListProps {
  appointments: Appointment[];
  emptyMessage?: string;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments, 
  emptyMessage = "No appointments found" 
}) => {
  const { clients } = useAppContext();

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown Client';
  };

  if (appointments.length === 0) {
    return (
      <div className="py-6 text-center text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => {
        const startTime = new Date(appointment.startTime);
        const endTime = new Date(appointment.endTime);
        
        const statusColor = getStatusColor(appointment.status);
        
        return (
          <div 
            key={appointment.id} 
            className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium text-gray-900">{appointment.title}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <User size={16} className="mr-1 flex-shrink-0" />
                  <span>{getClientName(appointment.clientId)}</span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-1 flex-shrink-0" />
                  <span>
                    {startTime.toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Clock size={16} className="mr-1 flex-shrink-0" />
                  <span>
                    {startTime.toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    })} - {endTime.toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColor}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
            
            {appointment.notes && (
              <div className="mt-2 text-sm text-gray-500">
                <p className="line-clamp-2">{appointment.notes}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;