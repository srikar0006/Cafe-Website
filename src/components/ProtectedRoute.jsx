import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, isAllowed, redirectTo }) {
  return isAllowed ? children : <Navigate to={redirectTo} replace />;
}
