// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render children (protected component) if authenticated
};

export default ProtectedRoute;
