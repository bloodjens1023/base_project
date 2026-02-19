// server/api/user/withdraw-pwd.post.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const body = await readBody(event)

  const res = await apiRequest('/api/user/v2/updateWithdrawPwd', {
    method: 'POST',
    token,
    body: { withdrawPwd: body.withdrawPwd }
  })

  ensureOk(res)
  return { success: true }
})