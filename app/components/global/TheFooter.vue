<template>
  <footer
    class="fixed bottom-0 left-0 right-0 mx-auto
           w-full max-w-125
           bg-cover bg-no-repeat text-white shadow-xl
           bg-base-100 z-55"
          :style="{ backgroundImage: `url('/asset/B6QWs8Dc.png')` }"
  >

    <div
      class="bg-contain bg-repeat w-full h-1 absolute top-[-2px] bg-center"
      :style="{ backgroundImage: bg('/static/webp/B_MtXw-3.webp') }"
    ></div>

    <!-- Grid -->
    <div class="grid grid-cols-5 items-center h-16 w-full relative px-2">

      <!-- 1 -->
      <button class="flex flex-col items-center justify-center">
        <img :src="asset('/static/svg/sIofWxJ8.svg')"
             class="h-5.5 mb-1 object-contain" />
        <span class="text-[11px] font-bold text-gray-300  text-center">
          {{ t('promotion') }}
        </span>
      </button>

      <!-- 2 -->
      <button class="flex flex-col items-center justify-center">
        <img :src="asset('/static/svg/D4seqzx_.svg')"
             class="h-[22px] mb-1 object-contain" />
        <span class="text-[11px] font-bold text-gray-300  text-center">
          {{ t('deposit') }}
        </span>
      </button>

      <!-- 3 centre -->
      <button class="relative flex flex-col items-center justify-center">
        <img
          :src="asset('/static/webp/DftLpS0R.webp')"
          class="w-20 absolute -top-10 left-1/2 -translate-x-1/2 z-10"
        />
        <span class="text-[11px] font-bold text-gray-300  mt-5 text-center">
          {{ t('ranking') }}
        </span>
      </button>

      <!-- 4 -->
      <button class="flex flex-col items-center justify-center">
        <img :src="asset('/static/svg/DntYU2eA.svg')"
             class="h-[22px] mb-1 object-contain" />
        <span class="text-[11px] font-bold text-gray-300  text-center">
          {{ t('loot') }}
        </span>
      </button>

      <!-- 5 -->
      <button class="flex flex-col items-center justify-center">
        <img :src="asset('/static/svg/ChRMZLyf.svg')"
             class="h-[22px] mb-1 object-contain" />
        <span class="text-[11px] font-bold text-gray-300 text-center">
          {{ t('personal') }}
        </span>
      </button>

    </div>
  </footer>
</template>


<script setup lang="ts">
  const { t } = useI18n()
  const config = useRuntimeConfig()

  const asset = (path: string) =>
    `${config.public.assetsURL}${path}`

  const bg = (path: string) =>
    `url(${config.public.assetsURL}${path})`
</script>
