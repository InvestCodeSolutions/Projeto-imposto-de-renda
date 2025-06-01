import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FileText, Download, Mail, Phone, MapPin, Calendar, Building } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import RecentAssetsTable from '../../components/dashboard/RecentAssetsTable';
import AssetSummaryChart from '../../components/dashboard/AssetSummaryChart';

const ClientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock client data
  const client = {
    id,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    cpf: '123.456.789-00',
    registrationDate: '2023-01-15',
    totalAssets: 1250000,
    lastUpdate: '2024-03-01',
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-600">Perfil do Cliente</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <Button variant="outline" icon={<FileText size={16} />}>
              Editar Dados
            </Button>
            <Button variant="primary" icon={<Download size={16} />}>
              Gerar Relatório
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client Info */}
          <div className="lg:col-span-1">
            <Card>
              <div className="flex items-center mb-6">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl font-bold">
                  {client.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
                  <p className="text-gray-500">CPF: {client.cpf}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>{client.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>Cliente desde {new Date(client.registrationDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building className="h-5 w-5 mr-3" />
                  <span>Patrimônio Total: {formatCurrency(client.totalAssets)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Asset Summary */}
          <div className="lg:col-span-2">
            <Card title="Distribuição de Bens">
              <div className="h-80">
                <AssetSummaryChart />
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Assets */}
        <div className="mt-8">
          <Card 
            title="Bens Cadastrados" 
            headerAction={
              <Link 
                to={`/accountant/clients/${id}/assets`}
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                Ver todos
              </Link>
            }
          >
            <RecentAssetsTable />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientProfile;