// server/api/auth/login.post.ts
import { apiRequest, ensureOk } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await apiRequest('/api/auth/signInV3', {
    method: 'POST',
    query: { 'client-type': 'h5' },
    body: {
      phone: body.phone,
      dialCode: body.dialCode ?? '+55',
      password: body.password, // chiffré RSA côté client avant envoi
    }
  })

  ensureOk(res)

  if (!res?.data?.accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Token manquant dans la réponse' })
  }

  return res.data
})