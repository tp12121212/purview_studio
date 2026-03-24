import { cn } from '@/lib/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-elevated border border-border-default rounded-[6px] shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
