import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/api/queryKeys'
import { fetchLabels } from '@/api/mockFetchers'
import { useTenantStore } from '@/stores/useTenantStore'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default function SensitivityLabelsPage() {
  const currentTenantId = useTenantStore((s) => s.currentTenantId)
  const { data: labels = [], isLoading } = useQuery({
    queryKey: queryKeys.labels.all(currentTenantId),
    queryFn: fetchLabels,
  })

  return (
    <div className="p-6">
      <h1 className="text-h2 text-text-primary mb-4">Sensitivity Labels</h1>
      {isLoading ? (
        <p className="text-body-sm text-text-muted">Loading labels...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labels.map((label) => (
            <Card key={label.id} className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: label.color }} />
                <span className="text-body font-medium text-text-primary">{label.name}</span>
                <Badge variant={label.isActive ? 'success' : 'neutral'} className="ml-auto">
                  {label.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <p className="text-body-sm text-text-secondary">{label.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
