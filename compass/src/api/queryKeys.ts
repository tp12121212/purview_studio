export const queryKeys = {
  policies: {
    all: (tenantId: string) => ['policies', tenantId] as const,
    detail: (tenantId: string, id: string) => ['policies', tenantId, id] as const,
  },
  labels: {
    all: (tenantId: string) => ['labels', tenantId] as const,
    detail: (tenantId: string, id: string) => ['labels', tenantId, id] as const,
  },
  operations: {
    all: () => ['operations'] as const,
  },
  tenants: {
    all: () => ['tenants'] as const,
  },
}
