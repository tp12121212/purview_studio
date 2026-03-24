import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/stores/useThemeStore'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()
  return (
    <button
      onClick={toggleTheme}
      className="h-7 w-7 rounded-[4px] flex items-center justify-center text-text-muted hover:bg-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-focus-ring"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}
