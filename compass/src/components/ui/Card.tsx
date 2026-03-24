import { cn } from '@/lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-elevated border border-border-default rounded-[6px] shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
