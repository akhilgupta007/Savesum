import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import PrivateRoute from '@/components/shared/PrivateRoute/PrivateRoute'
import ErrorBoundary from '@/components/shared/ErrorBoundary/ErrorBoundary'
import { ROUTES } from '@/constants/routes.constants'

const LoginPage     = lazy(() => import('@/features/auth/pages/LoginPage'))
const RegisterPage  = lazy(() => import('@/features/auth/pages/RegisterPage'))
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const UsersPage     = lazy(() => import('@/features/users/pages/UsersPage'))

const router = createBrowserRouter([
  { path: ROUTES.LOGIN,    element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },

  {
    element:      <PrivateRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.USERS,     element: <UsersPage /> },
    ],
  },

  { path: '*', element: <div>404 — Page not found</div> },
])

export const AppRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <RouterProvider router={router} />
  </Suspense>
)
