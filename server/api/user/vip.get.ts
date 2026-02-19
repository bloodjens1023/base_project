// server/api/user/vip.get.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const res = await apiRequest('/api/user/getVipInfo', {
    token,
    query: { currency: 'BRL' }
  })
  ensureOk(res)
  return res.data
})