export interface Tenant {
  id: string
  name: string
  domain: string
  environment: 'production' | 'development'
  color: string
}

export interface DlpPolicy {
  id: string
  name: string
  description: string
  enabled: boolean
  mode: 'enforce' | 'test' | 'disabled'
  createdDate: string
  modifiedDate: string
  priority: number
  tenantId: string
  rules: DlpRule[]
}

export interface DlpRule {
  id: string
  name: string
  conditions: string[]
  actions: string[]
  priority: number
  enabled: boolean
}

export interface SensitivityLabel {
  id: string
  name: string
  description: string
  priority: number
  color: string
  tooltip: string
  parentId: string | null
  isActive: boolean
}

export interface Operation {
  id: string
  cmdlet: string
  tenant: string
  status: 'queued' | 'running' | 'completed' | 'failed'
  startedAt: string
  completedAt: string | null
  progress: number
  currentStage: string
  output: string[]
  error: string | null
}

export interface User {
  name: string
  email: string
  role: string
  avatarInitials: string
}

export type Theme = 'dark' | 'light'
export type Density = 'standard' | 'compact'

export interface NavItem {
  id: string
  label: string
  icon: string
  path: string
  children?: NavItem[]
}
