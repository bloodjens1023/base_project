// server/api/config/service.get.ts
import { apiRequest } from '../../utils/api'

export default defineEventHandler(async () => {
  const res = await apiRequest<any>('/api/config/onlineCustomer')

  const data = res?.data

  // ✅ Format préféré : otherCustomer[]
  if (data?.otherCustomer?.length > 0) {
    return {
      jumpOut: data.onlineCustomer?.jumpOut ?? 1,
      customerButtons: data.otherCustomer.map((item: any) => ({
        title: item.typeName,
        url: item.configs?.[0]?.customerServiceUrl ?? '#'
      }))
    }
  }

  // ✅ Format fallback : onlineCustomer.links[]
  if (data?.onlineCustomer?.links?.length > 0) {
    return {
      jumpOut: data.onlineCustomer.jumpOut ?? 1,
      customerButtons: data.onlineCustomer.links.map((link: any) => ({
        title: link.linkTitle?.pt ?? link.linkTitle?.en ?? link.linkTitle ?? '',
        url: link.url ?? '#'
      }))
    }
  }

  // ✅ NOUVEAU : fallback sur defaultCustomerAddress (cas actuel de l'API)
  if (data?.onlineCustomer?.defaultCustomerAddress) {
    return {
      jumpOut: data.onlineCustomer.jumpOut ?? 1,
      customerButtons: [
        {
          title: 'Suporte ao Cliente',
          url: data.onlineCustomer.defaultCustomerAddress
        }
      ]
    }
  }

  // Rien d'exploitable
  return { jumpOut: 1, customerButtons: [] }
})