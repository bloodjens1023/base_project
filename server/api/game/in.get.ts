// server/api/game/in.get.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const query = getQuery(event)

  const res = await apiRequest('/api/game/gameIn', {
    token,
    query: {
      playCode: query.playCode,
      kindCode: query.kindCode,
      baseUrl: query.baseUrl,
      gameLocation: query.gameLocation,
    }
  })

  ensureOk(res)
  return res.data
})