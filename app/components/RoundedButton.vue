<template>
  <div
    class="z-0 mt-4 relative w-full aspect-[1.4/1] flex flex-col justify-center items-center rounded-(--borderRadius) bg-contain bg-no-repeat"
    :style="{ backgroundImage: `url('${bgCardUrl}')` }"
  >
    <div class="flex flex-col gap-1">
      <img :src="bgImage" alt="" class="h-14 w-14 mt-2" />
    </div>
    <div class="mt-4 mb-2 text-[12px] font-bold">
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  bgImage: string
  title: string
}>()

const config = useRuntimeConfig()

// ✅ CORRIGÉ : plus d'URL hardcodée, on utilise assetsURL
const bgCardUrl = computed(() => `${config.public.assetsURL}/static/webp/2t18UHtq.webp`)
</script>