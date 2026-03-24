import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Shield, Tags, Activity, Settings } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/cn'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CommandItem {
  id: string
  label: string
  section: string
  icon: React.ElementType
  action: () => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const items: CommandItem[] = useMemo(() => [
    { id: 'dlp-policies', label: 'DLP Policies', section: 'Navigation', icon: Shield, action: () => navigate('/dlp/policies') },
    { id: 'dlp-rules', label: 'DLP Rules', section: 'Navigation', icon: Shield, action: () => navigate('/dlp/rules') },
    { id: 'dlp-alerts', label: 'DLP Alerts', section: 'Navigation', icon: Shield, action: () => navigate('/dlp/alerts') },
    { id: 'sensitivity-labels', label: 'Sensitivity Labels', section: 'Navigation', icon: Tags, action: () => navigate('/labels/sensitivity') },
    { id: 'retention-labels', label: 'Retention Labels', section: 'Navigation', icon: Tags, action: () => navigate('/labels/retention') },
    { id: 'label-policies', label: 'Label Policies', section: 'Navigation', icon: Tags, action: () => navigate('/labels/policies') },
    { id: 'activity-explorer', label: 'Activity Explorer', section: 'Navigation', icon: Activity, action: () => navigate('/audit/activity') },
    { id: 'content-explorer', label: 'Content Explorer', section: 'Navigation', icon: Activity, action: () => navigate('/audit/content') },
    { id: 'settings', label: 'Settings', section: 'Navigation', icon: Settings, action: () => navigate('/settings') },
    { id: 'tenants', label: 'Tenant Management', section: 'Navigation', icon: Settings, action: () => navigate('/settings/tenants') },
  ], [navigate])

  const filtered = query
    ? items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : items

  const sections = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of filtered) {
      const list = map.get(item.section) || []
      list.push(item)
      map.set(item.section, list)
    }
    return map
  }, [filtered])

  function handleSelect(item: CommandItem) {
    item.action()
    onOpenChange(false)
    setQuery('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault()
      handleSelect(filtered[selectedIndex])
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setQuery('') }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg-overlay" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-[20%] z-50 -translate-x-1/2 w-full max-w-lg bg-bg-elevated border border-border-default rounded-[6px] shadow-lg overflow-hidden focus:outline-none"
          onKeyDown={handleKeyDown}
        >
          <DialogPrimitive.Title className="sr-only">Command Palette</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Search for pages and actions</DialogPrimitive.Description>
          <div className="flex items-center gap-3 px-4 h-12 border-b border-border-default">
            <Search size={16} className="text-text-muted flex-shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-muted outline-none"
            />
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 && (
              <div className="py-8 text-center text-[13px] text-text-muted">No results found</div>
            )}
            {Array.from(sections.entries()).map(([section, sectionItems]) => (
              <div key={section}>
                <div className="px-3 py-1.5 text-[11px] font-medium text-text-muted uppercase tracking-wider">
                  {section}
                </div>
                {sectionItems.map((item) => {
                  const globalIndex = filtered.indexOf(item)
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-[13px] text-text-primary',
                        globalIndex === selectedIndex ? 'bg-hover' : 'hover:bg-hover'
                      )}
                    >
                      <item.icon size={16} className="text-text-muted flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ArrowRight size={12} className="text-text-muted" />
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
