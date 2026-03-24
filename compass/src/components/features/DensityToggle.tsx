import { Rows3, Rows4 } from 'lucide-react'
import { useThemeStore } from '@/stores/useThemeStore'

export function DensityToggle() {
  const { density, setDensity } = useThemeStore()
  return (
    <button
      onClick={() => setDensity(density === 'standard' ? 'compact' : 'standard')}
      className="h-7 w-7 rounded-[4px] flex items-center justify-center text-text-muted hover:bg-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-focus-ring"
      aria-label={`Switch to ${density === 'standard' ? 'compact' : 'standard'} density`}
    >
      {density === 'standard' ? <Rows3 size={14} /> : <Rows4 size={14} />}
    </button>
  )
}
