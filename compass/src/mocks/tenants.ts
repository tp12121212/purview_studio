import type { Tenant } from '@/types'

export const tenants: Tenant[] = [
  {
    id: 'tenant-contoso',
    name: 'Contoso Ltd',
    domain: 'contoso.onmicrosoft.com',
    environment: 'production',
    color: '#E53935',
  },
  {
    id: 'tenant-fabrikam',
    name: 'Fabrikam Inc',
    domain: 'fabrikam.onmicrosoft.com',
    environment: 'production',
    color: '#1E88E5',
  },
  {
    id: 'tenant-woodgrove',
    name: 'Woodgrove Dev',
    domain: 'woodgrovedev.onmicrosoft.com',
    environment: 'development',
    color: '#43A047',
  },
]
