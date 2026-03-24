import { useLocation } from 'react-router-dom'
import { Zap, Moon, Sun, Rows3, Rows4, ChevronRight, Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useThemeStore } from '@/stores/useThemeStore'
import { useOperationsStore } from '@/stores/useOperationsStore'
import { useLayoutStore } from '@/stores/useLayoutStore'
import { currentUser } from '@/mocks/users'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/DropdownMenu'
import { Tooltip } from '@/components/ui/Tooltip'

const breadcrumbMap: Record<string, string> = {
  dlp: 'DLP',
  labels: 'Labels',
  audit: 'Audit',
  settings: 'Settings',
  policies: 'Policies',
  rules: 'Rules',
  alerts: 'Alerts',
  sensitivity: 'Sensitivity Labels',
  retention: 'Retention Labels',
  activity: 'Activity Explorer',
  content: 'Content Explorer',
  tenants: 'Tenants',
}

interface ContextBarProps {
  onCommandPaletteOpen: () => void
}

export function ContextBar({ onCommandPaletteOpen }: ContextBarProps) {
  const location = useLocation()
  const { theme, density, toggleTheme, setDensity } = useThemeStore()
  const counts = useOperationsStore((s) => s.counts)()
  const { setOperationsPanelExpanded } = useLayoutStore()

  const segments = location.pathname.split('/').filter(Boolean)
  const isHome = location.pathname === '/'

  return (
    <div className="h-12 flex-shrink-0 border-b border-border-default bg-bg-secondary flex items-center px-4 gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[13px] min-w-0 flex-1">
        {isHome ? (
          <span className="text-text-primary font-medium">Home</span>
        ) : (
          segments.map((seg, i) => (
            <span key={i} className="flex items-center gap-1 min-w-0">
              {i > 0 && <ChevronRight size={12} className="text-text-muted flex-shrink-0" />}
              <span className={cn(
                'truncate',
                i === segments.length - 1 ? 'text-text-primary font-medium' : 'text-text-muted'
              )}>
                {breadcrumbMap[seg] || seg}
              </span>
            </span>
          ))
        )}
      </div>

      {/* Command palette trigger */}
      <button
        onClick={onCommandPaletteOpen}
        className="flex items-center gap-2 h-7 px-3 rounded-[4px] bg-bg-tertiary border border-border-subtle text-text-muted text-[12px] hover:border-border-default transition-colors min-w-[200px]"
      >
        <Search size={13} />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="text-[10px] bg-bg-secondary px-1.5 py-0.5 rounded-[2px] border border-border-subtle font-mono">⌘K</kbd>
      </button>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Operations badge */}
        <Tooltip content={`${counts.total} operations, ${counts.running} running`} side="bottom">
          <button
            onClick={() => setOperationsPanelExpanded(true)}
            className="flex items-center gap-1.5 h-7 px-2 rounded-[4px] text-text-muted hover:bg-hover hover:text-text-primary"
          >
            <Zap size={14} className={counts.running > 0 ? 'text-accent-secondary' : ''} />
            {counts.total > 0 && (
              <span className="text-[11px] font-medium">{counts.total}</span>
            )}
          </button>
        </Tooltip>

        {/* Density toggle */}
        <Tooltip content={`${density === 'standard' ? 'Compact' : 'Standard'} density`} side="bottom">
          <button
            onClick={() => setDensity(density === 'standard' ? 'compact' : 'standard')}
            className="h-7 w-7 rounded-[4px] flex items-center justify-center text-text-muted hover:bg-hover hover:text-text-primary"
          >
            {density === 'standard' ? <Rows3 size={14} /> : <Rows4 size={14} />}
          </button>
        </Tooltip>

        {/* Theme toggle */}
        <Tooltip content={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} side="bottom">
          <button
            onClick={toggleTheme}
            className="h-7 w-7 rounded-[4px] flex items-center justify-center text-text-muted hover:bg-hover hover:text-text-primary"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </Tooltip>

        {/* User avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-7 w-7 rounded-full bg-accent-primary/20 text-accent-primary text-[11px] font-semibold flex items-center justify-center focus-visible:outline-2 focus-visible:outline-focus-ring">
              {currentUser.avatarInitials}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
            <DropdownMenuLabel>{currentUser.role}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
