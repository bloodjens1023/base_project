<template>
  <div
    class="fixed top-0 left-0 right-0 mx-auto w-full max-w-125 shadow-xl border-b bg-cover overscroll-none z-90 backdrop-blur-sm"
    :style="headerStyle"
  >
    <!-- Decoration image -->
    <div
      class="bg-contain bg-no-repeat h-17 w-23.75 absolute z-[2] bottom-[-40px] right-0"
      :style="decorationStyle"
    />

    <!-- HEADER CONTENT -->
    <div class="px-3 py-3 flex items-center w-full">

      <!-- MENU BUTTON -->
      <button
        @click="menuOpen = !menuOpen"
        class="mr-3 p-2 btn btn-primary rounded-xl transition-all duration-200"
        aria-label="Toggle menu"
      >
        <img
          :src="menuIcon"
          alt="menu"
          class="w-5 h-5 object-contain"
          loading="lazy"
        />
      </button>

      <!-- LOGO -->
      <img
        :src="logoSrc"
        alt="logo"
        class="w-[100px] sm:w-[120px] object-contain"
        loading="lazy"
      />

      <!-- THEME SWITCH -->
      <!-- ✅ CORRIGÉ : plus de ml-28 fixe, utilise flex-1 + justify-center -->
      <div class="flex-1 flex justify-center">
        <button
          @click="toggleTheme"
          class="p-2 rounded-full bg-base-100 text-white w-8 h-8 flex items-center justify-center"
          :aria-label="`Switch to ${currentTheme.label} theme`"
          :title="currentTheme.label"
        >
          <!-- ✅ CORRIGÉ : icône vient de useTheme, pas d'un tableau local -->
          <Moon v-if="currentTheme.icon === 'moon'" class="w-5 h-5" />
          <Sun v-else class="w-5 h-5" />
        </button>
      </div>

      <!-- RIGHT SIDE -->
      <div class="flex justify-end items-center gap-2 min-w-0">
        <NuxtLink
          to="/login"
          class="px-3 py-1 text-sm font-semibold whitespace-nowrap text-white"
        >
          {{ t('enter') }}
        </NuxtLink>

        <NuxtLink
          to="/register"
          class="btn btn-accent rounded-xl text-black px-3 text-sm font-semibold whitespace-nowrap"
        >
          {{ t('register') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Bottom line decoration -->
    <div
      class="bg-contain bg-repeat w-full h-1 absolute bottom-[-2px] bg-center"
      :style="bottomLineStyle"
    />
  </div>

  <TheMenuAside :is-open="menuOpen" @close="menuOpen = false" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'
import TheMenuAside from '../MenuAside.vue'
// ✅ CORRIGÉ : useTheme fournit tout — toggleTheme, currentTheme, plus de logique locale
import { useTheme } from '../../../composables/useTheme'

const { t } = useI18n()
const config = useRuntimeConfig()
const baseURL = config.public.assetsURL

const menuOpen = ref(false)

// ✅ Styles pre-computed (inchangé, c'était déjà bien)
const headerStyle = computed(() => ({
  backgroundImage: `url('/asset/OMR6_kmw.png')`
}))

const decorationStyle = computed(() => ({
  backgroundImage: `url('${baseURL}/static/webp/DnbsAF0P.webp')`
}))

const bottomLineStyle = computed(() => ({
  backgroundImage: `url('${baseURL}/static/webp/B_MtXw-3.webp')`
}))

const logoSrc = `/asset/svg/logo.svg`
const menuIcon = `${baseURL}/static/png/Csdczrui.png`

// ✅ CORRIGÉ : toute la logique thème vient de useTheme
const { toggleTheme, currentTheme } = useTheme()
</script>