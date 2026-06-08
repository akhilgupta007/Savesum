import React, { Suspense } from 'react';
import { Navigate, Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';
import DashboardLayout from '@/components/Layout/DashboardLayout'
import { ROUTES } from '@/constants/routes.constants'

const PrivateRoute = () => {
  const token = localStorage.getItem('accessToken')
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  const animationVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -15 },
  }

  return (
    <DashboardLayout>
      <ScrollRestoration />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animationVariants}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <Suspense fallback={<UniversalLoader />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  )
}

export default PrivateRoute
