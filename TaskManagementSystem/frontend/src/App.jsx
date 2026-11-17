import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'; // <-- 1. Import ThemeProvider
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Projects from './pages/Projects/Projects.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ProtectedRoute from './components/general/ProtectedRoute.jsx';

// 2. Define the missing theme object
const theme = {
  colors: {
    primary: '#007bff',
    background: '#f4f7f6',
    surface: '#ffffff',
    border: '#e0e0e0',
    text: '#333333',
    textSecondary: '#6c757d',
  }
};

function App() {
  return (
    /* 3. Wrap the entire app so all components have access to props.theme */
    <ThemeProvider theme={theme}> 
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;