import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/cn'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      {children}
    </TooltipPrimitive.Provider>
  )
}

export function Tooltip({ children, content, side = 'right', className }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={8}
          className={cn(
            'z-50 px-3 py-1.5 bg-bg-elevated border border-border-default rounded-[4px]',
            'text-[12px] text-text-primary shadow-md',
            'animate-in fade-in-0 zoom-in-95',
            className
          )}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
