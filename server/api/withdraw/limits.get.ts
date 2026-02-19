// server/api/withdraw/limits.get.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const res = await apiRequest('/api/withdraw/withdrawLimit', {
    token,
    query: { currency: 'BRL' }
  })

  ensureOk(res)
  // ✅ Frontend utilise singleCashMoneyLowerLimit + oddDaysCashMoneyUpperLimit
  return res.data
})