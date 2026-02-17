export const useTheme = () => {
  const theme = useState<string>('theme', () => 'light')

  const setTheme = (newTheme: string) => {
    theme.value = newTheme
    if (import.meta.client) {
      localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  // Lire le localStorage au montage côté client
  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
    }
  })

  return { theme, setTheme }
}