<template>
  <div :style="{backgroundColor: 'var(--background)'}">
    <div
      class="text-center w-full flex justify-center items-center text-[12px] font-bold px-10 pt-20"
      
    >
      {{ t('hello') }}
    </div>

    <div
      class="w-full flex flex-row justify-center gap-[10px] rounded-lg mt-6"
    >
      <div
        class="flex flex-row justify-center items-center rounded-lg bg-gradient-to-b from-[#162d77] to-[#1f4789] px-4 py-2 gap-2"
      >
        <img
          src="https://downpg117.uqianbao.com/source/public/static/svg/kN_fe_Gl.svg"
          alt="Telegram Icon"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="h-7 w-7"
        />
        <span class=" text-xs font-bold">Telegrama</span>
      </div>
    </div>

    <p class="text-center text-[12px] font-bold mt-6">
      {{ t('contact') }} support@giro77.bet
    </p>

    <!-- list icons -->
    <div class="share flex w-full gap-[10px] justify-center mt-6">
      <div class="share-icon w-[60px] h-[60px] rounded-lg flex justify-center items-center">
        <img
          src="https://downpg117.uqianbao.com/source/public/static/svg/BpjPtDpL.svg"
          alt=""
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="h-[45px]"
        />
      </div>
      <div class="share-icon w-[60px] h-[60px] rounded-lg flex justify-center items-center">
        <img
          src="https://downpg117.uqianbao.com/source/public/static/svg/kN_fe_Gl.svg"
          alt=""
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="h-[45px] logo"
        />
      </div>
      <div class="share-icon w-[60px] h-[60px] rounded-lg flex justify-center items-center">
        <img
          src="https://downpg117.uqianbao.com/source/public/static/svg/B_Gx7ck-.svg"
          alt=""
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="h-[45px] logo"
        />
      </div>
      <div class="share-icon w-[60px] h-[60px] rounded-lg flex justify-center items-center">
        <img
          src="https://downpg117.uqianbao.com/source/public/static/svg/URMDl3hM.svg"
          alt=""
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="h-[45px] logo"
        />
      </div>
      <div class="share-icon w-[60px] h-[60px] rounded-lg flex justify-center items-center">
        <img
          src="https://downpg117.uqianbao.com/source/public/static/svg/oMuAMAQ6.svg"
          alt=""
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="h-[45px] logo"
        />
      </div>
    </div>

    <!-- Lien -->
    <div class="w-full flex justify-center mt-6">
      <div class="w-[90%] max-w-4xl">
        <div class="flex justify-center gap-3 flex-wrap">
          <button
            aria-disabled="false"
            type="button"
            class="text-sm font-bold " :style="{ color: 'var(--text)' }"
          >
            {{ t("howToPlay") }}
          </button>
          <button
            aria-disabled="false"
            type="button"
            class="text-sm font-bold " :style="{ color: 'var(--text)' }"
          >
            {{ t("termsConditions") }}
          </button>
          <button
            aria-disabled="false"
            type="button"
            class="text-sm font-bold " :style="{ color: 'var(--text)' }"
          >
            {{ t("amlPolicy") }}
          </button>
          <button
            aria-disabled="false"
            type="button"
            class="text-sm font-bold " :style="{ color: 'var(--text)' }"
          >
            {{ t("kycPolicy") }}
          </button>
          <button
            aria-disabled="false"
            type="button"
            class="text-sm font-bold " :style="{ color: 'var(--text)' }"
          >
            {{ t("selfExclusionPolicy") }}
          </button>
          <button
            aria-disabled="false"
            type="button"
            class="text-sm font-bold " :style="{ color: 'var(--text)' }"
          >
            {{ t("responsibleGamingPolicy") }}
          </button>
          <button
            aria-disabled="false"
            type="button"
            class="text-sm font-bold " :style="{ color: 'var(--text)' }"
          >
            {{ t("underageGamingPolicy") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Title image -->
    <div
      class="w-full flex flex-row justify-between items-center gap-[8px] px-6 mt-14" 
    >
      <img
        src="https://downpg117.uqianbao.com/source/public/static/webp/CbkHlecm.webp"
        alt=""
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="h-[30px] aspect-[4.45/1]"
        
      />
      <img
        src="https://downpg117.uqianbao.com/source/public/static/webp/DcWbmleq.webp"
        alt=""
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="h-[30px] aspect-[3.5/1]"
        
      />
      <img
        src="https://downpg117.uqianbao.com/source/public/static/webp/C-S8qa3_.webp"
        alt=""
        loading="eager"
        fetchpriority="high"
        decoding="async"
        class="h-[30px] aspect-[3.04/1]"
      />
    </div>

    <!-- Desc -->
    <div class="Contact w-full flex flex-col text-[12px] px-8 mt-6 font-bold">
      <div class="company-introduction leading-[16px] break-all">
        {{ t('legalNotice') }}
      </div>
      <div class="company-introduction leading-[16px] mt-[10px]">
        <p> {{ t('disclaimer1') }}</p>
        <p> {{ t('disclaimer2') }}</p>
        <p> {{ t('disclaimer3') }}</p>
      
      </div>
    </div>

    <!-- Les 9 Icons  -->
    <div class="px-8 pt-8 mt-8">
      <div class="flex justify-center items-center gap-2 mb-2">
        <div class="share-icon" >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/GZ2uwZ4U.svg"
            alt=""
            class="w-full rounded-lg"
          />
        </div>
        <div class="share-icon" >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/Civ14LDW.svg"
            alt=""
            class="w-full rounded-lg"
          />
        </div>
        <div class="share-icon" >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/B6TXnIDj.svg"
            alt=""
            class="w-full rounded-lg"
          />
        </div>
      </div>

      <div class="flex justify-center items-center gap-2 mb-2">
        <div class="share-icon" >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/rP1oFiSh.svg"
            alt=""
            class="w-full rounded-lg"
          />
        </div>
        <div class="share-icon" >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/D_i-KO_s.svg"
            alt=""
            class="w-full rounded-lg"
          />
        </div>
        <div class="share-icon" >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/CDma3emR.svg"
            alt=""
            class="w-full rounded-lg"
          />
        </div>
      </div>

      <div class="flex justify-center items-center gap-2 mb-2">
        <div class="share-icon" >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/B5U0gd8x.svg"
            alt=""
            class="w-full rounded-lg"
          />
        </div>
        <div class="share-icon" >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/BVy-OIx7.svg"
            alt=""
            class="w-full rounded-lg"
          />
        </div>
        <div class="share-icon" >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/CllcxtMJ.svg"
            alt=""
            class="w-full rounded-lg"
          />
        </div>
      </div>
    </div>

    <!-- Last section -->
    <div
      class="text-center w-full flex flex-col justify-center items-center text-[12px] gap-1 mt-10 font-bold"
    >
      <span>{{ t('copyright') }}</span>
      <div class="w-full flex justify-center items-center">
        updateTime: 2025-12-03 08:30:53
      </div>
    </div>

    <!-- Back to Top Button -->
    <div class="w-full flex justify-center items-start mt-16 h-[300px] cursor-pointer" @click="scrollToTop" >
      <div class="el-backtop" style="right: 40px; bottom: 40px">
        <div
          class="flex flex-col justify-center items-center text-center  h-full"
        >
          <img
            src="https://downpg117.uqianbao.com/source/public/static/svg/DSrEP2nO.svg"
            alt="Back to top"
            class="w-[120px] rounded-lg "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { t } = useI18n()
// Fonction scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
