<template>
  <div class="p-3 bg-base-100">
    <div class="w-full flex flex-col gap-2 "       >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full flex justify-between items-center py-[0.4rem] px-3  btn btn-primary rounded-lg border-none"
        
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

        <LucideArrowRight/>
      </div>
        <Translate/>
    </div>
   
    <!-- Bouton principal -->
    <button
      class="w-full mt-3 btn btn-accent text-black font-bold py-[0.7rem] px-5 rounded-xl shadow-xl transition-all duration-200 mb-6"
    >
      Ganhe R$100 de graça
    </button>

    <!-- Grid 3x3 -->
    <div class="grid grid-cols-3 gap-3 text-white font-bold mb-14 ">
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
        class="w-full flex justify-between items-center py-[0.4rem] px-3 btn btn-primary  rounded-lg "
      >
        <!-- Left item -->
          <NuxtLink to="/service" v-if="item.title === 'Suporte ao vivo'">
            <div class="flex items-center gap-3">
            
              <div class="p-1.5">
                <img
                  :src="item.icon"
                  :alt="item.title"
                  class="w-7 h-7"
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
        <LucideArrowRight/>
      </div>
    </div>
  </div>
</template>

<script setup>

const config = useRuntimeConfig();

const buttons = [
  { title: "Misterioso", image: "/static/webp/D9Vf61xP.webp" },
  { title: "Resgatar", image: "/static/webp/C7_SoLrK.webp" },
  { title: "Semana", image: "/static/webp/3TY0Tzzx.webp" },

  { title: "promotional", image: "/static/webp/Dze7L-r5.webp" },
  { title: "vip", image: "/static/webp/CHoWiKXg.webp" },
  { title: "Check-in", image: "/static/webp/Cym5nqRK.webp" },

  { title: "roleta", image: "/static/webp/CHoWiKXg.webp" },
  { title: "convite", image: "/static/webp/CD7ldDTn.webp" },
  { title: "agente", image: "/static/webp/BCfm6EZt.webp" },
];

const items = [
  {
    title: "Depósito",
    icon: "/asset/svg/vBJGo5rR.svg",
  },
  {
    title: "Saque",
    icon: "/asset/svg/C5Bsfa3w.svg",
  },
  {
    title: "Código De Bônus",
    icon: "/asset/svg/B8B01DZ6.svg",
  },
];

const items2 = [
  {
    title: "Mensagem",
    icon: "/asset/svg/IWi2FDed.svg",
  },
  {
    title: "Adiconar à tela inicial",
    icon: "/asset/svg/CcaUXxLJ.svg",
  },
  {
    title: "Suporte ao vivo",
    icon: "/asset/svg/DrVQ8Lpq.svg",
  },
];
</script>
