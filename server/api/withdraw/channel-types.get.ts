// server/api/withdraw/channel-types.get.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const res = await apiRequest('/api/memberBindCardConfig/listTypes', {
    token,
    query: { language: 'pt' }
  })

  ensureOk(res)
  return res.data
})