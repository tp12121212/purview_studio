import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/cn'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export function DropdownMenuContent({
  children,
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={4}
        className={cn(
          'z-50 min-w-[160px] bg-bg-elevated border border-border-default rounded-[6px] p-1 shadow-lg',
          'animate-in fade-in-0 zoom-in-95',
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuItem({
  children,
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[13px] text-text-primary cursor-pointer outline-none',
        'data-[highlighted]:bg-hover',
        'data-[disabled]:opacity-40 data-[disabled]:pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('h-px my-1 bg-border-default', className)}
    />
  )
}

export function DropdownMenuLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn('px-3 py-1.5 text-[11px] font-medium text-text-muted', className)}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  )
}
