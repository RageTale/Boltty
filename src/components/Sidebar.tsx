import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Users, Home, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { to: '/clients', icon: <Users size={20} />, label: 'Clients' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-pink-500">AppointEase</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-5 flex-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 mb-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-pink-500'
                      : 'text-pink-500 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                <span className="ml-4">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-gray-200 px-4 py-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-pink-500">John Doe</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;