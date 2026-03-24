import type { SensitivityLabel } from '@/types'

export const sensitivityLabels: SensitivityLabel[] = [
  { id: 'lbl-001', name: 'Public', description: 'Information approved for public disclosure.', priority: 0, color: '#66BB6A', tooltip: 'No restrictions on sharing', parentId: null, isActive: true },
  { id: 'lbl-002', name: 'Internal', description: 'General internal information not intended for external audiences.', priority: 1, color: '#42A5F5', tooltip: 'Internal use only', parentId: null, isActive: true },
  { id: 'lbl-003', name: 'Confidential', description: 'Sensitive business information requiring controlled access.', priority: 2, color: '#FFA726', tooltip: 'Restricted to authorized personnel', parentId: null, isActive: true },
  { id: 'lbl-004', name: 'Highly Confidential', description: 'Critical business information with strict access controls and encryption.', priority: 3, color: '#EF5350', tooltip: 'Encrypted, no external sharing', parentId: null, isActive: true },
  { id: 'lbl-005', name: 'Restricted — Finance', description: 'Financial records and reports restricted to Finance department and executive leadership.', priority: 4, color: '#AB47BC', tooltip: 'Finance & executive only', parentId: 'lbl-004', isActive: true },
  { id: 'lbl-006', name: 'Restricted — Legal', description: 'Attorney-client privileged documents and legal proceedings materials.', priority: 5, color: '#EC407A', tooltip: 'Legal team only, privilege protected', parentId: 'lbl-004', isActive: true },
  { id: 'lbl-007', name: 'Restricted — HR', description: 'Employee records, compensation data, and HR investigation materials.', priority: 6, color: '#78909C', tooltip: 'HR department only', parentId: 'lbl-004', isActive: false },
  { id: 'lbl-008', name: 'Personal', description: 'Non-business content for personal use.', priority: 7, color: '#BDBDBD', tooltip: 'User-applied personal label', parentId: null, isActive: true },
]
