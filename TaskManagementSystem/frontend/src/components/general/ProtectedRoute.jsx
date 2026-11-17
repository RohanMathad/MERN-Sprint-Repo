import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // If there is no token, kick them to the login screen
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, let them see the component (like Dashboard or Projects)
  return children;
};

export default ProtectedRoute;