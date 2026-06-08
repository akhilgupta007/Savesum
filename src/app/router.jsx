import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import PrivateRoute from '@/components/shared/PrivateRoute/PrivateRoute'
import ErrorBoundary from '@/components/shared/ErrorBoundary/ErrorBoundary'
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader'
import { ROUTES } from '@/constants/routes.constants'

const LoginPage     = lazy(() => import('@/features/auth/pages/LoginPage'))
const RegisterPage  = lazy(() => import('@/features/auth/pages/RegisterPage'))
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const DealsPage = lazy(() => import('@/features/deals/pages/DealsPage'))
const CreateDealPage = lazy(() => import('@/features/deals/pages/CreateDealPage'))
const AnalyticsPage = lazy(() => import('@/features/analytics/pages/AnalyticsPage'))
const HelpCenterPage = lazy(() => import('@/features/help/pages/HelpCenterPage'))
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'))
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'))

const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
  { path: ROUTES.LOGIN,    element: <LoginPage />, errorElement: <ErrorBoundary /> },
  { path: ROUTES.REGISTER, element: <RegisterPage />, errorElement: <ErrorBoundary /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage />, errorElement: <ErrorBoundary /> },

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

  { path: '*', element: <div>404 — Page not found</div> },
])

export const AppRouter = () => (
  <ErrorBoundary>
    <Suspense fallback={<UniversalLoader fullScreen={true} />}>
      <RouterProvider router={router} />
    </Suspense>
  </ErrorBoundary>
)
