import { Navigate, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { ROUTES } from '@/constants/routes.constants';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Preserve the intended destination so LoginForm can redirect back after login
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return (
    <DashboardLayout>
      <ScrollRestoration />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </DashboardLayout>
  );
};

export default PrivateRoute;
