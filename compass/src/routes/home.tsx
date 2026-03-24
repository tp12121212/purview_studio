import { useNavigate } from 'react-router-dom'
import {
  Shield,
  Tags,
  Activity,
  Settings,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Zap,
  Globe,
  Lock,
  FileSearch,
  GitBranch,
  Layers,
  TrendingUp,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useTenantStore } from '@/stores/useTenantStore'
import { useOperationsStore } from '@/stores/useOperationsStore'
import { dlpPolicies } from '@/mocks/dlpPolicies'
import { sensitivityLabels } from '@/mocks/sensitivityLabels'
import { cn } from '@/lib/cn'

// Workflow steps for the architecture diagram
const workflowSteps = [
  {
    icon: Globe,
    label: 'Connect Tenants',
    description: 'Link M365 tenants via app registration',
    color: 'text-accent-primary',
    bgColor: 'bg-accent-primary/10',
  },
  {
    icon: FileSearch,
    label: 'Discover Policies',
    description: 'Sync DLP policies, labels & rules',
    color: 'text-accent-secondary',
    bgColor: 'bg-accent-secondary/10',
  },
  {
    icon: GitBranch,
    label: 'Compare & Audit',
    description: 'Diff policies across tenants',
    color: 'text-accent-success',
    bgColor: 'bg-accent-success/10',
  },
  {
    icon: Zap,
    label: 'Execute Operations',
    description: 'Run PowerShell cmdlets safely',
    color: 'text-accent-warning',
    bgColor: 'bg-accent-warning/10',
  },
]

function StatCard({ label, value, trend, icon: Icon, onClick }: {
  label: string
  value: number | string
  trend?: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  onClick?: () => void
}) {
  return (
    <Card className="p-4 cursor-pointer hover:border-border-strong transition-colors" onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-[6px] bg-accent-primary/10 flex items-center justify-center">
          <Icon size={18} className="text-accent-primary" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[11px] text-accent-success">
            <TrendingUp size={12} />
            {trend}
          </div>
        )}
      </div>
      <div className="text-[24px] font-semibold text-text-primary leading-tight">{value}</div>
      <div className="text-[12px] text-text-muted mt-1">{label}</div>
    </Card>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const { currentTenantId, tenants } = useTenantStore()
  const operations = useOperationsStore((s) => s.operations)
  const currentTenant = tenants.find((t) => t.id === currentTenantId)

  const tenantPolicies = dlpPolicies.filter((p) => p.tenantId === currentTenantId)
  const enforcingCount = tenantPolicies.filter((p) => p.mode === 'enforce' && p.enabled).length
  const testingCount = tenantPolicies.filter((p) => p.mode === 'test' && p.enabled).length
  const disabledCount = tenantPolicies.filter((p) => !p.enabled).length
  const activeLabels = sensitivityLabels.filter((l) => l.isActive).length

  const runningOps = operations.filter((o) => o.status === 'running').length

  const quickActions = [
    { label: 'DLP Policies', description: 'Manage data loss prevention policies', icon: Shield, path: '/dlp/policies', count: tenantPolicies.length },
    { label: 'Sensitivity Labels', description: 'Configure classification labels', icon: Tags, path: '/labels/sensitivity', count: activeLabels },
    { label: 'Activity Explorer', description: 'Investigate compliance activity', icon: Activity, path: '/audit/activity' },
    { label: 'Settings', description: 'Configure tenants & preferences', icon: Settings, path: '/settings' },
  ]

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-[1200px] mx-auto p-6 space-y-8">
        {/* Hero / Welcome */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-h1 text-text-primary">Welcome to Compass</h1>
            <p className="text-body text-text-secondary mt-2 max-w-[600px]">
              Unified compliance management for Microsoft Purview. Monitor DLP policies, sensitivity labels, and audit activity across all your M365 tenants from a single pane of glass.
            </p>
          </div>
          {currentTenant && (
            <div className="flex items-center gap-3 bg-bg-elevated border border-border-default rounded-[6px] px-4 py-3">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold text-white flex-shrink-0',
                  currentTenant.environment === 'production' && 'ring-2 ring-accent-destructive ring-offset-1 ring-offset-bg-elevated'
                )}
                style={{ backgroundColor: currentTenant.color }}
              >
                {currentTenant.name.charAt(0)}
              </div>
              <div>
                <div className="text-[13px] font-medium text-text-primary">{currentTenant.name}</div>
                <div className="text-[11px] text-text-muted">{currentTenant.domain}</div>
              </div>
              <Badge variant={currentTenant.environment === 'production' ? 'error' : 'info'}>
                {currentTenant.environment}
              </Badge>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            icon={Shield}
            label="DLP Policies"
            value={tenantPolicies.length}
            onClick={() => navigate('/dlp/policies')}
          />
          <StatCard
            icon={Lock}
            label="Enforcing"
            value={enforcingCount}
            trend={enforcingCount > 0 ? 'Active' : undefined}
          />
          <StatCard
            icon={Tags}
            label="Active Labels"
            value={activeLabels}
            onClick={() => navigate('/labels/sensitivity')}
          />
          <StatCard
            icon={Zap}
            label="Operations"
            value={operations.length}
            trend={runningOps > 0 ? `${runningOps} running` : undefined}
          />
        </div>

        {/* Architecture Flow */}
        <Card className="p-6">
          <h2 className="text-h3 text-text-primary mb-2">How Compass Works</h2>
          <p className="text-body-sm text-text-secondary mb-6">
            Compass connects to your Microsoft 365 tenants and provides centralized management of compliance configurations.
          </p>
          <div className="flex items-start gap-2">
            {workflowSteps.map((step, i) => (
              <div key={i} className="flex items-start flex-1">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className={cn('w-12 h-12 rounded-[6px] flex items-center justify-center mb-3', step.bgColor)}>
                    <step.icon size={22} className={step.color} />
                  </div>
                  <div className="text-[13px] font-medium text-text-primary mb-1">{step.label}</div>
                  <div className="text-[12px] text-text-muted leading-4">{step.description}</div>
                </div>
                {i < workflowSteps.length - 1 && (
                  <div className="flex-shrink-0 mt-5 px-1">
                    <ArrowRight size={16} className="text-border-strong" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {/* Quick Actions */}
          <div className="col-span-2">
            <h2 className="text-h3 text-text-primary mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Card
                  key={action.path}
                  className="p-4 cursor-pointer hover:border-border-strong transition-colors group"
                >
                  <button
                    onClick={() => navigate(action.path)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-9 h-9 rounded-[6px] bg-bg-tertiary flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
                        <action.icon size={18} className="text-text-muted group-hover:text-accent-primary transition-colors" />
                      </div>
                      {action.count !== undefined && (
                        <Badge variant="neutral">{action.count}</Badge>
                      )}
                    </div>
                    <div className="text-[14px] font-medium text-text-primary mb-1">{action.label}</div>
                    <div className="text-[12px] text-text-muted">{action.description}</div>
                  </button>
                </Card>
              ))}
            </div>
          </div>

          {/* Policy Health */}
          <div>
            <h2 className="text-h3 text-text-primary mb-3">Policy Health</h2>
            <Card className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-accent-success" />
                    <span className="text-[13px] text-text-primary">Enforcing</span>
                  </div>
                  <span className="text-[13px] font-medium text-text-primary">{enforcingCount}</span>
                </div>
                <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-success rounded-full transition-all"
                    style={{ width: tenantPolicies.length > 0 ? `${(enforcingCount / tenantPolicies.length) * 100}%` : '0%' }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-accent-warning" />
                    <span className="text-[13px] text-text-primary">Testing</span>
                  </div>
                  <span className="text-[13px] font-medium text-text-primary">{testingCount}</span>
                </div>
                <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-warning rounded-full transition-all"
                    style={{ width: tenantPolicies.length > 0 ? `${(testingCount / tenantPolicies.length) * 100}%` : '0%' }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle size={14} className="text-text-muted" />
                    <span className="text-[13px] text-text-primary">Disabled</span>
                  </div>
                  <span className="text-[13px] font-medium text-text-primary">{disabledCount}</span>
                </div>
                <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-text-muted rounded-full transition-all"
                    style={{ width: tenantPolicies.length > 0 ? `${(disabledCount / tenantPolicies.length) * 100}%` : '0%' }}
                  />
                </div>
              </div>

              <div className="border-t border-border-subtle pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => navigate('/dlp/policies')}
                >
                  View All Policies
                  <ArrowRight size={14} />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Operations */}
        <div>
          <h2 className="text-h3 text-text-primary mb-3">Recent Operations</h2>
          <Card className="divide-y divide-border-subtle">
            {operations.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-body-sm">
                No operations yet. Run a PowerShell cmdlet to see it here.
              </div>
            ) : (
              operations.slice(0, 5).map((op) => (
                <div key={op.id} className="flex items-center gap-4 px-4 py-3">
                  <div className="flex-shrink-0">
                    {op.status === 'completed' && <CheckCircle2 size={16} className="text-accent-success" />}
                    {op.status === 'running' && <Clock size={16} className="text-accent-secondary animate-pulse" />}
                    {op.status === 'failed' && <XCircle size={16} className="text-accent-destructive" />}
                    {op.status === 'queued' && <Clock size={16} className="text-text-muted" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-text-primary font-mono">{op.cmdlet}</span>
                      <Badge variant="neutral">{op.tenant}</Badge>
                    </div>
                    <div className="text-[12px] text-text-muted mt-0.5">{op.currentStage}</div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {op.status === 'running' && (
                      <div className="w-20 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-secondary rounded-full"
                          style={{ width: `${op.progress}%` }}
                        />
                      </div>
                    )}
                    <Badge
                      variant={
                        op.status === 'completed' ? 'success' :
                        op.status === 'running' ? 'warning' :
                        op.status === 'failed' ? 'error' : 'neutral'
                      }
                    >
                      {op.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>

        {/* Tenant Overview */}
        <div>
          <h2 className="text-h3 text-text-primary mb-3">Connected Tenants</h2>
          <div className="grid grid-cols-3 gap-4">
            {tenants.map((tenant) => {
              const tPolicies = dlpPolicies.filter((p) => p.tenantId === tenant.id)
              return (
                <Card key={tenant.id} className={cn(
                  'p-4 transition-colors',
                  tenant.id === currentTenantId && 'border-accent-primary'
                )}>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold text-white flex-shrink-0',
                        tenant.environment === 'production' && 'ring-2 ring-accent-destructive ring-offset-1 ring-offset-bg-elevated'
                      )}
                      style={{ backgroundColor: tenant.color }}
                    >
                      {tenant.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14px] font-medium text-text-primary truncate">{tenant.name}</div>
                      <div className="text-[12px] text-text-muted truncate">{tenant.domain}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={tenant.environment === 'production' ? 'error' : 'info'}>
                      {tenant.environment}
                    </Badge>
                    <span className="text-[12px] text-text-muted">{tPolicies.length} policies</span>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Architecture Diagram */}
        <Card className="p-6">
          <h2 className="text-h3 text-text-primary mb-2">Platform Architecture</h2>
          <p className="text-body-sm text-text-secondary mb-6">
            Compass bridges the gap between Microsoft Purview's PowerShell-based management and a modern web interface.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {/* Layer 1: Frontend */}
            <div className="space-y-3">
              <div className="text-[12px] font-semibold text-accent-primary uppercase tracking-wider">Frontend</div>
              <div className="space-y-2">
                {['React SPA', 'Design System', 'Real-time Updates'].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-2 bg-bg-tertiary rounded-[4px] border border-border-subtle">
                    <Layers size={14} className="text-accent-primary flex-shrink-0" />
                    <span className="text-[13px] text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Layer 2: API */}
            <div className="space-y-3">
              <div className="text-[12px] font-semibold text-accent-secondary uppercase tracking-wider">API Layer</div>
              <div className="space-y-2">
                {['REST API', 'SignalR Hub', 'Operation Queue'].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-2 bg-bg-tertiary rounded-[4px] border border-border-subtle">
                    <GitBranch size={14} className="text-accent-secondary flex-shrink-0" />
                    <span className="text-[13px] text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Layer 3: Backend */}
            <div className="space-y-3">
              <div className="text-[12px] font-semibold text-accent-success uppercase tracking-wider">Backend</div>
              <div className="space-y-2">
                {['PowerShell Engine', 'M365 Connector', 'Tenant Isolation'].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-2 bg-bg-tertiary rounded-[4px] border border-border-subtle">
                    <Lock size={14} className="text-accent-success flex-shrink-0" />
                    <span className="text-[13px] text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
