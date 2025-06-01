import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ClientModal from '../components/ClientModal';
import ClientCard from '../components/ClientCard';

const Clients: React.FC = () => {
  const { clients } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const filteredClients = searchQuery
    ? clients.filter(
        client =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.phone.includes(searchQuery)
      )
    : clients;

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
        <button
          onClick={handleAddClient}
          className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus size={16} className="mr-2" />
          Add New Client
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between">
          <div className="relative flex-grow max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          {filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery
                  ? "No clients match your search criteria."
                  : "Get started by adding a new client."}
              </p>
              {!searchQuery && (
                <div className="mt-6">
                  <button
                    onClick={handleAddClient}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus size={16} className="-ml-1 mr-2" />
                    New Client
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClients.map((client) => (
                <ClientCard 
                  key={client.id} 
                  client={client} 
                  onEdit={() => handleEditClient(client)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          client={selectedClient}
        />
      )}
    </div>
  );
};

export default Clients;