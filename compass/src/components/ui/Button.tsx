import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent-primary text-white hover:brightness-110 active:brightness-90',
  secondary: 'bg-transparent border border-border-default text-text-primary hover:bg-hover active:bg-active',
  destructive: 'bg-accent-destructive text-white hover:brightness-110 active:brightness-90',
  ghost: 'bg-transparent text-text-secondary hover:bg-hover active:bg-active',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-[12px]',
  md: 'h-8 px-4 text-[13px]',
  lg: 'h-9 px-5 text-[14px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-[4px] transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
        'disabled:opacity-40 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
)
Button.displayName = 'Button'
