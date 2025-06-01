import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import CalendarGrid from '../components/CalendarGrid';
import AppointmentModal from '../components/AppointmentModal';

const Calendar: React.FC = () => {
  const { appointments } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleSlotSelect = (date: Date) => {
    setSelectedSlot(date);
    setIsModalOpen(true);
  };

  const viewOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ];

  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    if (view === 'day') {
      return new Date(currentDate).toLocaleDateString(undefined, { 
        ...options, 
        day: 'numeric' 
      });
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      
      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.toLocaleDateString(undefined, { month: 'long' })} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
      } else {
        return `${startOfWeek.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
    } else {
      return currentDate.toLocaleDateString(undefined, options);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
        
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={16} className="mr-2" />
            New Appointment
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleToday}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Today
            </button>
            <h2 className="text-lg font-semibold text-gray-900 ml-2">
              {formatDateRange()}
            </h2>
          </div>
          
          <div className="flex p-1 bg-gray-100 rounded-md">
            {viewOptions.map((option) => (
              <button
                key={option.value}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  view === option.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setView(option.value as 'day' | 'week' | 'month')}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <CalendarGrid 
            view={view}
            currentDate={currentDate}
            appointments={appointments}
            onSlotSelect={handleSlotSelect}
          />
        </div>
      </div>
      
      {isModalOpen && (
        <AppointmentModal
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSlot(null);
          }}
          selectedDate={selectedSlot}
        />
      )}
    </div>
  );
};

export default Calendar;