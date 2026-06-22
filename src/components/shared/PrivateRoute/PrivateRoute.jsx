import React, { Suspense } from 'react';
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
        {/* We use an empty div as fallback so that the user only sees the specific page's Skeleton loader */}
        <Suspense fallback={<div className="w-full min-h-screen"></div>}>
          <Outlet />
        </Suspense>
      </div>
    </DashboardLayout>
  );
};

export default PrivateRoute;
