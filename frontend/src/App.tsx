import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import AccountantDashboard from './pages/accountant/AccountantDashboard';
import AssetForm from './pages/assets/AssetForm';
import AssetsList from './pages/assets/AssetsList';
import AssetAnalysis from './pages/assets/AssetAnalysis';
import ClientList from './pages/accountant/ClientList';
import ClientProfile from './pages/accountant/ClientProfile';
import ReportsPage from './pages/reports/ReportsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected client routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute userType="client">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assets/new"
              element={
                <ProtectedRoute userType="client">
                  <AssetForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assets/edit/:id"
              element={
                <ProtectedRoute userType="client">
                  <AssetForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assets"
              element={
                <ProtectedRoute userType="client">
                  <AssetsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assets/:id/analysis"
              element={
                <ProtectedRoute userType="client">
                  <AssetAnalysis />
                </ProtectedRoute>
              }
            />

            {/* Protected accountant routes */}
            <Route
              path="/accountant/dashboard"
              element={
                <ProtectedRoute userType="accountant">
                  <AccountantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accountant/clients"
              element={
                <ProtectedRoute userType="accountant">
                  <ClientList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accountant/clients/:id"
              element={
                <ProtectedRoute userType="accountant">
                  <ClientProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute userType="any">
                  <ReportsPage />
                </ProtectedRoute>
              }
            />

            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
