<template>
  <div
        class="w-full flex justify-between items-center py-[0.4rem] px-3 btn rounded-lg border-none"
        @click="open = !open"
        >
        <div class="flex gap-5">
          <LucideLanguages/>
        LANGUAGE ({{ currentLabel }})
         <div
      v-if="open"
      class="absolute left-3 mt-8 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10"
    >
      <button
        @click="setLocale('en'); open = false"
        class="block w-full text-left px-4 py-2 text-sm  text-gray-700 hover:bg-blue-100 transition"
      >
        US English
      </button>
      <button
        @click="setLocale('pt-br'); open = false"
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition"
      >
        BR Português
      </button>
    </div>
  </div>
        </div>
        <div class="relative inline-block text-left">
   
        
      </div>
  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const open = ref(false)
const { locale, setLocale } = useI18n()

const currentLabel = computed(() =>
  locale.value === 'en' ? 'EN' : 'BR'
)
</script>
