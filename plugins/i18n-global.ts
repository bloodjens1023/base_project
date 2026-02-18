export default defineNuxtPlugin(() => {
  const { t } = useI18n()

  return {
    provide: {
      t
    }
  }
})
