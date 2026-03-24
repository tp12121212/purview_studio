import { useCallback, useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

interface SplitPaneProps {
  left: React.ReactNode
  right: React.ReactNode
  defaultPosition?: number
  minLeft?: number
  minRight?: number
  onPositionChange?: (position: number) => void
  className?: string
}

export function SplitPane({
  left,
  right,
  defaultPosition = 420,
  minLeft = 280,
  minRight = 320,
  onPositionChange,
  className,
}: SplitPaneProps) {
  const [position, setPosition] = useState(defaultPosition)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const onMouseDown = useCallback(() => {
    dragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const maxLeft = rect.width - minRight
      const newPos = Math.max(minLeft, Math.min(maxLeft, e.clientX - rect.left))
      setPosition(newPos)
      onPositionChange?.(newPos)
    }
    function onMouseUp() {
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [minLeft, minRight, onPositionChange])

  return (
    <div ref={containerRef} className={cn('flex h-full overflow-hidden', className)}>
      <div className="overflow-auto" style={{ width: position }}>
        {left}
      </div>
      <div
        className="w-1 flex-shrink-0 bg-border-default hover:bg-accent-primary cursor-col-resize transition-colors"
        onMouseDown={onMouseDown}
      />
      <div className="flex-1 overflow-auto">{right}</div>
    </div>
  )
}
