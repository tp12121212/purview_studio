import { useLocation, useNavigate } from 'react-router-dom'
import { Pin, PanelLeftClose, PanelLeft } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useLayoutStore } from '@/stores/useLayoutStore'

interface SubNavItem {
  label: string
  path: string
  children?: SubNavItem[]
}

const sectionNav: Record<string, { title: string; items: SubNavItem[] }> = {
  dlp: {
    title: 'Data Loss Prevention',
    items: [
      { label: 'Policies', path: '/dlp/policies' },
      { label: 'Rules', path: '/dlp/rules' },
    ],
  },
  labels: {
    title: 'Labels',
    items: [
      { label: 'Sensitivity Labels', path: '/labels/sensitivity' },
      { label: 'Label Policies', path: '/labels/policies' },
    ],
  },
  audit: {
    title: 'Audit',
    items: [
      { label: 'Activity Explorer', path: '/audit/activity' },
      { label: 'Content Explorer', path: '/audit/content' },
    ],
  },
  settings: {
    title: 'Settings',
    items: [
      { label: 'General', path: '/settings' },
      { label: 'Tenants', path: '/settings/tenants' },
    ],
  },
}

export function SubNavPanel() {
  const location = useLocation()
  const navigate = useNavigate()
  const { subNavCollapsed, subNavPinned, setSubNavCollapsed, setSubNavPinned } = useLayoutStore()

  const section = location.pathname.split('/')[1] || 'dlp'
  const nav = sectionNav[section] || sectionNav.dlp

  if (subNavCollapsed) {
    return (
      <div className="w-8 flex-shrink-0 bg-bg-secondary border-r border-border-default flex flex-col items-center pt-3">
        <button
          onClick={() => setSubNavCollapsed(false)}
          className="w-7 h-7 rounded-[4px] flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-hover transition-colors focus-visible:outline-2 focus-visible:outline-focus-ring"
          title="Expand panel"
        >
          <PanelLeft size={16} />
        </button>
      </div>
    )
  }

  return (
    <div className="w-52 flex-shrink-0 bg-bg-secondary border-r border-border-default flex flex-col">
      <div className="flex items-center justify-between px-4 h-12 border-b border-border-subtle">
        <h2 className="text-[13px] font-semibold text-text-primary truncate">{nav.title}</h2>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setSubNavPinned(!subNavPinned)}
            className={cn(
              'p-1 rounded-[4px] text-text-muted hover:text-text-primary hover:bg-hover',
              subNavPinned && 'text-accent-primary'
            )}
          >
            <Pin size={14} />
          </button>
          <button
            onClick={() => setSubNavCollapsed(true)}
            className="p-1 rounded-[4px] text-text-muted hover:text-text-primary hover:bg-hover"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {nav.items.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              'w-full text-left px-3 py-1.5 rounded-[4px] text-[13px] transition-colors',
              'focus-visible:outline-2 focus-visible:outline-focus-ring',
              location.pathname === item.path
                ? 'bg-active text-accent-primary font-medium'
                : 'text-text-secondary hover:bg-hover hover:text-text-primary'
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
