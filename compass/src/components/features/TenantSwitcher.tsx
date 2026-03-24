import { cn } from '@/lib/cn'
import { useTenantStore } from '@/stores/useTenantStore'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu'
import { Badge } from '@/components/ui/Badge'

export function TenantSwitcher() {
  const { currentTenantId, tenants, switchTenant } = useTenantStore()
  const currentTenant = tenants.find((t) => t.id === currentTenantId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative w-8 h-8 rounded-full flex items-center justify-center focus-visible:outline-2 focus-visible:outline-focus-ring">
          <div
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white',
              currentTenant?.environment === 'production' && 'ring-2 ring-accent-destructive ring-offset-1 ring-offset-bg-secondary'
            )}
            style={{ backgroundColor: currentTenant?.color ?? '#666' }}
          >
            {currentTenant?.name.charAt(0) ?? '?'}
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end">
        <DropdownMenuLabel>Switch Tenant</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {tenants.map((t) => (
          <DropdownMenuItem key={t.id} onClick={() => switchTenant(t.id)}>
            <div className="flex items-center gap-2 w-full">
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold text-white flex-shrink-0',
                  t.environment === 'production' && 'ring-1.5 ring-accent-destructive'
                )}
                style={{ backgroundColor: t.color }}
              >
                {t.name.charAt(0)}
              </div>
              <span className="flex-1 truncate">{t.name}</span>
              {t.id === currentTenantId && (
                <Badge variant="info">Active</Badge>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
