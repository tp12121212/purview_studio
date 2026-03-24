import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { TooltipProvider } from '@/components/ui/Tooltip'
import { NavigationRail } from './NavigationRail'
import { SubNavPanel } from './SubNavPanel'
import { ContextBar } from './ContextBar'
import { OperationsPanel } from './OperationsPanel'
import { CommandPalette } from '@/components/features/CommandPalette'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'

export function AppLayout() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  useKeyboardShortcut('k', () => setCommandPaletteOpen(true), { meta: true })

  return (
    <TooltipProvider>
      <div className="h-screen flex overflow-hidden bg-bg-primary">
        <NavigationRail />
        <SubNavPanel />
        <div className="flex-1 flex flex-col min-w-0">
          <ContextBar onCommandPaletteOpen={() => setCommandPaletteOpen(true)} />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
          <OperationsPanel />
        </div>
      </div>
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </TooltipProvider>
  )
}
