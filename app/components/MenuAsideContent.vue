<template>
  <div class="p-3">
    <div class="w-full flex flex-col gap-2">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full flex justify-between items-center py-[0.4rem] px-3 bg-[#15194c] btn rounded-lg border-none"
      >
        <!-- Left item -->
        
        <div class="flex items-center gap-3">
          <div class="p-1.5">
            <img
              :src="item.icon"
              :alt="item.title"
              class="w-6 h-6 "
              loading="eager"
              decoding="async"
            />
          </div>
          <span class="text-sm font-bold ">
            {{ item.title }}
          </span>
        </div>

        <!-- Right SVG -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-6  rounded-md p-1 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
   
    <!-- Bouton principal -->
    <button
      class="w-full mt-3 bg-gradient-to-b from-[#bfea36] to-[#48bc49] active:from-emerald-700 active:via-green-700 active:to-teal-700 text-black font-bold py-[0.7rem] px-5 rounded-xl shadow-xl border border-emerald-400/30 transition-all duration-200 mb-6"
    >
      Ganhe R$100 de graça
    </button>

    <!-- Grid 3x3 -->
    <div class="grid grid-cols-3 gap-3 text-white font-bold mb-14">
      <RoundedButton
        v-for="(btn, index) in buttons"
        :key="index"
        :title="btn.title"
        :bg-image="`${config.public.assetsURL}${btn.image}`"
      />
    </div>

    <div class="w-full flex flex-col gap-2 mb-5">
      <div
        v-for="(item, index) in items2"
        :key="index"
        class="w-full flex justify-between items-center py-[0.4rem] px-3 btn rounded-lg border border-blue-900/30"
      >
        <!-- Left item -->
          <NuxtLink to="/service" v-if="item.title === 'Suporte ao vivo'">
            <div class="flex items-center gap-3">
            
              <div class="p-1.5">
                <img
                  :src="item.icon"
                  :alt="item.title"
                  class="w-6 h-6"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span class="text-sm font-bold ">
                {{ item.title }}
              </span>
              </div>
          </NuxtLink>
          <NuxtLink to="/service" v-if="item.title !== 'Suporte ao vivo'">
            <div class="flex items-center gap-3">
            
              <div class="p-1.5">
                <img
                  :src="item.icon"
                  :alt="item.title"
                  class="w-6 h-6"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span class="text-sm font-bold">
                {{ item.title }}
              </span>
              </div>
          </NuxtLink>
         
          
       

        <!-- Right SVG -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-6 text-blue-400/80 btn rounded-md p-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>

const config = useRuntimeConfig();

const buttons = [
  { title: "Resgatar", image: "/static/webp/C7_SoLrK.webp" },
  { title: "Semana", image: "/static/webp/3TY0Tzzx.webp" },
  { title: "Misterioso", image: "/static/webp/D9Vf61xP.webp" },
  { title: "Check-in", image: "/static/webp/BzOmGKPn.webp" },
  { title: "Roleta", image: "/static/webp/CHoWiKXg.webp" },
  { title: "Roleta", image: "/static/webp/CHoWiKXg.webp" },
  { title: "Check-in", image: "/static/webp/BzOmGKPn.webp" },
  { title: "Misterioso", image: "/static/webp/D9Vf61xP.webp" },
  { title: "Resgatar", image: "/static/webp/C7_SoLrK.webp" },
];

const items = [
  {
    title: "Depósito",
    icon: "https://downpg117.uqianbao.com/source/public/static/svg/vBJGo5rR.svg",
  },
  {
    title: "Saque",
    icon: "https://downpg117.uqianbao.com/source/public/static/svg/vBJGo5rR.svg",
  },
  {
    title: "Código De Bônus",
    icon: "https://downpg117.uqianbao.com/source/public/static/svg/vBJGo5rR.svg",
  },
];

const items2 = [
  {
    title: "Mensagem",
    icon: "https://downpg117.uqianbao.com/source/public/static/svg/IWi2FDed.svg",
  },
  {
    title: "Adiconar à tela inicial",
    icon: "https://downpg117.uqianbao.com/source/public/static/svg/CcaUXxLJ.svg",
  },
  {
    title: "Suporte ao vivo",
    icon: "https://downpg117.uqianbao.com/source/public/static/svg/DrVQ8Lpq.svg",
  },
];
</script>
