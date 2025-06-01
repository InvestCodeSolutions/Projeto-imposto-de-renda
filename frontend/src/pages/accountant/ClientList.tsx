import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown, User, FileText, AlertTriangle } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    cpf: '123.456.789-00',
    totalAssets: 5,
    lastUpdate: '2024-03-01',
    status: 'active',
    hasAlert: true,
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    cpf: '987.654.321-00',
    totalAssets: 3,
    lastUpdate: '2024-02-28',
    status: 'pending',
    hasAlert: false,
  },
  // Add more mock clients as needed
];

const ClientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'pending'>('all');

  // Filter clients based on search term and status
  const filteredClients = mockClients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cpf.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
            <p className="text-gray-600">
              Gerencie sua carteira de clientes
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/accountant/clients/new">
              <Button variant="primary" icon={<Plus size={16} />}>
                Novo Cliente
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Buscar por nome, email ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="outline"
                icon={<Filter size={16} />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filtros
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  className={`flex items-center justify-center p-3 rounded-md border ${
                    selectedStatus === 'all'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStatus('all')}
                >
                  <span>Todos</span>
                </button>
                <button
                  className={`flex items-center justify-center p-3 rounded-md border ${
                    selectedStatus === 'active'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStatus('active')}
                >
                  <User className="mr-2 h-5 w-5" />
                  <span>Ativos</span>
                </button>
                <button
                  className={`flex items-center justify-center p-3 rounded-md border ${
                    selectedStatus === 'pending'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStatus('pending')}
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  <span>Pendentes</span>
                </button>
              </div>
            </div>
          )}
        </Card>

        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum cliente encontrado</h3>
            <p className="mt-1 text-gray-500">
              Tente ajustar seus filtros ou cadastre um novo cliente.
            </p>
            <div className="mt-6">
              <Link to="/accountant/clients/new">
                <Button variant="primary">Cadastrar Novo Cliente</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <li key={client.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            {client.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                            {client.hasAlert && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Alerta
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            <p>{client.email}</p>
                            <p>CPF: {client.cpf}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Link
                          to={`/accountant/clients/${client.id}`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Ver Perfil
                        </Link>
                        <Link
                          to={`/accountant/clients/${client.id}/report`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Gerar Relatório
                        </Link>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Total de Bens: {client.totalAssets}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Última atualização: {new Date(client.lastUpdate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ClientList;