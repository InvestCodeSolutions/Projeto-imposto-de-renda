import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Building, 
  Car, 
  TrendingUp, 
  CreditCard, 
  Calendar, 
  DollarSign,
  FileText,
  Upload,
  Save
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

type AssetType = 'property' | 'vehicle' | 'investment' | 'other';

const assetTypeOptions: { value: AssetType; label: string; icon: React.ElementType }[] = [
  { value: 'property', label: 'Imóvel', icon: Building },
  { value: 'vehicle', label: 'Veículo', icon: Car },
  { value: 'investment', label: 'Investimento', icon: TrendingUp },
  { value: 'other', label: 'Outro', icon: CreditCard },
];

const AssetForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  // State for form fields
  const [assetType, setAssetType] = useState<AssetType>('property');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load asset data if in edit mode
  React.useEffect(() => {
    if (isEditMode) {
      // In a real app, this would fetch the asset data from the API
      // For now, we'll simulate it with mock data
      setTimeout(() => {
        setAssetType('property');
        setName('Apartamento em São Paulo');
        setDescription('Apartamento de 2 quartos no centro de São Paulo');
        setValue('850000');
        setAcquisitionDate('2020-06-15');
      }, 500);
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // In a real app, this would make an API call to save the asset
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to assets list
      navigate('/assets');
    } catch (err: any) {
      setError(err.message || 'Falha ao salvar o bem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Editar Bem' : 'Cadastrar Novo Bem'}
          </h1>
          <p className="text-gray-600">
            {isEditMode 
              ? 'Atualize as informações do bem cadastrado'
              : 'Preencha o formulário abaixo para cadastrar um novo bem'}
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            {/* Asset Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Bem
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {assetTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      assetType === option.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setAssetType(option.value)}
                  >
                    <option.icon 
                      className={`h-6 w-6 ${
                        assetType === option.value ? 'text-green-600' : 'text-gray-400'
                      }`} 
                    />
                    <span 
                      className={`mt-2 text-sm font-medium ${
                        assetType === option.value ? 'text-green-700' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="name"
                label="Nome do Bem"
                placeholder="Ex: Apartamento em São Paulo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                icon={<FileText size={20} />}
              />

              <Input
                id="value"
                label="Valor (R$)"
                type="number"
                placeholder="0,00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                icon={<DollarSign size={20} />}
              />

              <Input
                id="acquisitionDate"
                label="Data de Aquisição"
                type="date"
                value={acquisitionDate}
                onChange={(e) => setAcquisitionDate(e.target.value)}
                required
                icon={<Calendar size={20} />}
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  placeholder="Descreva detalhes sobre o bem..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Document upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Documentos Comprobatórios
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                      >
                        <span>Carregar arquivos</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Notas fiscais, escrituras, contratos (PDF, JPG, PNG)
                    </p>
                    {documents.length > 0 && (
                      <div className="mt-2 text-left">
                        <p className="text-sm font-medium text-gray-700">Arquivos selecionados:</p>
                        <ul className="mt-1 text-sm text-gray-500 list-disc list-inside">
                          {Array.from(documents).map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="mt-8 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/assets')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                icon={<Save size={16} />}
              >
                {isEditMode ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AssetForm;