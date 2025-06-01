import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Car, TrendingUp } from 'lucide-react';

const RecentAssetsTable: React.FC = () => {
  // Mock data for recent assets
  const recentAssets = [
    {
      id: 1,
      name: 'Apartamento em São Paulo',
      type: 'Imóvel',
      icon: Home,
      iconColor: 'text-blue-500',
      value: 850000,
      acquisitionDate: '2020-06-15',
    },
    {
      id: 2,
      name: 'Carro SUV',
      type: 'Veículo',
      icon: Car,
      iconColor: 'text-green-500',
      value: 120000,
      acquisitionDate: '2022-03-10',
    },
    {
      id: 3,
      name: 'Ações PETR4',
      type: 'Investimento',
      icon: TrendingUp,
      iconColor: 'text-purple-500',
      value: 75000,
      acquisitionDate: '2021-11-22',
    },
    {
      id: 4,
      name: 'Terreno em Campinas',
      type: 'Imóvel',
      icon: Home,
      iconColor: 'text-blue-500',
      value: 280000,
      acquisitionDate: '2019-08-05',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bem
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data de Aquisição
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentAssets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100">
                    <asset.icon className={`h-5 w-5 ${asset.iconColor}`} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{asset.type}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatCurrency(asset.value)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatDate(asset.acquisitionDate)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link 
                  to={`/assets/${asset.id}`} 
                  className="text-green-600 hover:text-green-900 inline-flex items-center"
                >
                  Ver detalhes
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAssetsTable;