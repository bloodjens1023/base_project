<script setup>
import { useTheme } from '~~/composables/useTheme';

const { theme } = useTheme()

useHead({
  htmlAttrs: {
    'data-theme': theme
  },
  script: [
    {
      innerHTML: `
        (function() {
          const saved = localStorage.getItem('theme');
          if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
          }
        })();
      `,
      type: 'text/javascript'
    }
  ]
})
</script>

<template>
  <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout> 
  </div>
</template>
