<template>
  <div
    class="flex-1 w-full bg-cover bg-center h-18"
    :style="{ backgroundImage: `url('${assetUrl}')` }"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  bgImage: string
}>()

const config = useRuntimeConfig()
const assetUrl = computed(() => `${config.public.assetsURL}${props.bgImage}`)
</script>