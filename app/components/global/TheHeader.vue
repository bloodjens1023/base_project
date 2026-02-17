<template>
  <div
    class="fixed top-0 left-0 right-0 mx-auto w-full max-w-125  text-white shadow-xl border-b bg-cover overscroll-none z-90 theme-bg"
    :style="{ backgroundImage: bg('/static/webp/OMR6_kmW.webp') }"
  >
    <!-- Decoration image -->
    <div
      class="bg-contain bg-no-repeat h-17 w-23.75 absolute z-[2] bottom-[-40px] right-0"
      :style="{ backgroundImage: bg('/static/webp/DnbsAF0P.webp') }"
    ></div>

    <!-- HEADER CONTENT -->
    <div class="px-3 py-3 flex items-center w-full">
      <!-- MENU BUTTON -->
      <button
        @click="toggleMenu"
        class="mr-3 p-2 btn btn-primary rounded-xl transition-all duration-200"
        aria-label="Back"
      >
        <img
          :src="asset('/static/png/Csdczrui.png')"
          alt="menu"
          class="w-5 h-5 object-contain"
        />
      </button>

      <!-- LOGO -->
      <img
        src="/asset/svg/logo.svg"
        alt="logo"
        class="w-[100px] sm:w-[120px] object-contain"
      />

      <div class="ml-28">

        <!-- Si currentIcon est défini -->
        <button
          v-if="currentIcon"
          @click="toggleTheme"
          class="p-2 rounded-full bg-secondary "
        >
          <component :is="currentIcon" class="w-5 h-5" />
        </button>

        <!-- Sinon (else) -->
        <button
          v-else
          @click="toggleTheme"
          class="p-2 rounded-full bg-base-100 w-8 h-8"
        >
          
        </button>
      </div>

      <!-- RIGHT SIDE -->
      <div class="flex-1 flex justify-end items-center gap-2 min-w-0">
        <button class="px-3 py-1 text-sm font-semibold whitespace-nowrap">
          {{ t("enter") }}
        </button>

        <button
          class="btn btn-accent  rounded-xl text-black px-3  text-sm font-semibold whitespace-nowrap"
        >
          {{ t("register") }}
        </button>
      </div>
    </div>

    <!-- Bottom line decoration -->
    <div
      class="bg-contain bg-repeat w-full h-1 absolute bottom-[-2px] bg-center"
      :style="{ backgroundImage: bg('/static/webp/B_MtXw-3.webp') }"
    ></div>
  </div>

  <TheMenuAside :is-open="menuOpen" @close="closeMenu" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TheMenuAside from "../MenuAside.vue";
import Translate from "../Translate.vue";
import { Star, Moon } from "lucide-vue-next";
import { useTheme } from "../../../composables/useTheme";

const { t } = useI18n();
const config = useRuntimeConfig();

const menuOpen = ref(false);

const asset = (path: string) => `${config.public.assetsURL}${path}`;
const bg = (path: string) => `url(${config.public.assetsURL}${path})`;

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const { theme, setTheme } = useTheme();

const themes = [
  { name: "synthwave", icon: Moon },
  { name: "mytheme", icon: Star },
];

const currentTheme = ref<{ name: string; icon: unknown } | null>(null);
const currentIcon = ref<unknown>(null);

onMounted(() => {
  const active = themes.find((t) => t.name === theme.value) ?? themes[0];
  currentTheme.value = active;
  currentIcon.value = active.icon;
});

const toggleTheme = () => {
  const nextTheme = themes.find((t) => t.name !== currentTheme.value?.name);
  if (!nextTheme) return;
  currentTheme.value = nextTheme;
  currentIcon.value = nextTheme.icon;
  setTheme(nextTheme.name);
};
</script>
