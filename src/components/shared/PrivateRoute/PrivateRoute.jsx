import { Navigate, Outlet, ScrollRestoration } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { ROUTES } from '@/constants/routes.constants';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
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
