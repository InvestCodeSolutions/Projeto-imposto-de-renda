import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Menu, 
  ChevronDown, 
  User, 
  LogOut, 
  Settings, 
  Moon, 
  Sun,
  FileText
} from 'lucide-react';
import Button from '../common/Button';
import Logo from './Logo';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo className="h-8 w-auto" />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {isAuthenticated && user?.userType === 'client' && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/assets" 
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Meus Bens
                  </Link>
                  <Link 
                    to="/reports" 
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Relatórios
                  </Link>
                </>
              )}
              
              {isAuthenticated && user?.userType === 'accountant' && (
                <>
                  <Link 
                    to="/accountant/dashboard" 
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/accountant/clients" 
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Clientes
                  </Link>
                  <Link 
                    to="/reports" 
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Relatórios
                  </Link>
                </>
              )}
            </nav>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAuthenticated ? (
              <div className="relative ml-4">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center text-sm font-medium text-gray-700 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name} 
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      user?.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="ml-2 hidden lg:block">{user?.name}</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        Perfil
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <Settings size={16} className="mr-2" />
                        Configurações
                      </Link>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => {
                          handleLogout();
                          setProfileMenuOpen(false);
                        }}
                      >
                        <LogOut size={16} className="mr-2" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="flex md:hidden ml-4">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on mobile menu state */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3">
            <div className="space-y-1 pt-2 pb-3">
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2">
                  <Link to="/login">
                    <Button variant="outline\" fullWidth>
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" fullWidth>
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              )}
              
              {isAuthenticated && user?.userType === 'client' && (
                <>
                  <Link
                    to="/dashboard"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/assets"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    onClick={toggleMobileMenu}
                  >
                    Meus Bens
                  </Link>
                  <Link
                    to="/reports"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    onClick={toggleMobileMenu}
                  >
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2" />
                      Relatórios
                    </div>
                  </Link>
                </>
              )}
              
              {isAuthenticated && user?.userType === 'accountant' && (
                <>
                  <Link
                    to="/accountant/dashboard"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/accountant/clients"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    onClick={toggleMobileMenu}
                  >
                    Clientes
                  </Link>
                  <Link
                    to="/reports"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    onClick={toggleMobileMenu}
                  >
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2" />
                      Relatórios
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;