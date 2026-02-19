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

      <NuxtLink
        v-for="item in menuItems"
        :key="item.key"
        :to="item.route"
        class="flex flex-col items-center justify-center relative"
        :aria-label="item.label"
      >
        <!-- Bouton central -->
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

        <!-- Boutons normaux -->
        <template v-else>
          <img
            :src="item.icon"
            :class="[
              'h-5.5 mb-1 object-contain transition-all duration-200',
              // ✅ Icône active légèrement plus grande + teinte accent
              $route.path === item.route ? 'scale-110 brightness-150' : 'opacity-70'
            ]"
            loading="lazy"
          />
          <span
            :class="[
              'text-[11px] font-bold text-center transition-colors duration-200',
              $route.path === item.route ? 'text-accent' : 'text-gray-300'
            ]"
          >
            {{ item.label }}
          </span>
        </template>

      </NuxtLink>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()
const config = useRuntimeConfig()
const baseURL = config.public.assetsURL

const footerStyle = computed(() => ({
  backgroundImage: `url('${baseURL}/asset/B6QWs8Dc.png')`
}))

const topLineStyle = computed(() => ({
  backgroundImage: `url('${baseURL}/static/webp/B_MtXw-3.webp')`
}))

const menuItems = computed(() => [
  {
    key: 'promotion',
    label: t('promotion'),
    icon: `/asset/svg/sIofWxJ8.svg`,
    route: '/promotion'
  },
  {
    key: 'deposit',
    label: t('deposit'),
    icon: `/asset/svg/D4seqzx_.svg`,
    // ✅ Navigation vers la page deposit
    route: '/deposit'
  },
  {
    key: 'ranking',
    label: t('ranking'),
    icon: `${baseURL}/static/webp/DftLpS0R.webp`,
    route: '/ranking',
    center: true
  },
  {
    key: 'loot',
    label: t('loot'),
    icon: `/asset/svg/DntYU2eA.svg`,
    // ✅ Navigation vers la page withdrawal
    route: '/withdrawal'
  },
  {
    key: 'personal',
    label: t('personal'),
    icon: `/asset/svg/ChRMZLyf.svg`,
    route: '/personal'
  }
])
</script>