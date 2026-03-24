import { ChevronUp, ChevronDown, AlertCircle, CheckCircle2, Loader2, Clock } from 'lucide-react'
import { useLayoutStore } from '@/stores/useLayoutStore'
import { useOperationsStore } from '@/stores/useOperationsStore'
import { Badge } from '@/components/ui/Badge'
import { InlineCode } from '@/components/ui/InlineCode'
import { useState } from 'react'

export function OperationsPanel() {
  const { operationsPanelExpanded, setOperationsPanelExpanded, operationsPanelHeight } = useLayoutStore()
  const { operations } = useOperationsStore()
  const counts = useOperationsStore((s) => s.counts)()
  const [expandedOp, setExpandedOp] = useState<string | null>(null)

  const sorted = [...operations].sort((a, b) => {
    const order = { failed: 0, running: 1, queued: 2, completed: 3 }
    return order[a.status] - order[b.status]
  })

  if (!operationsPanelExpanded) {
    return (
      <button
        onClick={() => setOperationsPanelExpanded(true)}
        className="h-8 flex-shrink-0 border-t border-border-default bg-bg-secondary flex items-center px-4 gap-3 w-full hover:bg-hover transition-colors"
      >
        <ChevronUp size={14} className="text-text-muted" />
        <span className="text-[12px] text-text-secondary">
          {counts.total} operation{counts.total !== 1 ? 's' : ''}
          {counts.running > 0 && (
            <span className="text-accent-secondary"> · {counts.running} running</span>
          )}
          {counts.failed > 0 && (
            <span className="text-accent-destructive"> · {counts.failed} failed</span>
          )}
        </span>
        {counts.running > 0 && (
          <div className="flex-1 max-w-32 h-1 bg-bg-tertiary rounded-full overflow-hidden">
            <div className="h-full bg-accent-primary rounded-full transition-all" style={{ width: '67%' }} />
          </div>
        )}
      </button>
    )
  }

  return (
    <div
      className="flex-shrink-0 border-t border-border-default bg-bg-secondary flex flex-col"
      style={{ height: operationsPanelHeight }}
    >
      <div className="h-8 flex items-center justify-between px-4 border-b border-border-subtle">
        <span className="text-[12px] font-medium text-text-primary">Operations</span>
        <button
          onClick={() => setOperationsPanelExpanded(false)}
          className="p-0.5 rounded-[4px] text-text-muted hover:text-text-primary hover:bg-hover"
        >
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sorted.map((op) => (
          <div key={op.id} className="border-b border-border-subtle">
            <button
              onClick={() => setExpandedOp(expandedOp === op.id ? null : op.id)}
              className="w-full flex items-center gap-3 px-4 h-8 hover:bg-hover transition-colors text-left"
            >
              <StatusIcon status={op.status} />
              <InlineCode className="text-[11px]">{op.cmdlet}</InlineCode>
              <span className="text-[11px] text-text-muted truncate">{op.tenant}</span>
              <span className="flex-1" />
              {op.status === 'running' && (
                <span className="text-[11px] text-accent-secondary">{op.progress}%</span>
              )}
              <Badge variant={statusVariant(op.status)} className="text-[10px]">
                {op.currentStage}
              </Badge>
            </button>
            {expandedOp === op.id && (
              <div className="bg-bg-primary border-t border-border-subtle px-4 py-2 max-h-32 overflow-y-auto">
                <pre className="text-[12px] font-mono leading-5 text-text-secondary [font-variant-ligatures:none]">
                  {op.output.join('\n')}
                  {op.error && (
                    <span className="text-accent-destructive block mt-1">ERROR: {op.error}</span>
                  )}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 size={14} className="text-accent-success flex-shrink-0" />
    case 'failed':
      return <AlertCircle size={14} className="text-accent-destructive flex-shrink-0" />
    case 'running':
      return <Loader2 size={14} className="text-accent-primary flex-shrink-0 animate-spin" />
    case 'queued':
      return <Clock size={14} className="text-text-muted flex-shrink-0" />
    default:
      return null
  }
}

function statusVariant(status: string) {
  switch (status) {
    case 'completed': return 'success' as const
    case 'failed': return 'error' as const
    case 'running': return 'info' as const
    default: return 'neutral' as const
  }
}
