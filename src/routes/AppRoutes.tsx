import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../components/ErrorFallback'
import { LoadingFallback } from '../components/LoadingFallback'
import { MainLayout } from '../layouts/MainLayout'

const NotFound = lazy(() => import('../pages/NotFound'))

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MainLayout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
