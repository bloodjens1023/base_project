<template>
  <div
    class="bg-gradient-to-b from-[#162d77] to-[#1f4789] backdrop-blur-sm text-white shadow-xl border-b border-blue-800/30 bg-cover"
    :style="{backgroundImage: bg('/static/webp/OMR6_kmW.webp')}"
  >
    <!-- Decoration bottom-right -->
    <div
      class="bg-contain h-[68px] w-[95px] absolute z-[0] bottom-[-30px] right-[0px]"

      :style="{backgroundImage: bg('/static/webp/DnbsAF0P.webp')}"
    ></div>

    <!-- Header content -->
    <div class="px-4 py-4 flex items-center max-w-3xl mx-auto w-full">
      <NuxtLink to="/">
        <button
          class="mr-4 p-2 bg-blue-800/50 rounded-xl transition-all duration-200 w-30"
          aria-label="Back"
        >
          <img
        
            :src="asset('/static/svg/Cz-n34NG.svg')" 
            alt="Back"
          />
        </button>
      </NuxtLink>

      <div class="flex-1 flex items-center justify-center gap-2">
        <img
          :src="asset('/static/svg/DrVQ8Lpq.svg')" 
  
          alt="Customer Service Icon"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="w-8 h-8"
        />
        <h1 class="text-lg font-bold">{{ t('service_title') }}</h1>
      </div>

      <div class="w-10"></div>
    </div>

    <!-- Bottom border -->
    <div
      class="bg-contain w-full h-[4px] absolute z-[0] bottom-[-2px] bg-center"
          :style="{backgroundImage: bg('/static/webp/B_MtXw-3.webp')}"
 
    ></div>
  </div>
</template>

<script setup lang="ts">

const { t } = useI18n()
const config = useRuntimeConfig()

const asset = (path: string) =>
  `${config.public.assetsURL}${path}`

const bg = (path: string) =>
  `url(${config.public.assetsURL}${path})`
</script>
