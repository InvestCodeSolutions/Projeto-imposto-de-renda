import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Key, Lock, Mail } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, clearError, verifyTwoFactor } = useAuth();
  
  const searchParams = new URLSearchParams(location.search);
  const defaultUserType = searchParams.get('type') === 'accountant' ? 'accountant' : 'client';
  
  const [userType, setUserType] = useState<'client' | 'accountant'>(defaultUserType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (twoFactorRequired) {
      handleTwoFactorSubmit();
      return;
    }

    try {
      setIsLoading(true);
      setLoginError(null);
      clearError();
      
      await login(email, password, userType);
      
      // If 2FA is required, show the 2FA form
      // This is simulated here - in a real app, the login function would return or throw
      // to indicate 2FA is needed
      const needsTwoFactor = false; // This would come from the API
      
      if (needsTwoFactor) {
        setTwoFactorRequired(true);
      } else {
        // Navigate to the appropriate dashboard
        const redirectPath = userType === 'client' ? '/dashboard' : '/accountant/dashboard';
        navigate(redirectPath);
      }
    } catch (err: any) {
      setLoginError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSubmit = async () => {
    try {
      setIsLoading(true);
      setLoginError(null);
      
      const success = await verifyTwoFactor(twoFactorCode);
      
      if (success) {
        // Navigate to the appropriate dashboard
        const redirectPath = userType === 'client' ? '/dashboard' : '/accountant/dashboard';
        navigate(redirectPath);
      }
    } catch (err: any) {
      setLoginError(err.message || 'Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta</h1>
            <p className="mt-2 text-gray-600">
              Entre para gerenciar seus bens e declarações
            </p>
          </div>

          <Card>
            {/* User Type Toggle */}
            <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  userType === 'client'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                onClick={() => setUserType('client')}
              >
                Cliente
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  userType === 'accountant'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                onClick={() => setUserType('accountant')}
              >
                Contador
              </button>
            </div>

            {twoFactorRequired ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-6 text-center">
                  <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Verificação em duas etapas</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Digite o código enviado para o seu dispositivo
                  </p>
                </div>

                <Input
                  id="twoFactorCode"
                  label="Código de verificação"
                  type="text"
                  placeholder="000000"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  required
                  icon={<Key size={20} />}
                  className="mb-6"
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                >
                  Verificar
                </Button>

                {loginError && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {loginError}
                  </div>
                )}
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  icon={<Mail size={20} />}
                  className="mb-4"
                />

                <div className="relative">
                  <Input
                    id="password"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    icon={<Lock size={20} />}
                    className="mb-4"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Lembrar-me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-green-600 hover:text-green-500"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                >
                  Entrar
                </Button>

                {(error || loginError) && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {error || loginError}
                  </div>
                )}

                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-600">Não tem uma conta?</span>{' '}
                  <Link
                    to={`/register?type=${userType}`}
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Cadastre-se
                  </Link>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;