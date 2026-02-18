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
      <div class="ml-28">
        <button
          @click="toggleTheme"
          class="p-2 rounded-full bg-base-100 text-white w-8 h-8 flex items-center justify-center"
          aria-label="Toggle theme"
        >
          <component :is="currentIcon" class="w-5 h-5" />
        </button>
      </div>

      <!-- RIGHT SIDE -->
      <div class="flex-1 flex justify-end items-center gap-2 min-w-0">
        <NuxtLink
          to="/login"
          class="px-3 py-1 text-sm font-semibold whitespace-nowrap text-white"
        >
          {{ t("enter") }}
        </NuxtLink>

        <NuxtLink
          to="/register"
          class="btn btn-accent rounded-xl text-black px-3 text-sm font-semibold whitespace-nowrap"
        >
          {{ t("register") }}
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
import { ref, computed } from "vue";
import { Moon, Sun } from "lucide-vue-next";
import TheMenuAside from "../MenuAside.vue";
import { useTheme } from "../../../composables/useTheme";

const { t } = useI18n();
const config = useRuntimeConfig();
const baseURL = config.public.assetsURL;

const menuOpen = ref(false);

/* ========================
   STYLES PRE-COMPUTED
======================== */

const headerStyle = computed(() => ({
  backgroundImage: `url('/asset/OMR6_kmw.png')`
}));

const decorationStyle = computed(() => ({
  backgroundImage: `url('${baseURL}/static/webp/DnbsAF0P.webp')`
}));

const bottomLineStyle = computed(() => ({
  backgroundImage: `url('${baseURL}/static/webp/B_MtXw-3.webp')`
}));

/* ========================
   ASSETS
======================== */

const logoSrc = `/asset/svg/logo.svg`;
const menuIcon = `${baseURL}/static/png/Csdczrui.png`;

/* ========================
   THEME LOGIC OPTIMISÉE
======================== */

const { theme, setTheme } = useTheme();

const themes = [
  { name: "mytheme", icon: Moon },
  { name: "mytheme2", icon: Sun }
];

const currentIcon = computed(() => {
  const active = themes.find(t => t.name === theme.value);
  return active?.icon ?? Moon;
});

const toggleTheme = () => {
  const next =
    theme.value === themes[0].name ? themes[1] : themes[0];
  setTheme(next.name);
};
</script>
