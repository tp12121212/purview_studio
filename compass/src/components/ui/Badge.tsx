import { cn } from '@/lib/cn'

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-accent-success/20 text-accent-success',
  warning: 'bg-accent-warning/20 text-accent-warning',
  error: 'bg-accent-destructive/20 text-accent-destructive',
  info: 'bg-accent-primary/20 text-accent-primary',
  neutral: 'bg-bg-tertiary text-text-muted',
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-[2px] text-[11px] font-medium leading-4',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
