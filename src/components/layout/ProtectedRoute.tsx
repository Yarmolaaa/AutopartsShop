import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

/** Guards authenticated routes; bounces to /login, remembering where you came from. */
export function ProtectedRoute() {
  const isAuthenticated = useAppSelector((s) => Boolean(s.auth.token));
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
