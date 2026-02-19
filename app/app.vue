<script setup lang="ts">
import { useTheme } from '~~/composables/useTheme'

const { theme } = useTheme()

// ✅ Garde data-theme réactif sur <html> pour les changements live
useHead({
  htmlAttrs: {
    'data-theme': theme
  }
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>