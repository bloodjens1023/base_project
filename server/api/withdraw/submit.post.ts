// server/api/withdraw/submit.post.ts
import { apiRequest, ensureOk, extractToken } from '../../utils/api'

export default defineEventHandler(async (event) => {
  const token = extractToken(event)
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Non authentifié' })

  const body = await readBody(event)

  const required = ['cashMoney', 'cpf', 'cardHolder', 'cashPassword', 'memberBindCardId']
  for (const field of required) {
    if (!body[field]) {
      throw createError({ statusCode: 400, statusMessage: `Champ requis manquant: ${field}` })
    }
  }

  const res = await apiRequest('/api/withdraw/v3Security/save', {
    method: 'POST',
    token,
    body: {
      cashMoney: body.cashMoney,
      cpf: body.cpf,
      cardHolder: body.cardHolder,
      cashPassword: body.cashPassword,
      withdrawType: 'ELECTRONIC',
      currency: 'BRL',
      validateCode: body.validateCode ?? '',
      'memberBindCardDTO.id': body.memberBindCardId,
      'memberBindCardDTO.type': 'ELECTRONIC',
      'memberBindCardDTO.cardHolder': body.cardHolder,
      'memberBindCardDTO.accountType': 'CPF',
      'memberBindCardDTO.cpf': body.cpf,
      bankInfoFromWeb: 'true',
    }
  })

  // ✅ Règle stricte : code===0 ET succeed===true
  if (res?.code !== 0 || res?.succeed !== true) {
    throw createError({ statusCode: 400, statusMessage: res?.message ?? 'Retrait échoué' })
  }

  return { success: true }
})