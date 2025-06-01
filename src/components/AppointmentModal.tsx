import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: Appointment;
  selectedDate: Date | null;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  appointment,
  selectedDate,
}) => {
  const { clients, addAppointment, updateAppointment, settings } = useAppContext();
  
  const [formData, setFormData] = useState<Partial<Appointment>>({
    title: '',
    clientId: '',
    startTime: new Date(),
    endTime: new Date(),
    status: 'scheduled',
    notes: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        ...appointment,
      });
    } else if (selectedDate) {
      // Set the selected date and calculate end time based on duration
      const startTime = selectedDate;
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + settings.appointmentDuration);
      
      setFormData({
        ...formData,
        startTime,
        endTime,
      });
    }
  }, [appointment, selectedDate, settings.appointmentDuration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.clientId || !formData.startTime || !formData.endTime) {
      return; // Form validation
    }
    
    if (appointment) {
      updateAppointment(formData as Appointment);
    } else {
      addAppointment(formData as Appointment);
    }
    
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'startTime' | 'endTime'
  ) => {
    const { value } = e.target;
    const dateValue = new Date(value);
    
    setFormData({
      ...formData,
      [field]: dateValue,
    });
    
    // If start time changes and it's a new appointment, update end time
    if (field === 'startTime' && !appointment) {
      const endTime = new Date(dateValue);
      endTime.setMinutes(endTime.getMinutes() + settings.appointmentDuration);
      
      setFormData((prev) => ({
        ...prev,
        endTime,
      }));
    }
  };

  const formatDateTimeForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {appointment ? 'Edit Appointment' : 'New Appointment'}
                  </h3>
                  <button
                    onClick={onClose}
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          required
                          value={formData.title}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
                          Client
                        </label>
                        <select
                          id="clientId"
                          name="clientId"
                          required
                          value={formData.clientId}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="">Select a client</option>
                          {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                            Start Time
                          </label>
                          <input
                            type="datetime-local"
                            name="startTime"
                            id="startTime"
                            required
                            value={formData.startTime ? formatDateTimeForInput(new Date(formData.startTime)) : ''}
                            onChange={(e) => handleDateTimeChange(e, 'startTime')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                            End Time
                          </label>
                          <input
                            type="datetime-local"
                            name="endTime"
                            id="endTime"
                            required
                            value={formData.endTime ? formatDateTimeForInput(new Date(formData.endTime)) : ''}
                            onChange={(e) => handleDateTimeChange(e, 'endTime')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      {appointment && (
                        <div>
                          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="scheduled">Scheduled</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      )}

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          value={formData.notes || ''}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {appointment ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;