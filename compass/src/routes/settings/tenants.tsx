import { useTenantStore } from '@/stores/useTenantStore'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export default function TenantsPage() {
  const { currentTenantId, tenants, switchTenant } = useTenantStore()

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-h2 text-text-primary mb-6">Tenant Management</h1>

      <div className="space-y-3">
        {tenants.map((t) => (
          <Card key={t.id} className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold text-white flex-shrink-0',
                  t.environment === 'production' && 'ring-2 ring-accent-destructive ring-offset-1 ring-offset-bg-elevated'
                )}
                style={{ backgroundColor: t.color }}
              >
                {t.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-body font-medium text-text-primary">{t.name}</span>
                  <Badge variant={t.environment === 'production' ? 'error' : 'info'}>
                    {t.environment}
                  </Badge>
                  {t.id === currentTenantId && <Badge variant="success">Active</Badge>}
                </div>
                <span className="text-caption text-text-muted">{t.domain}</span>
              </div>
              {t.id !== currentTenantId && (
                <Button variant="secondary" size="sm" onClick={() => switchTenant(t.id)}>
                  Switch
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
