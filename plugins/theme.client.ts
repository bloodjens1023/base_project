// plugins/theme.client.ts
// ✅ S'exécute côté CLIENT uniquement, AVANT l'hydratation Vue
// C'est le seul endroit où on lit localStorage pour initialiser le thème

export default defineNuxtPlugin({
  name: 'theme',
  enforce: 'pre', // ✅ S'exécute AVANT tous les autres plugins
  setup() {
    const VALID_THEMES = ['mytheme', 'mytheme2']
    const DEFAULT = 'mytheme'

    // Lire localStorage
    let saved: string | null = null
    try {
      saved = localStorage.getItem('theme')
    } catch {}

    const theme = saved && VALID_THEMES.includes(saved) ? saved : DEFAULT

    // Appliquer immédiatement sur <html> avant que Vue hydrate
    document.documentElement.setAttribute('data-theme', theme)

    // Synchroniser le useState de Nuxt
    const themeState = useState<string>('theme')
    themeState.value = theme
  }
})