import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, CreditCard } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, error, clearError } = useAuth();
  
  const searchParams = new URLSearchParams(location.search);
  const defaultUserType = searchParams.get('type') === 'accountant' ? 'accountant' : 'client';
  
  const [userType, setUserType] = useState<'client' | 'accountant'>(defaultUserType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  const getPasswordStrength = (password: string) => {
    if (!password) return null;
    
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    
    const score = [hasUppercase, hasLowercase, hasNumbers, hasSpecialChars].filter(Boolean).length;
    
    if (password.length < 6) return 'weak';
    if (score <= 2) return 'weak';
    if (score === 3) return 'medium';
    return 'strong';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setRegisterError('As senhas não coincidem');
      return;
    }
    
    if (passwordStrength === 'weak') {
      setRegisterError('Sua senha é muito fraca. Use uma combinação de letras maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    try {
      setIsLoading(true);
      setRegisterError(null);
      clearError();
      
      await register(name, email, password, userType, document);
      
      // Navigate to the appropriate dashboard
      const redirectPath = userType === 'client' ? '/dashboard' : '/accountant/dashboard';
      navigate(redirectPath);
    } catch (err: any) {
      setRegisterError(err.message || 'Falha ao registrar. Por favor, tente novamente.');
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
            <h1 className="text-3xl font-bold text-gray-900">Crie sua conta</h1>
            <p className="mt-2 text-gray-600">
              Comece a organizar seus bens e direitos hoje
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

            <form onSubmit={handleSubmit}>
              <Input
                id="name"
                label="Nome Completo"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                icon={<User size={20} />}
                className="mb-4"
              />

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

              <Input
                id="document"
                label={userType === 'client' ? 'CPF' : 'CNPJ'}
                type="text"
                placeholder={userType === 'client' ? '000.000.000-00' : '00.000.000/0000-00'}
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
                icon={<CreditCard size={20} />}
                className="mb-4"
              />

              <div className="relative">
                <Input
                  id="password"
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  icon={<Lock size={20} />}
                  className="mb-2"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {passwordStrength && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          passwordStrength === 'weak' 
                            ? 'bg-red-500 w-1/3' 
                            : passwordStrength === 'medium' 
                              ? 'bg-yellow-500 w-2/3' 
                              : 'bg-green-500 w-full'
                        }`}
                      ></div>
                    </div>
                    <span 
                      className={`text-xs ${
                        passwordStrength === 'weak' 
                          ? 'text-red-500' 
                          : passwordStrength === 'medium' 
                            ? 'text-yellow-500' 
                            : 'text-green-500'
                      }`}
                    >
                      {passwordStrength === 'weak' 
                        ? 'Fraca' 
                        : passwordStrength === 'medium' 
                          ? 'Média' 
                          : 'Forte'}
                    </span>
                  </div>
                </div>
              )}

              <div className="relative">
                <Input
                  id="confirmPassword"
                  label="Confirmar Senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  icon={<Lock size={20} />}
                  className="mb-6"
                  error={
                    confirmPassword && password !== confirmPassword
                      ? 'As senhas não coincidem'
                      : undefined
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  Eu concordo com os{' '}
                  <Link to="/terms" className="text-green-600 hover:text-green-500">
                    Termos de Serviço
                  </Link>{' '}
                  e{' '}
                  <Link to="/privacy" className="text-green-600 hover:text-green-500">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Criar Conta
              </Button>

              {(error || registerError) && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error || registerError}
                </div>
              )}

              <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Já tem uma conta?</span>{' '}
                <Link
                  to={`/login?type=${userType}`}
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Faça login
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;