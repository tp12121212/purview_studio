import { create } from 'zustand'
import type { Tenant } from '@/types'
import { tenants } from '@/mocks/tenants'

interface TenantState {
  currentTenantId: string
  tenants: Tenant[]
  switchTenant: (id: string) => void
}

export const useTenantStore = create<TenantState>((set) => ({
  currentTenantId: tenants[0].id,
  tenants,
  switchTenant: (id) => set({ currentTenantId: id }),
}))
