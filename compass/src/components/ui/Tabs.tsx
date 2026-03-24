import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/cn'

export const Tabs = TabsPrimitive.Root

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <TabsPrimitive.List
      className={cn(
        'flex border-b border-border-default gap-0',
        className
      )}
    >
      {children}
    </TabsPrimitive.List>
  )
}

export function TabsTrigger({
  children,
  className,
  ...props
}: TabsPrimitive.TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'px-4 py-2 text-[13px] font-medium text-text-muted',
        'border-b-2 border-transparent -mb-px',
        'hover:text-text-primary',
        'data-[state=active]:text-accent-primary data-[state=active]:border-accent-primary',
        'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus-ring',
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

export function TabsContent({
  children,
  className,
  ...props
}: TabsPrimitive.TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn('pt-4 focus:outline-none', className)}
      {...props}
    >
      {children}
    </TabsPrimitive.Content>
  )
}
