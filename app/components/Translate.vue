<template>
  <div class="relative w-full">

    <!-- Bouton toggle -->
    <div
      class="w-full flex justify-between items-center py-[0.4rem] px-3 btn btn-primary rounded-lg border-none cursor-pointer"
      @click="open = !open"
    >
      <div class="flex items-center gap-3">
        <LucideLanguages />
        <span>LANGUAGE ({{ currentLabel }})</span>
      </div>
      <LucideChevronDown :class="['transition-transform duration-200', open ? 'rotate-180' : '']" />
    </div>

    <!-- ✅ CORRIGÉ : dropdown en dehors du bouton, positionné en absolu -->
    <div
      v-if="open"
      class="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50"
    >
      <button
        @click="selectLocale('en')"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition"
      >
        🇺🇸 US English
      </button>
      <button
        @click="selectLocale('pt-br')"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition"
      >
        🇧🇷 BR Português
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const open = ref(false)
const { locale, setLocale } = useI18n()

const currentLabel = computed(() =>
  locale.value === 'en' ? 'EN' : 'BR'
)

const selectLocale = (lang: string) => {
  setLocale(lang)
  open.value = false
}
</script>