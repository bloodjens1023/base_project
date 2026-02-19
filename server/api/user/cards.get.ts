// server/api/user/cards.get.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const res = await apiRequest('/api/user/cards', {
    token,
    query: { currency: 'BRL' }
  })
  ensureOk(res)

  // ✅ Flatten toutes les cartes (groupées par lettre côté backend)
  const grouped = res.data ?? {}
  const cards = Object.values(grouped).flat()
  return cards
})