// server/api/recharge/submit.get.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const query = getQuery(event)

  if (!query.payChannelId || !query.amount) {
    throw createError({ statusCode: 400, statusMessage: 'payChannelId et amount requis' })
  }

  const res = await apiRequest('/api/recharge/v3/online_pay', {
    token,
    query: {
      payChannelId: query.payChannelId,
      amount: query.amount,
      payType: query.payType ?? 'PIX',
      phone: query.phone,
      currency: 'BRL',
      language: 'pt',
      // Champs optionnels passés si présents
      ...(query.bankCode && { bankCode: query.bankCode }),
      ...(query.taxNumber && { taxNumber: query.taxNumber }),
      ...(query.realName && { realName: query.realName }),
    }
  })

  ensureOk(res)
  // ✅ Retourne l'objet complet (frontend utilise orderNo, qrCode, link)
  return res
})