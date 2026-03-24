import { useThemeStore } from '@/stores/useThemeStore'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function SettingsPage() {
  const { theme, density, toggleTheme, setDensity } = useThemeStore()

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-h2 text-text-primary mb-6">Settings</h1>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="text-body font-medium text-text-primary mb-3">Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-body-sm text-text-primary">Theme</span>
              <p className="text-caption text-text-muted">Current: {theme}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={toggleTheme}>
              Switch to {theme === 'dark' ? 'light' : 'dark'}
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-body font-medium text-text-primary mb-3">Density</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-body-sm text-text-primary">Display density</span>
              <p className="text-caption text-text-muted">Current: {density}</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDensity(density === 'standard' ? 'compact' : 'standard')}
            >
              Switch to {density === 'standard' ? 'compact' : 'standard'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
