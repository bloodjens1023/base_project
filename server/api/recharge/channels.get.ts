// server/api/recharge/channels.get.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const res = await apiRequest('/api/recharge/get_accounts_channels/v2', {
    token,
    query: { payType: 'PIX', currency: 'BRL', type: 2, language: 'pt' }
  })

  ensureOk(res)
  return res.data
})