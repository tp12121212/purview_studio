import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { type ColumnDef } from '@tanstack/react-table'
import { queryKeys } from '@/api/queryKeys'
import { fetchAllPolicies } from '@/api/mockFetchers'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { SplitPane } from '@/components/ui/SplitPane'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useTenantStore } from '@/stores/useTenantStore'
import { useLayoutStore } from '@/stores/useLayoutStore'
import type { DlpPolicy } from '@/types'
import { Shield, Plus, RefreshCw } from 'lucide-react'

function modeBadgeVariant(mode: string) {
  switch (mode) {
    case 'enforce': return 'success' as const
    case 'test': return 'warning' as const
    default: return 'neutral' as const
  }
}

function PolicyDetail({ policy }: { policy: DlpPolicy }) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-h3 text-text-primary">{policy.name}</h2>
        <p className="text-body-sm text-text-secondary mt-1">{policy.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-caption text-text-muted block mb-1">Status</span>
          <Badge variant={policy.enabled ? 'success' : 'neutral'}>
            {policy.enabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>
        <div>
          <span className="text-caption text-text-muted block mb-1">Mode</span>
          <Badge variant={modeBadgeVariant(policy.mode)}>{policy.mode}</Badge>
        </div>
        <div>
          <span className="text-caption text-text-muted block mb-1">Priority</span>
          <span className="text-body-sm text-text-primary">{policy.priority}</span>
        </div>
        <div>
          <span className="text-caption text-text-muted block mb-1">Modified</span>
          <span className="text-body-sm text-text-primary">
            {new Date(policy.modifiedDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-body font-medium text-text-primary mb-3">
          Rules ({policy.rules.length})
        </h3>
        <div className="space-y-2">
          {policy.rules.map((rule) => (
            <Card key={rule.id} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-sm font-medium text-text-primary">{rule.name}</span>
                <Badge variant={rule.enabled ? 'success' : 'neutral'}>
                  {rule.enabled ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="space-y-1">
                <div>
                  <span className="text-caption text-text-muted">Conditions: </span>
                  <span className="text-caption text-text-secondary">{rule.conditions.join(' AND ')}</span>
                </div>
                <div>
                  <span className="text-caption text-text-muted">Actions: </span>
                  <span className="text-caption text-text-secondary">{rule.actions.join(', ')}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DlpPoliciesPage() {
  const currentTenantId = useTenantStore((s) => s.currentTenantId)
  const { splitPanePosition, setSplitPanePosition } = useLayoutStore()
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null)

  const { data: policies = [], isLoading } = useQuery({
    queryKey: queryKeys.policies.all(currentTenantId),
    queryFn: () => fetchAllPolicies(),
  })

  const selectedPolicy = policies.find((p) => p.id === selectedPolicyId)

  const columns = useMemo<ColumnDef<DlpPolicy, unknown>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Policy Name',
      cell: ({ getValue }) => (
        <span className="font-medium text-text-primary">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: 'mode',
      header: 'Mode',
      cell: ({ getValue }) => {
        const mode = getValue() as string
        return <Badge variant={modeBadgeVariant(mode)}>{mode}</Badge>
      },
    },
    {
      accessorKey: 'enabled',
      header: 'Status',
      cell: ({ getValue }) => {
        const enabled = getValue() as boolean
        return (
          <Badge variant={enabled ? 'success' : 'neutral'}>
            {enabled ? 'On' : 'Off'}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
    },
    {
      accessorKey: 'modifiedDate',
      header: 'Modified',
      cell: ({ getValue }) => (
        <span className="text-text-secondary">
          {new Date(getValue() as string).toLocaleDateString()}
        </span>
      ),
    },
  ], [])

  const masterContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-accent-primary" />
          <h1 className="text-h3 text-text-primary">DLP Policies</h1>
          <Badge variant="neutral">{policies.length}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <RefreshCw size={14} />
          </Button>
          <Button size="sm">
            <Plus size={14} />
            New Policy
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <DataTable
          data={policies}
          columns={columns}
          loading={isLoading}
          onRowClick={(row) => setSelectedPolicyId(row.id)}
          selectedRowId={selectedPolicyId ?? undefined}
          getRowId={(row) => row.id}
          emptyMessage="No DLP policies found for this tenant."
        />
      </div>
    </div>
  )

  const detailContent = selectedPolicy ? (
    <PolicyDetail policy={selectedPolicy} />
  ) : (
    <div className="flex items-center justify-center h-full text-text-muted text-body-sm">
      Select a policy to view details
    </div>
  )

  return (
    <SplitPane
      left={masterContent}
      right={detailContent}
      defaultPosition={splitPanePosition}
      onPositionChange={setSplitPanePosition}
    />
  )
}
