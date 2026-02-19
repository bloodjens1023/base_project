<script setup lang="ts">
// ✅ On déclare le layout ici — plus de condition dans default.vue
definePageMeta({
  layout: 'home'
})

const { t } = useI18n()
import BottomSection from '../components/Home/BottomSection.vue'
import AnimationsNum from '../components/Home/AnimationsNum.vue'
import GameSection from '~/components/Home/GameSection.vue'

const config = useRuntimeConfig()

const buttons = computed(() => [
  { title: t('rescue'), image: '/static/webp/C7_SoLrK.webp' },
  { title: t('week'), image: '/static/webp/3TY0Tzzx.webp' },
  { title: t('mysterious'), image: '/static/webp/D9Vf61xP.webp' },
  { title: t('checkin'), image: '/static/webp/BzOmGKPn.webp' },
  { title: t('roulette'), image: '/static/webp/CHoWiKXg.webp' },
])
</script>

<template>
  <div class="w-full scroll-smooth mt-16 text-white">

    <!-- Banner -->
    <img
      class="w-full object-cover p-3"
      :src="`${$config.public.imageAssetsURL}/static/webp/DKG9OB7h.webp`"
      alt="Banner"
    />

    <!-- Rewards Section -->
    <div class="px-3 my-3">
      <div class="flex justify-center items-center gap-3">
        <Rewards bg-image="/static/webp/sdfBvLKb.webp" />
        <Rewards bg-image="/static/webp/DMpFmNoL.webp" />
      </div>
    </div>

    <!-- Wrapper Sticky + GameSection -->
    <div class="relative">

      <!-- Sticky Buttons -->
      <div class="sticky top-10 z-88 pt-5 flex items-center justify-center gap-2">
        <div class="bg-base-100 backdrop-blur-sm flex w-full">
          <RoundedButton
            v-for="(btn, index) in buttons"
            :key="index"
            :title="btn.title"
            :bg-image="`${config.public.assetsURL}/${btn.image}`"
          />
        </div>
      </div>

      <AnimationsNum />

      <!-- Game Section -->
      <GameSection />

    </div>

    <!-- Bottom -->
    <BottomSection />

  </div>
</template>