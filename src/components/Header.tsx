import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Menu size={24} />
            </button>
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-800">
                AppointEase
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden sm:flex">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search appointments or clients..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Bell size={20} />
            </button>
            <div className="border-l border-gray-200 h-6 mx-2"></div>
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;