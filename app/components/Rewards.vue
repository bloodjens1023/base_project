<template>
  <div 
    class="flex-1 w-full bg-cover bg-center h-18"
    :style="{ backgroundImage: `url('https://downpg117.sp-slots1.com/source/public${bgImage}')` }"
  >
    <!-- Contenu optionnel -->
  </div>
</template>

<script setup>
// Définir les props avec validation
const props = defineProps({
  bgImage: {
    type: String,
    required: true
  }
})

// Accéder à la config de manière typée
const { $config } = useNuxtApp()
const assetsURL = $config.public.assetsURL || ''
</script>