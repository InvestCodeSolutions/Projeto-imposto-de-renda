import React from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, AlertTriangle, Download, Search, Plus } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const AccountantDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for the dashboard
  const stats = {
    totalClients: 24,
    pendingReports: 5,
    alerts: 3,
    recentActivity: [
      {
        id: 1,
        type: 'client_added',
        client: 'João Silva',
        date: '2024-03-10',
      },
      {
        id: 2,
        type: 'report_generated',
        client: 'Maria Santos',
        date: '2024-03-09',
      },
      {
        id: 3,
        type: 'asset_updated',
        client: 'Pedro Oliveira',
        date: '2024-03-08',
      },
    ],
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard do Contador</h1>
            <p className="text-gray-600">
              Bem-vindo(a), {user?.name}! Aqui está o resumo da sua carteira de clientes.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <Link to="/accountant/clients/new">
              <Button variant="primary" icon={<Plus size={16} />}>
                Novo Cliente
              </Button>
            </Link>
            <Link to="/reports">
              <Button variant="outline" icon={<Download size={16} />}>
                Gerar Relatório
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total de Clientes</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalClients}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <FileText size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Relatórios Pendentes</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingReports}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <AlertTriangle size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Alertas</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.alerts}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Client Search */}
        <Card className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Buscar clientes..."
            />
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Atividade Recente">
          <div className="flow-root">
            <ul className="-mb-8">
              {stats.recentActivity.map((activity, index) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {index !== stats.recentActivity.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center ring-8 ring-white">
                          {activity.type === 'client_added' ? (
                            <Users className="h-5 w-5 text-green-600" />
                          ) : activity.type === 'report_generated' ? (
                            <FileText className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-green-600" />
                          )}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.type === 'client_added'
                              ? 'Novo cliente adicionado: '
                              : activity.type === 'report_generated'
                              ? 'Relatório gerado para: '
                              : 'Atualização de bem para: '}
                            <span className="font-medium text-gray-900">{activity.client}</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {new Date(activity.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AccountantDashboard;