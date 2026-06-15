import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '@/constants/routes.constants';

const AnonymousRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // While the silent refresh is running, render nothing to avoid a flash of the login page
  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default AnonymousRoute;
