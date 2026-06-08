import { Navigate, Outlet, ScrollRestoration } from 'react-router-dom';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';
import DashboardLayout from '@/components/Layout/DashboardLayout'
import { ROUTES } from '@/constants/routes.constants'

const PrivateRoute = () => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return (
    <DashboardLayout>
      <ScrollRestoration />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </DashboardLayout>
  )
}

export default PrivateRoute
