// server/api/games.get.ts
export default defineEventHandler(async () => {
  const API_BASE = 'https://eg-cf.wdang.vip'

  // Extraction des enfants EGAME
    const extractEGames = (data: any): any[] => {
      if (!data) return []
      const list = Array.isArray(data) ? data : data.data || []
      if (!Array.isArray(list)) return []

      const result: any[] = []
      list.forEach((parent: any) => {
        if (parent && Array.isArray(parent.childrenList)) {
          parent.childrenList.forEach((child: any) => {
            if (child && child.gameType === 'EGAME') {
              result.push(child)
            }
          })
        }
      })
      return result
    }

  try {
    const res = await $fetch(`${API_BASE}/api/game/gameBarNew`, {
      method: 'GET',
      query: {
        'client-type': 'h5',
        client_type: 'h5',
        modeCode: 'nav_game_home10',
        currency: 'BRL',
        language: 'pt'
      }
    })

    // Extraire uniquement les enfants EGAME
    const games = extractEGames(res as any[])
    return games
  } catch (err) {
    return { error: (err as any).message || 'API failed' }
  }
})
