import React from 'react';
import { useParams } from 'react-router-dom';
import { TrendingUp, ArrowUp, ArrowDown, AlertTriangle, Download } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const AssetAnalysis: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data for asset analysis
  const asset = {
    id,
    name: 'Apartamento em São Paulo',
    type: 'property',
    acquisitionValue: 850000,
    currentValue: 920000,
    acquisitionDate: '2020-06-15',
    valueHistory: [
      { date: '2020-06', value: 850000 },
      { date: '2020-12', value: 870000 },
      { date: '2021-06', value: 890000 },
      { date: '2021-12', value: 900000 },
      { date: '2022-06', value: 910000 },
      { date: '2022-12', value: 920000 },
    ],
    alerts: [
      {
        type: 'warning',
        message: 'Documentação de registro necessita atualização',
      },
      {
        type: 'info',
        message: 'Valorização acima da média do mercado',
      },
    ],
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calculateGrowth = (initial: number, final: number) => {
    return ((final - initial) / initial) * 100;
  };

  const growth = calculateGrowth(asset.acquisitionValue, asset.currentValue);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Análise do Bem</h1>
            <p className="text-gray-600">{asset.name}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="primary" icon={<Download size={16} />}>
              Exportar Análise
            </Button>
          </div>
        </div>

        {/* Value Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Valor Atual</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(asset.currentValue)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${growth >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {growth >= 0 ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Valorização</h3>
                <p className={`text-2xl font-semibold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {growth.toFixed(2)}%
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-white">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <AlertTriangle size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Alertas</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {asset.alerts.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Value History Chart */}
        <Card title="Histórico de Valorização" className="mb-8">
          <div className="h-80">
            {/* This is a placeholder for the chart */}
            <div className="h-full flex items-center justify-center text-gray-500">
              Gráfico de evolução do valor do bem
            </div>
          </div>
        </Card>

        {/* Alerts */}
        <Card title="Alertas e Recomendações">
          <div className="space-y-4">
            {asset.alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  alert.type === 'warning'
                    ? 'bg-yellow-50 border-l-4 border-yellow-400'
                    : 'bg-blue-50 border-l-4 border-blue-400'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                      }`}
                    />
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm ${
                        alert.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'
                      }`}
                    >
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AssetAnalysis;