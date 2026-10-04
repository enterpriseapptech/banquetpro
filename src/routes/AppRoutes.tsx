import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../components/ErrorFallback'
import { LoadingFallback } from '../components/LoadingFallback'
import { MainLayout } from '../layouts/MainLayout'
import { PreloginLayout } from '../layouts/PreloginLayout'

const Signup = lazy(() => import('../pages/prelogin/Signup'))
const Login = lazy(() => import('../pages/prelogin/Login'))
const ForgotPassword = lazy(() => import('../pages/prelogin/ForgotPassword'))
const VerifyEmail = lazy(() => import('../pages/prelogin/VerifyEmail'))
const ResetPassword = lazy(() => import('../pages/prelogin/ResetPassword'))
const Dashboard = lazy(() => import('../pages/postlogin/Dashboard'))
const Subscriptions = lazy(() => import('../pages/postlogin/Subscriptions'))
const Payments = lazy(() => import('../pages/postlogin/Payments'))
const Fees = lazy(() => import('../pages/postlogin/Fees'))
const Providers = lazy(() => import('../pages/postlogin/Providers'))
const Kyc = lazy(() => import('../pages/postlogin/Kyc'))
const Support = lazy(() => import('../pages/postlogin/Support'))
const NotFound = lazy(() => import('../pages/NotFound'))

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route
              path="/signup"
              element={
                <PreloginLayout>
                  <Signup />
                </PreloginLayout>
              }
            />
            <Route
              path="/login"
              element={
                <PreloginLayout>
                  <Login />
                </PreloginLayout>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PreloginLayout>
                  <ForgotPassword />
                </PreloginLayout>
              }
            />
            <Route
              path="/verify-email"
              element={
                <PreloginLayout>
                  <VerifyEmail />
                </PreloginLayout>
              }
            />
            <Route
              path="/reset-password"
              element={
                <PreloginLayout>
                  <ResetPassword />
                </PreloginLayout>
              }
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/subscriptions"
              element={<Subscriptions />}
            />
            <Route
              path="/payments"
              element={<Payments />}
            />
            <Route
              path="/fees"
              element={<Fees />}
            />
            <Route
              path="/providers"
              element={<Providers />}
            />
            <Route
              path="/kyc"
              element={<Kyc />}
            />
            <Route
              path="/support"
              element={<Support />}
            />
            <Route
              path="/prelogin/signup"
              element={<Navigate to="/signup" replace />}
            />
            <Route
              path="/prelogin/login"
              element={<Navigate to="/login" replace />}
            />
            <Route
              path="/prelogin"
              element={<Navigate to="/signup" replace />}
            />

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="*"
              element={
                <MainLayout>
                  <NotFound />
                </MainLayout>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

