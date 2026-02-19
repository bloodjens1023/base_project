// server/api/auth/register.post.ts
import { apiRequest, ensureOk } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  // ✅ username auto-généré comme le fait le frontend original
  const username = `u${Date.now()}`

  const res = await apiRequest('/api/auth/signupV3', {
    method: 'POST',
    query: { 'client-type': 'h5' },
    body: {
      dialCode: body.dialCode ?? '+55',
      username,
      password: body.password,
      phone: body.phone,
      currency: 'BRL',
      language: 'pt',
      telegramCode: body.telegramCode ?? '',
      whatsCode: body.whatsCode ?? '',
      intrCode: body.inviteCode ?? '',
      registerMode: 'un',
      popularizeMessage: `${config.apiBase}/?id=${body.popularizeId ?? ''} null`,
      isCheckSmsCode: '2',
      unofficial: '1',
    }
  })

  ensureOk(res)

  if (!res?.data?.accessToken) {
    throw createError({ statusCode: 400, statusMessage: 'Inscription échouée' })
  }

  return res.data
})