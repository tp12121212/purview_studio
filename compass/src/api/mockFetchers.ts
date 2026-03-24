import { dlpPolicies } from '@/mocks/dlpPolicies'
import { sensitivityLabels } from '@/mocks/sensitivityLabels'
import type { DlpPolicy, SensitivityLabel } from '@/types'

function delay(ms?: number): Promise<void> {
  const wait = ms ?? Math.floor(Math.random() * 600) + 200
  return new Promise((resolve) => setTimeout(resolve, wait))
}

export async function fetchPolicies(tenantId: string): Promise<DlpPolicy[]> {
  await delay()
  return dlpPolicies.filter((p) => p.tenantId === tenantId)
}

export async function fetchPolicyById(tenantId: string, id: string): Promise<DlpPolicy | undefined> {
  await delay()
  return dlpPolicies.find((p) => p.tenantId === tenantId && p.id === id)
}

export async function fetchAllPolicies(): Promise<DlpPolicy[]> {
  await delay()
  return dlpPolicies
}

export async function fetchLabels(): Promise<SensitivityLabel[]> {
  await delay()
  return sensitivityLabels
}

export async function fetchLabelById(id: string): Promise<SensitivityLabel | undefined> {
  await delay()
  return sensitivityLabels.find((l) => l.id === id)
}
