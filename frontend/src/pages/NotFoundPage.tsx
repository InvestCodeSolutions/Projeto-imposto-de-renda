import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-64px-220px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-green-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Página não encontrada</h2>
          <p className="mt-2 text-lg text-gray-600">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
          <div className="mt-8">
            <Link to="/">
              <Button variant="primary" icon={<ArrowLeft size={16} />}>
                Voltar para a página inicial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;