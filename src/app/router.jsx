import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import PrivateRoute from '@/components/shared/PrivateRoute/PrivateRoute'
import AnonymousRoute from '@/components/shared/PrivateRoute/AnonymousRoute'
import ErrorBoundary from '@/components/shared/ErrorBoundary/ErrorBoundary'
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader'
import { ROUTES } from '@/constants/routes.constants'

import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import DealsPage from '@/features/deals/pages/DealsPage'
import CreateDealPage from '@/features/deals/pages/CreateDealPage'
import AnalyticsPage from '@/features/analytics/pages/AnalyticsPage'
import HelpCenterPage from '@/features/help/pages/HelpCenterPage'
import SettingsPage from '@/features/settings/pages/SettingsPage'
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage'

import NotFoundPage from '@/components/shared/NotFound/NotFoundPage'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace /> },

  {
    element: <AnonymousRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
    ],
  },

  {
    element:      <PrivateRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.DEALS, element: <DealsPage /> },
      { path: ROUTES.CREATE_DEAL, element: <CreateDealPage /> },
      { path: ROUTES.ANALYTICS, element: <AnalyticsPage /> },
      { path: ROUTES.HELP, element: <HelpCenterPage /> },
      { path: ROUTES.SETTINGS, element: <SettingsPage /> },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
])

export const AppRouter = () => (
  <ErrorBoundary>
    <Suspense fallback={<UniversalLoader fullScreen={true} />}>
      <RouterProvider router={router} />
    </Suspense>
  </ErrorBoundary>
)
