import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { queryClient } from '@/api/queryClient'
import { router } from '@/routes'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-default)',
            color: 'var(--color-text-primary)',
          },
        }}
      />
    </QueryClientProvider>
  )
}
