import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useContext(AuthContext);

  // 1. Not logged in? Kick to the login screen
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role Guard: If specific roles are required, check the user's role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If they are a 'user' trying to hit an 'admin' page, silently bounce them to the dashboard
    return <Navigate to="/" replace />;
  }

  // 3. Authorized! Let them see the component
  return children;
};

export default ProtectedRoute;