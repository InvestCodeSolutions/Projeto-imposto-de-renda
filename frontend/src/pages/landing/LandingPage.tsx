import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, PieChart, Shield, Users } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button';

const LandingPage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Organize seus bens para o Imposto de Renda com facilidade
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-lg">
                Cadastre, gerencie e analise seus bens e direitos para uma declaração do IR mais simples e sem dores de cabeça.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register?type=client">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="font-semibold"
                  >
                    Começar como Cliente
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/register?type=accountant">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="font-semibold"
                  >
                    Sou Contador
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Organização financeira" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Por que escolher o DeclaraJá?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma simplifica todo o processo de organização e declaração de bens e direitos, tornando o período do IR muito mais tranquilo.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Cadastro Simplificado</h3>
              <p className="mt-2 text-gray-600">
                Formulários intuitivos para cadastrar seus bens e direitos de forma rápida e sem complicação.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Análises Detalhadas</h3>
              <p className="mt-2 text-gray-600">
                Visualize a evolução do seu patrimônio e receba alertas sobre possíveis inconsistências fiscais.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Segurança Total</h3>
              <p className="mt-2 text-gray-600">
                Seus dados estão protegidos com criptografia avançada e autenticação de dois fatores.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Integração com Contadores</h3>
              <p className="mt-2 text-gray-600">
                Compartilhe seus dados com seu contador de forma segura, facilitando o trabalho conjunto.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Relatórios Completos</h3>
              <p className="mt-2 text-gray-600">
                Gere relatórios detalhados de seus bens e direitos em formato PDF, prontos para a declaração.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Conformidade Fiscal</h3>
              <p className="mt-2 text-gray-600">
                Sistema atualizado conforme as regras mais recentes da Receita Federal para declaração de bens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">O que nossos usuários dizem</h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Marcos Silva</h4>
                  <p className="text-gray-500">Cliente</p>
                </div>
              </div>
              <p className="text-gray-600">
                "O DeclaraJá mudou completamente minha experiência com a declaração do IR. Antes eu perdia dias organizando documentos, agora tenho tudo centralizado e organizado."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                  C
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Carla Mendes</h4>
                  <p className="text-gray-500">Contadora</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Como contadora, o DeclaraJá me ajuda a gerenciar os dados dos meus clientes de forma eficiente. Os relatórios gerados são precisos e economizam muito tempo."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Roberto Almeida</h4>
                  <p className="text-gray-500">Cliente</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Os alertas de inconsistências me salvaram de problemas com a Receita. A plataforma é intuitiva e o suporte é excelente quando preciso de ajuda."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Comece a organizar seus bens hoje mesmo
          </h2>
          <p className="mt-4 text-xl text-green-100 max-w-2xl mx-auto">
            Junte-se a milhares de brasileiros que já simplificaram sua declaração de imposto de renda.
          </p>
          <div className="mt-8">
            <Link to="/register">
              <Button 
                variant="secondary" 
                size="lg" 
                className="font-semibold"
              >
                Criar conta gratuita
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LandingPage;