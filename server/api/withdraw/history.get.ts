// server/api/withdraw/history.get.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const res = await apiRequest('/api/user/bill/getWithdrawList/v3', {
    token,
    query: { dateType: 6, currency: 'BRL', size: 1000, current: 1 }
  })

  ensureOk(res)
  // ✅ Frontend lit data.page.records[]
  return res.data?.page?.records ?? []
})