import React from 'react';
import { User, Phone, Mail, Calendar, Edit } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface ClientCardProps {
  client: Client;
  onEdit: () => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onEdit }) => {
  const { appointments } = useAppContext();
  
  // Get appointment count for this client
  const appointmentCount = appointments.filter(a => a.clientId === client.id).length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900">{client.name}</h3>
              <div className="mt-1 text-xs text-gray-500 flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{appointmentCount} appointment{appointmentCount !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-gray-500"
          >
            <Edit size={18} />
          </button>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Phone size={16} className="mr-2 flex-shrink-0 text-gray-400" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail size={16} className="mr-2 flex-shrink-0 text-gray-400" />
            <span className="truncate">{client.email}</span>
          </div>
        </div>
        
        {client.notes && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-500 line-clamp-2">{client.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCard;