<template>
  <div class="">
    <button
      class="px-2 py-1 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg"
      @click="toggleLanguage"
    >
      {{ currentLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { locale, setLocale } = useI18n()

function toggleLanguage() {
  setLocale(locale.value === 'en' ? 'pt-br' : 'en')
}

const currentLabel = computed(() =>
  locale.value === 'en' ? 'BR' : 'US'
)
</script>
