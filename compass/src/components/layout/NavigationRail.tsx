import { useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Shield, Tags, Activity, Settings, PanelLeftClose, PanelLeft, Home } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Tooltip } from '@/components/ui/Tooltip'
import { useTenantStore } from '@/stores/useTenantStore'
import { useLayoutStore } from '@/stores/useLayoutStore'

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'dlp', label: 'Data Loss Prevention', icon: Shield, path: '/dlp/policies' },
  { id: 'labels', label: 'Sensitivity Labels', icon: Tags, path: '/labels/sensitivity' },
  { id: 'audit', label: 'Audit', icon: Activity, path: '/audit/activity' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
]

export function NavigationRail() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentTenantId, tenants } = useTenantStore()
  const { navRailExpanded: expanded, setNavRailExpanded, setSubNavCollapsed } = useLayoutStore()
  const currentTenant = tenants.find((t) => t.id === currentTenantId)

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/'
    const section = path.split('/')[1]
    return location.pathname.startsWith(`/${section}`)
  }

  function handleNavClick(path: string) {
    if (!expanded) {
      setNavRailExpanded(true)
      setSubNavCollapsed(false)
    }
    navigate(path)
  }

  function handleCollapse() {
    setNavRailExpanded(false)
  }

  function handleExpand() {
    setNavRailExpanded(true)
  }

  return (
    <nav
      className={cn(
        'flex-shrink-0 bg-bg-secondary border-r border-border-default flex flex-col py-3 transition-[width] duration-200',
        expanded ? 'px-3' : 'items-center'
      )}
      style={{ width: expanded ? 192 : 48 }}
    >
      {/* Logo / Home */}
      <div className={cn('flex items-center mb-2', expanded ? 'gap-3 px-1' : 'justify-center')}>
        <button
          onClick={() => navigate('/')}
          className="w-8 h-8 rounded-[4px] flex items-center justify-center text-accent-primary hover:bg-hover focus-visible:outline-2 focus-visible:outline-focus-ring flex-shrink-0"
        >
          <LayoutDashboard size={20} />
        </button>
        {expanded && (
          <>
            <span className="text-[14px] font-semibold text-text-primary truncate flex-1">Compass</span>
            <button
              onClick={handleCollapse}
              className="p-1 rounded-[4px] text-text-muted hover:text-text-primary hover:bg-hover transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring flex-shrink-0"
            >
              <PanelLeftClose size={14} />
            </button>
          </>
        )}
      </div>
      {/* Expand button when collapsed */}
      {!expanded && (
        <div className="flex justify-center mb-2">
          <Tooltip content="Expand menu" side="right">
            <button
              onClick={handleExpand}
              className="w-8 h-8 rounded-[4px] flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-hover transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring"
            >
              <PanelLeft size={16} />
            </button>
          </Tooltip>
        </div>
      )}

      {/* Nav items */}
      <div className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <div key={item.id}>
            {!expanded ? (
              <Tooltip content={item.label} side="right">
                <button
                  onClick={() => handleNavClick(item.path)}
                  className={cn(
                    'w-8 h-8 rounded-[4px] flex items-center justify-center transition-colors',
                    'focus-visible:outline-2 focus-visible:outline-focus-ring',
                    isActive(item.path)
                      ? 'bg-active text-accent-primary'
                      : 'text-text-muted hover:bg-hover hover:text-text-primary'
                  )}
                >
                  <item.icon size={18} />
                </button>
              </Tooltip>
            ) : (
              <button
                onClick={() => handleNavClick(item.path)}
                className={cn(
                  'w-full rounded-[4px] flex items-center gap-3 px-2 h-8 transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-focus-ring',
                  isActive(item.path)
                    ? 'bg-active text-accent-primary'
                    : 'text-text-muted hover:bg-hover hover:text-text-primary'
                )}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="text-[13px] truncate">{item.label}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Collapse/Expand toggle */}
      <div className={cn('border-t border-border-default pt-2 mb-2', expanded ? 'mx-0' : 'mx-1')}>
        {expanded ? (
          <button
            onClick={handleCollapse}
            className="w-full rounded-[4px] flex items-center gap-3 px-2 h-8 text-text-muted hover:bg-hover hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring"
          >
            <PanelLeftClose size={18} className="flex-shrink-0" />
            <span className="text-[13px]">Collapse</span>
          </button>
        ) : (
          <Tooltip content="Expand menu" side="right">
            <button
              onClick={handleExpand}
              className="w-8 h-8 rounded-[4px] flex items-center justify-center text-text-muted hover:bg-hover hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring"
            >
              <PanelLeft size={18} />
            </button>
          </Tooltip>
        )}
      </div>

      {/* Tenant Switcher */}
      {expanded ? (
        <button className="flex items-center gap-3 px-1 h-9 rounded-[4px] hover:bg-hover transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring">
          <div
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0',
              currentTenant?.environment === 'production' && 'ring-2 ring-accent-destructive ring-offset-1 ring-offset-bg-secondary'
            )}
            style={{ backgroundColor: currentTenant?.color ?? '#666' }}
          >
            {currentTenant?.name.charAt(0) ?? '?'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-medium text-text-primary truncate">{currentTenant?.name}</span>
            <span className="text-[11px] text-text-muted truncate">{currentTenant?.environment}</span>
          </div>
        </button>
      ) : (
        <Tooltip content={currentTenant?.name ?? 'Select tenant'} side="right">
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
        </Tooltip>
      )}
    </nav>
  )
}
