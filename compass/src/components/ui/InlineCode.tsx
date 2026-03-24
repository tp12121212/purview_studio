import { cn } from '@/lib/cn'

interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'font-mono text-[90%] bg-bg-tertiary px-1.5 py-0.5 rounded-[4px]',
        'font-normal [font-variant-ligatures:none]',
        className
      )}
    >
      {children}
    </code>
  )
}
