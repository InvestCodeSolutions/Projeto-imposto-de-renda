import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Building, 
  Car, 
  Banknote, 
  Plus,
  Download
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import AssetSummaryChart from '../../components/dashboard/AssetSummaryChart';
import RecentAssetsTable from '../../components/dashboard/RecentAssetsTable';
import AlertCard from '../../components/dashboard/AlertCard';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for the dashboard
  const assetStats = {
    totalAssets: 12,
    totalValue: 1450000,
    yearGrowth: 8.5,
    alerts: 2
  };
  
  const assetTypes = [
    { id: 1, name: 'Imóveis', value: 950000, icon: Building, color: 'bg-blue-500' },
    { id: 2, name: 'Veículos', value: 180000, icon: Car, color: 'bg-green-500' },
    { id: 3, name: 'Investimentos', value: 320000, icon: TrendingUp, color: 'bg-purple-500' }
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Olá, {user?.name}! Aqui está o resumo dos seus bens e direitos.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <Link to="/assets/new">
              <Button variant="primary" icon={<Plus size={16} />}>
                Novo Bem
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <BarChart3 size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total de Bens</h3>
                <p className="text-2xl font-semibold text-gray-900">{assetStats.totalAssets}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Banknote size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Valor Total</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(assetStats.totalValue)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Evolução Anual</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  +{assetStats.yearGrowth}%
                </p>
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
                <p className="text-2xl font-semibold text-gray-900">
                  {assetStats.alerts}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Asset Distribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2" title="Distribuição de Bens">
            <div className="h-80">
              <AssetSummaryChart />
            </div>
          </Card>

          <div className="space-y-6">
            <Card title="Categorias de Bens">
              <ul className="space-y-4">
                {assetTypes.map((type) => (
                  <li key={type.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${type.color} text-white`}>
                        <type.icon size={20} />
                      </div>
                      <span className="ml-3 text-gray-700">{type.name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(type.value)}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <AlertCard 
              title="Atenção" 
              message="Você possui 2 bens com documentação desatualizada."
              actionText="Ver detalhes"
              actionLink="/assets?filter=alerts"
            />
          </div>
        </div>

        {/* Recent Assets */}
        <Card title="Bens Recentes" headerAction={
          <Link to="/assets\" className="text-sm font-medium text-green-600 hover:text-green-500">
            Ver todos
          </Link>
        }>
          <RecentAssetsTable />
        </Card>
      </div>
    </MainLayout>
  );
};

export default ClientDashboard;