import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useAppContext();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
    } else if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Business Information</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Appointment Settings</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="appointmentDuration" className="block text-sm font-medium text-gray-700">
                    Default Appointment Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="appointmentDuration"
                    id="appointmentDuration"
                    min="15"
                    step="15"
                    value={formData.appointmentDuration}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="startHour" className="block text-sm font-medium text-gray-700">
                    Business Hours Start
                  </label>
                  <select
                    name="startHour"
                    id="startHour"
                    value={formData.startHour}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {Array.from({ length: 24 }).map((_, i) => (
                      <option key={i} value={i}>
                        {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="endHour" className="block text-sm font-medium text-gray-700">
                    Business Hours End
                  </label>
                  <select
                    name="endHour"
                    id="endHour"
                    value={formData.endHour}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {Array.from({ length: 24 }).map((_, i) => (
                      <option key={i} value={i}>
                        {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableEmailNotifications"
                      name="enableEmailNotifications"
                      type="checkbox"
                      checked={formData.enableEmailNotifications}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableEmailNotifications" className="font-medium text-gray-700">
                      Enable Email Notifications
                    </label>
                    <p className="text-gray-500">Send email notifications for new and updated appointments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Working Days</h3>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center">
                    <input
                      id={`workDay-${day}`}
                      name={`workDays.${day.toLowerCase()}`}
                      type="checkbox"
                      checked={formData.workDays[day.toLowerCase() as keyof typeof formData.workDays]}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          workDays: {
                            ...formData.workDays,
                            [day.toLowerCase()]: e.target.checked,
                          },
                        });
                      }}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor={`workDay-${day}`} className="ml-3 text-sm font-medium text-gray-700">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex items-center justify-end">
            {saved && (
              <span className="mr-4 text-sm text-green-600">Settings saved successfully</span>
            )}
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;