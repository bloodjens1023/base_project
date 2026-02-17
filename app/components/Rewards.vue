
<template>
  <div 
    class="flex flex-1 h-full bg-cover"
    :style="{ backgroundImage: `url('${ $config.public.assetsURL + bgImage}')` }"
  >
  </div>
</template>

<script setup>
defineProps({
  bgImage: {
    type: String,
    required: true
  }
})
</script>