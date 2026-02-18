<template>
  <footer
    class="fixed bottom-0 left-0 right-0 mx-auto
           w-full max-w-125
           bg-cover bg-no-repeat text-white shadow-xl
           bg-base-100 z-50"
    :style="footerStyle"
  >
    <!-- top decorative line -->
    <div
      class="bg-contain bg-repeat w-full h-1 absolute -top-0.5 bg-center"
      :style="topLineStyle"
    />

    <!-- Grid -->
    <div class="grid grid-cols-5 items-center h-16 w-full relative px-2">

      <button
        v-for="item in menuItems"
        :key="item.key"
        class="flex flex-col items-center justify-center relative"
        :aria-label="item.label"
      >
        <!-- Special center button -->
        <template v-if="item.center">
          <img
            :src="item.icon"
            class="w-20 absolute -top-10 left-1/2 -translate-x-1/2 z-10"
            loading="lazy"
          />
          <span class="text-[11px] font-bold text-gray-300 mt-5 text-center">
            {{ item.label }}
          </span>
        </template>

        <!-- Normal button -->
        <template v-else>
          <img
            :src="item.icon"
            class="h-5.5 mb-1 object-contain"
            loading="lazy"
          />
          <span class="text-[11px] font-bold text-gray-300 text-center">
            {{ item.label }}
          </span>
        </template>
      </button>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()
const config = useRuntimeConfig()

const baseURL = config.public.assetsURL

// Precompute styles (évite recalcul inline)
const footerStyle = computed(() => ({
  backgroundImage: `url('${baseURL}/asset/B6QWs8Dc.png')`
}))

const topLineStyle = computed(() => ({
  backgroundImage: `url('${baseURL}/static/webp/B_MtXw-3.webp')`
}))

// Menu configuration (scalable + propre)
const menuItems = computed(() => [
  {
    key: 'promotion',
    label: t('promotion'),
    icon: `/asset/svg/sIofWxJ8.svg`
  },
  {
    key: 'deposit',
    label: t('deposit'),
    icon: `/asset/svg/D4seqzx_.svg`
  },
  {
    key: 'ranking',
    label: t('ranking'),
    icon: `${baseURL}/static/webp/DftLpS0R.webp`,
    center: true
  },
  {
    key: 'loot',
    label: t('loot'),
    icon: `/asset/svg/DntYU2eA.svg`
  },
  {
    key: 'personal',
    label: t('personal'),
    icon: `/asset/svg/ChRMZLyf.svg`
  }
])
</script>
