// server/api/games.get.ts
export default defineEventHandler(async () => {
  const API_BASE = 'https://eg-cf.wdang.vip'

  try {
    console.log('📡 Appel API gameBarNew...')
    
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

    // Log pour debug
    console.log('✅ API répondue avec succès')

    // Déterminer le format de la réponse
    const categories = Array.isArray(res) ? res : (res as any).data || []
    
    // Extraire les données voulues
    const result = categories.map((category: any) => {
      const gameCount = category.childrenList?.length || 0
   
      
      return {
        name: category.name,
        barLogo: category.barImgUrl,
        children: (category.childrenList || []).map((child: any) => ({
          name: child.name,
          gameImg: child.gameImg,
          playCode: child.playCode,
          platformCode: child.platformCode
        }))
      }
    })

    return {
      success: true,
      count: result.length,
      data: result
    }

  } catch (err) {
    console.error('❌ Erreur API:', err)
    return { 
      success: false, 
      error: (err as any).message || 'API failed',
      data: [] 
    }
  }
})