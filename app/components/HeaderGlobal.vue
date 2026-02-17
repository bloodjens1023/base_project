<template>
  <div
    class="fixed top-0 left-0 right-0 mx-auto w-full max-w-125 shadow-xl border-b bg-cover overscroll-none z-90 bg-primary"
    :style="{ backgroundImage: `url('/asset/OMR6_kmw.png')` }"
  >
    <!-- Decoration bottom-right -->
    <div
      class="bg-contain h-17 w-23.75 absolute z-0 -bottom-7.5 right-0"
      :style="{ backgroundImage: bg('/static/webp/DnbsAF0P.webp') }"
    ></div>

    <!-- Header content -->
    <div class="px-4 py-3 flex items-center max-w-3xl mx-auto w-full">
      <NuxtLink to="/">
        <button
          class="mr-4 p-2 btn btn-primary rounded-xl transition-all duration-200"
          aria-label="Back"
        >
          <img :src="asset('/static/svg/Cz-n34NG.svg')" alt="Back" />
        </button>
      </NuxtLink>

      <div class="flex-1 flex items-center justify-center">
        <h1 class="text-lg font-bold text-white">{{ title }}</h1>
      </div>

      <div class="absolute left-[89%]">
        <img
          :src="asset('/static/svg/CaeiXhPy.svg')"
          alt="Customer Service Icon"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="w-8 h-8"
        />
      </div>

      <div class="w-10"></div>
    </div>

    <!-- Bottom border -->
    <div
      class="bg-contain w-full h-[4px] absolute z-[0] bottom-[-2px] bg-center"
      :style="{ backgroundImage: bg('/static/webp/B_MtXw-3.webp') }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();

const { t } = useI18n();
const config = useRuntimeConfig();

const asset = (path: string) => `${config.public.assetsURL}${path}`;

const bg = (path: string) => `url(${config.public.assetsURL}${path})`;
</script>
