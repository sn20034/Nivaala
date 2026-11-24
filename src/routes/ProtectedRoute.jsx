import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes/routePaths';

/**
 * Guards routes that require authentication and optionally a specific role.
 */
export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-3 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${ROUTES.LOGIN}?redirect=${redirect}`} replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return children;
}
