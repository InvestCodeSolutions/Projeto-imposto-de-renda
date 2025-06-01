import React, { useState } from 'react';
import { Download, FileText, Filter, ChevronDown, Calendar, Search } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'year' | 'month'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock reports data
  const reports = [
    {
      id: 1,
      name: 'Declaração Anual de Bens 2024',
      type: 'annual',
      date: '2024-03-01',
      size: '2.4 MB',
      status: 'completed',
    },
    {
      id: 2,
      name: 'Relatório Mensal - Fevereiro 2024',
      type: 'monthly',
      date: '2024-02-28',
      size: '1.8 MB',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Análise Patrimonial 2023',
      type: 'analysis',
      date: '2023-12-31',
      size: '3.1 MB',
      status: 'completed',
    },
  ];

  // Filter reports based on search term and period
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = selectedPeriod === 'all' || 
      (selectedPeriod === 'year' && report.date.includes('2024')) ||
      (selectedPeriod === 'month' && report.date.startsWith('2024-02'));
    return matchesSearch && matchesPeriod;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600">
              {user?.userType === 'accountant' 
                ? 'Gerencie os relatórios dos seus clientes'
                : 'Acesse seus relatórios e declarações'}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button variant="primary" icon={<FileText size={16} />}>
              Gerar Novo Relatório
            </Button>
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
                placeholder="Buscar relatórios..."
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
                    selectedPeriod === 'all'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPeriod('all')}
                >
                  <span>Todos</span>
                </button>
                <button
                  className={`flex items-center justify-center p-3 rounded-md border ${
                    selectedPeriod === 'year'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPeriod('year')}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>Este Ano</span>
                </button>
                <button
                  className={`flex items-center justify-center p-3 rounded-md border ${
                    selectedPeriod === 'month'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPeriod('month')}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  <span>Este Mês</span>
                </button>
              </div>
            </div>
          )}
        </Card>

        {filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum relatório encontrado</h3>
            <p className="mt-1 text-gray-500">
              Tente ajustar seus filtros ou gere um novo relatório.
            </p>
            <div className="mt-6">
              <Button variant="primary" icon={<FileText size={16} />}>
                Gerar Novo Relatório
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <li key={report.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">{report.name}</h4>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>Gerado em {new Date(report.date).toLocaleDateString('pt-BR')}</span>
                          <span className="mx-2">•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Download size={16} />}
                        onClick={() => {
                          // Handle download
                          console.log(`Downloading report ${report.id}`);
                        }}
                      >
                        Download
                      </Button>
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

export default ReportsPage;