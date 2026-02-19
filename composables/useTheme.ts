// composables/useTheme.ts

export const THEMES = [
  { name: 'mytheme',  label: 'Dark', icon: 'moon' },
  { name: 'mytheme2', label: 'Light', icon: 'sun'  },
] as const

export type ThemeName = typeof THEMES[number]['name']

export const useTheme = () => {
  // ✅ useState simple — initialisé par le plugin theme.client.ts
  // Valeur par défaut 'mytheme' pour le SSR (côté serveur)
  const theme = useState<ThemeName>('theme', () => 'mytheme')

  const setTheme = (newTheme: ThemeName) => {
    theme.value = newTheme
    if (import.meta.client) {
      localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  const toggleTheme = () => {
    const idx = THEMES.findIndex(t => t.name === theme.value)
    setTheme(THEMES[(idx + 1) % THEMES.length].name)
  }

  const currentTheme = computed(() =>
    THEMES.find(t => t.name === theme.value) ?? THEMES[0]
  )

  return { theme, setTheme, toggleTheme, currentTheme, THEMES }
}