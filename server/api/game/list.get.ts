// server/api/game/list.get.ts
import { apiRequest } from '../../utils/api'

interface RawChild {
  name: string
  gameImg: string
  playCode: string
  platformCode: string
  demoEnable?: number
}

interface RawCategory {
  name: string
  barImgUrl: string
  childrenList?: RawChild[]
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const res = await apiRequest<{ data?: RawCategory[] } | RawCategory[]>(
    '/api/game/gameBarNew',
    {
      query: {
        modeCode: query.modeCode ?? 'nav_game_home10',
        currency: query.currency ?? 'BRL',
        language: query.language ?? 'pt',
      }
    }
  )

  const categories: RawCategory[] = Array.isArray(res) ? res : (res as any).data ?? []

  const result = categories.map((category) => ({
    name: category.name,
    barLogo: category.barImgUrl,
    children: (category.childrenList ?? []).map((child) => ({
      name: child.name,
      gameImg: child.gameImg,
      playCode: child.playCode,
      platformCode: child.platformCode,
      demoEnable: child.demoEnable ?? 0
    }))
  }))

  return { success: true, count: result.length, data: result }
})