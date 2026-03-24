import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export function DialogContent({
  children,
  className,
  ...props
}: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg-overlay" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'w-full max-w-lg bg-bg-elevated border border-border-default rounded-[6px] shadow-lg p-6',
          'focus:outline-none',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 text-text-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-focus-ring rounded-[4px] p-1">
          <X size={16} />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DialogTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <DialogPrimitive.Title className={cn('text-[18px] font-semibold text-text-primary mb-2', className)}>
      {children}
    </DialogPrimitive.Title>
  )
}

export function DialogDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <DialogPrimitive.Description className={cn('text-[13px] text-text-secondary', className)}>
      {children}
    </DialogPrimitive.Description>
  )
}
