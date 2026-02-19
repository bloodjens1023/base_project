// server/api/recharge/status.get.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const query = getQuery(event)
  if (!query.orderNos) throw createError({ statusCode: 400, statusMessage: 'orderNos requis' })

  const orderNos = Array.isArray(query.orderNos)
    ? query.orderNos.join(',')
    : query.orderNos

  const res = await apiRequest('/api/user/bill/personalDeposit', {
    token,
    query: { orderNos }
  })

  ensureOk(res)
  // ✅ Frontend lit list[0] — on retourne le tableau directement
  return res.data ?? []
})