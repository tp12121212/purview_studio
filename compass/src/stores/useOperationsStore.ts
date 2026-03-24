import { create } from 'zustand'
import type { Operation } from '@/types'
import { operations as mockOps } from '@/mocks/operations'

interface OperationsState {
  operations: Operation[]
  addOperation: (op: Operation) => void
  updateOperation: (id: string, updates: Partial<Operation>) => void
  removeOperation: (id: string) => void
  counts: () => { total: number; running: number; failed: number; completed: number; queued: number }
}

export const useOperationsStore = create<OperationsState>((set, get) => ({
  operations: mockOps,
  addOperation: (op) => set((s) => ({ operations: [...s.operations, op] })),
  updateOperation: (id, updates) =>
    set((s) => ({
      operations: s.operations.map((o) => (o.id === id ? { ...o, ...updates } : o)),
    })),
  removeOperation: (id) =>
    set((s) => ({ operations: s.operations.filter((o) => o.id !== id) })),
  counts: () => {
    const ops = get().operations
    return {
      total: ops.length,
      running: ops.filter((o) => o.status === 'running').length,
      failed: ops.filter((o) => o.status === 'failed').length,
      completed: ops.filter((o) => o.status === 'completed').length,
      queued: ops.filter((o) => o.status === 'queued').length,
    }
  },
}))
