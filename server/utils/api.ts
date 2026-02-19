// server/utils/api.ts
// ═══════════════════════════════════════════════
// Utilitaire central pour tous les appels API
// ═══════════════════════════════════════════════

export const getConfig = () => useRuntimeConfig()
const API_BASE = 'https://eg-cf.wdang.vip'
// ✅ Headers de base envoyés sur chaque requête
export const buildHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'client-type': 'h5',
    'client_type': 'h5',
  }
  if (token) {
    // ✅ Auth = token brut, PAS "Bearer <token>"
    headers['Authorization'] = token
  }
  return headers
}

// ✅ Appel vers l'API principale (eg-cf.wdang.vip)
export const apiRequest = async <T = any>(
  path: string,
  options: {
    method?: 'GET' | 'POST'
    query?: Record<string, any>
    body?: Record<string, any>
    token?: string
  } = {}
): Promise<T> => {
  const config = getConfig()
  const { method = 'GET', query = {}, body, token } = options

  try {
    const res = await $fetch<T>(`${API_BASE}${path}`, {
      method,
      headers: buildHeaders(token),
      query: { 'client-type': 'h5', client_type: 'h5', ...query },
      ...(body ? { body: new URLSearchParams(body as any).toString() } : {})
    })
    return res
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode ?? 502,
      statusMessage: err?.message ?? 'Upstream API error',
      cause: err
    })
  }
}

// ✅ Appel vers l'API locale/legacy (sapi.uqianbao.com)
export const localApiRequest = async <T = any>(
  action: string,
  options: {
    method?: 'GET' | 'POST'
    query?: Record<string, any>
    body?: Record<string, any>
    token?: string
    userId?: string
  } = {}
): Promise<T> => {
  const config = getConfig()
  const { method = 'GET', query = {}, body, token, userId } = options

  const headers: Record<string, string> = {
    ...buildHeaders(token),
    'X-Debug-Mode': '0',
    'X-Local-Request': '1',
    ...(userId ? { 'user-id': userId } : {})
  }

  try {
    const res = await $fetch<T>(`${config.localApiBase}/api/api.php`, {
      method,
      headers,
      query: { do: action, ...query },
      ...(body ? { body: new URLSearchParams(body as any).toString() } : {})
    })
    return res
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode ?? 502,
      statusMessage: err?.message ?? 'Local API error',
      cause: err
    })
  }
}

// ✅ Valide la réponse selon les règles du frontend (ensureApiOk)
export const ensureOk = (data: any) => {
  if (data?.code === 401) {
    throw createError({ statusCode: 401, statusMessage: 'Session expirée' })
  }
  if (data?.succeed === false) {
    throw createError({ statusCode: 400, statusMessage: data?.message ?? 'API error' })
  }
  if (data?.code && data.code !== 0 && data?.message) {
    throw createError({ statusCode: 400, statusMessage: data.message })
  }
  return data
}

// ✅ Extrait le token depuis le header Authorization de la requête entrante
export const extractToken = (event: any): string | undefined => {
  return getHeader(event, 'authorization') ?? undefined
}