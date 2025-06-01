import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Car, 
  TrendingUp, 
  CreditCard, 
  Search, 
  Plus, 
  Filter, 
  ChevronDown, 
  Edit, 
  Trash2, 
  BarChart3 
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

// Mock data
const mockAssets = [
  {
    id: 1,
    name: 'Apartamento em São Paulo',
    type: 'property',
    icon: Building,
    iconColor: 'text-blue-500',
    value: 850000,
    acquisitionDate: '2020-06-15',
    hasAlert: false,
  },
  {
    id: 2,
    name: 'Carro SUV',
    type: 'vehicle',
    icon: Car,
    iconColor: 'text-green-500',
    value: 120000,
    acquisitionDate: '2022-03-10',
    hasAlert: true,
  },
  {
    id: 3,
    name: 'Ações PETR4',
    type: 'investment',
    icon: TrendingUp,
    iconColor: 'text-purple-500',
    value: 75000,
    acquisitionDate: '2021-11-22',
    hasAlert: false,
  },
  {
    id: 4,
    name: 'Terreno em Campinas',
    type: 'property',
    icon: Building,
    iconColor: 'text-blue-500',
    value: 280000,
    acquisitionDate: '2019-08-05',
    hasAlert: false,
  },
  {
    id: 5,
    name: 'Moto',
    type: 'vehicle',
    icon: Car,
    iconColor: 'text-green-500',
    value: 25000,
    acquisitionDate: '2021-06-15',
    hasAlert: true,
  },
  {
    id: 6,
    name: 'CDB Banco XYZ',
    type: 'investment',
    icon: TrendingUp,
    iconColor: 'text-purple-500',
    value: 50000,
    acquisitionDate: '2022-01-10',
    hasAlert: false,
  },
  {
    id: 7,
    name: 'Computador de alto desempenho',
    type: 'other',
    icon: CreditCard,
    iconColor: 'text-gray-500',
    value: 15000,
    acquisitionDate: '2022-05-20',
    hasAlert: false,
  },
];

type AssetType = 'all' | 'property' | 'vehicle' | 'investment' | 'other';

const AssetsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<AssetType>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<number | null>(null);

  // Filter assets based on search term and selected type
  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

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

  const handleDeleteClick = (id: number) => {
    setAssetToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, this would make an API call to delete the asset
    console.log(`Deleting asset ${assetToDelete}`);
    setDeleteModalOpen(false);
    setAssetToDelete(null);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meus Bens</h1>
            <p className="text-gray-600">
              Gerencie todos os seus bens e direitos cadastrados
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/assets/new">
              <Button variant="primary" icon={<Plus size={16} />}>
                Novo Bem
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
                placeholder="Buscar bens..."
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  className={`flex items-center justify-center p-3 rounded-md border ${
                    selectedType === 'all'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType('all')}
                >
                  <span>Todos</span>
                </button>
                <button
                  className={`flex items-center justify-center p-3 rounded-md border ${
                    selectedType === 'property'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType('property')}
                >
                  <Building className="mr-2 h-5 w-5" />
                  <span>Imóveis</span>
                </button>
                <button
                  className={`flex items-center justify-center p-3 rounded-md border ${
                    selectedType === 'vehicle'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType('vehicle')}
                >
                  <Car className="mr-2 h-5 w-5" />
                  <span>Veículos</span>
                </button>
                <button
                  className={`flex items-center justify-center p-3 rounded-md border ${
                    selectedType === 'investment'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType('investment')}
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  <span>Investimentos</span>
                </button>
              </div>
            </div>
          )}
        </Card>

        {filteredAssets.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum bem encontrado</h3>
            <p className="mt-1 text-gray-500">
              Tente ajustar seus filtros ou cadastre um novo bem.
            </p>
            <div className="mt-6">
              <Link to="/assets/new">
                <Button variant="primary">Cadastrar Novo Bem</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bem
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
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100">
                          <asset.icon className={`h-5 w-5 ${asset.iconColor}`} />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                            {asset.hasAlert && (
                              <div className="ml-2 flex-shrink-0">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                  Alerta
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(asset.value)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(asset.acquisitionDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <Link
                          to={`/assets/${asset.id}/analysis`}
                          className="text-gray-600 hover:text-gray-900"
                          title="Análise"
                        >
                          <BarChart3 className="h-5 w-5" />
                        </Link>
                        <Link
                          to={`/assets/edit/${asset.id}`}
                          className="text-gray-600 hover:text-gray-900"
                          title="Editar"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(asset.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Excluir bem
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Tem certeza que deseja excluir este bem? Esta ação não pode ser desfeita.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Excluir
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AssetsList;