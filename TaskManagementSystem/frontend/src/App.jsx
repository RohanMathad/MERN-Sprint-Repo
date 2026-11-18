import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // 1. Import it here
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Projects from './pages/Projects/Projects.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ProtectedRoute from './components/general/ProtectedRoute.jsx';
import MainLayout from './components/layout/MainLayout.jsx';

function App() {
  return (
    <AuthProvider> {/* 2. Wrap everything inside AuthProvider */}
      <AppThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                // Both admins and standard users can access the dashboard
                <ProtectedRoute allowedRoles={['super_admin', 'user']}>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                // ONLY admins can access the projects directory
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <MainLayout>
                    <Projects />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;