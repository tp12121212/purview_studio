import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-[13px] font-medium text-text-primary">
            {label}
          </label>
        )}
        {description && (
          <span className="text-[12px] text-text-muted">{description}</span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-8 px-3 rounded-[4px] bg-bg-secondary border text-[14px] text-text-primary',
            'placeholder:text-text-muted',
            'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus-ring',
            'disabled:opacity-40 disabled:pointer-events-none',
            error ? 'border-accent-destructive' : 'border-border-default',
            '[data-density="compact"] &:h-7',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-[12px] text-accent-destructive">{error}</span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
