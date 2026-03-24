import { create } from 'zustand'
import type { Theme, Density } from '@/types'

interface ThemeState {
  theme: Theme
  density: Density
  toggleTheme: () => void
  setDensity: (density: Density) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark',
  density: 'standard',
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark'
      const html = document.documentElement
      html.classList.add('no-transition')
      html.setAttribute('data-theme', next)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          html.classList.remove('no-transition')
        })
      })
      return { theme: next }
    }),
  setDensity: (density) =>
    set(() => {
      document.documentElement.setAttribute('data-density', density)
      return { density }
    }),
}))
