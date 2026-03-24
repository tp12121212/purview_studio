import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Skeleton } from '@/components/ui/Skeleton'

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="space-y-2 mt-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

const Home = lazy(() => import('./home'))
const DlpPolicies = lazy(() => import('./dlp/policies'))
const PolicyDetail = lazy(() => import('./dlp/policy-detail'))
const DlpRules = lazy(() => import('./dlp/rules'))
const DlpAlerts = lazy(() => import('./dlp/alerts'))
const SensitivityLabels = lazy(() => import('./labels/sensitivity'))
const RetentionLabels = lazy(() => import('./labels/retention'))
const LabelPolicies = lazy(() => import('./labels/policies'))
const ActivityExplorer = lazy(() => import('./audit/activity'))
const ContentExplorer = lazy(() => import('./audit/content'))
const Settings = lazy(() => import('./settings/index'))
const Tenants = lazy(() => import('./settings/tenants'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      {
        path: 'dlp/policies',
        element: <Suspense fallback={<PageLoader />}><DlpPolicies /></Suspense>,
      },
      {
        path: 'dlp/policies/:id',
        element: <Suspense fallback={<PageLoader />}><PolicyDetail /></Suspense>,
      },
      {
        path: 'dlp/rules',
        element: <Suspense fallback={<PageLoader />}><DlpRules /></Suspense>,
      },
      {
        path: 'dlp/alerts',
        element: <Suspense fallback={<PageLoader />}><DlpAlerts /></Suspense>,
      },
      {
        path: 'labels/sensitivity',
        element: <Suspense fallback={<PageLoader />}><SensitivityLabels /></Suspense>,
      },
      {
        path: 'labels/retention',
        element: <Suspense fallback={<PageLoader />}><RetentionLabels /></Suspense>,
      },
      {
        path: 'labels/policies',
        element: <Suspense fallback={<PageLoader />}><LabelPolicies /></Suspense>,
      },
      {
        path: 'audit/activity',
        element: <Suspense fallback={<PageLoader />}><ActivityExplorer /></Suspense>,
      },
      {
        path: 'audit/content',
        element: <Suspense fallback={<PageLoader />}><ContentExplorer /></Suspense>,
      },
      {
        path: 'settings',
        element: <Suspense fallback={<PageLoader />}><Settings /></Suspense>,
      },
      {
        path: 'settings/tenants',
        element: <Suspense fallback={<PageLoader />}><Tenants /></Suspense>,
      },
    ],
  },
])
