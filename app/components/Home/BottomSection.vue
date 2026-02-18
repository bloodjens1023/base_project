<template>
  <div class="bg-[var(--background)]">

    <!-- Welcome -->
    <div class="text-center w-full flex justify-center items-center text-[12px] font-bold px-10 pt-20">
      {{ t('hello') }}
    </div>

    <!-- Telegram -->
    <div class="flex justify-center mt-6">
      <div class="flex items-center rounded-lg bg-primary px-4 py-2 gap-2">
        <img
          :src="telegramIcon"
          :alt="t('telegram')"
          loading="lazy"
          class="h-7 w-7"
        />
        <span class="text-xs font-bold">
          {{ t('telegram') }}
        </span>
      </div>
    </div>

    <!-- Contact -->
    <p class="text-center text-[12px] font-bold mt-6">
      {{ t('contactEmail', { email: supportEmail }) }}
    </p>

    <!-- Social Icons -->
    <div class="flex justify-center gap-2.5 mt-6">
      <div
        v-for="icon in socialIcons"
        :key="icon"
        class="w-15 h-15 rounded-full flex justify-center items-center bg-primary"
      >
        <img
          :src="icon"
          :alt="t('socialMedia')"
          loading="lazy"
          class="h-11.25"
        />
      </div>
    </div>

    <!-- Policy Links -->
    <div class="flex justify-center mt-6 px-6">
      <div class="flex justify-center gap-3 flex-wrap max-w-4xl">
        <button
          v-for="link in policyLinks"
          :key="link"
          type="button"
          class="text-sm font-bold text-[var(--text)]"
        >
          {{ t(link) }}
        </button>
      </div>
    </div>

    <!-- Certifications -->
    <div class="flex justify-between items-center gap-2 px-6 mt-14">
      <img
        v-for="cert in certifications"
        :key="cert"
        :src="cert"
        :alt="t('certification')"
        loading="lazy"
        class="h-7.5 object-contain"
      />
    </div>

    <!-- Legal -->
    <div class="w-full flex flex-col text-[12px] px-8 mt-6 font-bold">
      <div class="leading-4 break-words">
        {{ t('legalNotice') }}
      </div>
      <div class="leading-4 mt-2.5 space-y-1">
        <p>{{ t('disclaimer1') }}</p>
        <p>{{ t('disclaimer2') }}</p>
        <p>{{ t('disclaimer3') }}</p>
      </div>
    </div>

    <!-- Payment Grid -->
    <div class="px-8 pt-8 mt-8 grid grid-cols-3 gap-2">
      <div
        v-for="payment in paymentIcons"
        :key="payment"
        class="bg-primary rounded-xl"
      >
        <img
          :src="payment"
          :alt="t('paymentMethod')"
          loading="lazy"
          class="w-full rounded-lg"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="text-center flex flex-col items-center text-[12px] gap-1 mt-10 font-bold">
      <span>{{ t('copyright') }}</span>
      <div>
        {{ t('updateTime', { time: updateTime }) }}
      </div>
    </div>

    <!-- Back To Top -->
    <div class="flex justify-center mt-16 pb-16">
      <button
        @click="scrollToTop"
        class="h-10 w-10 btn btn-primary rounded-full flex items-center justify-center"
        :aria-label="t('backToTop')"
      >
        <LucideArrowUp />
      </button>
    </div>

  </div>
</template>


<script setup lang="ts">
const { t } = useI18n()

const supportEmail = 'support@giro77.bet'
const updateTime = '2025-12-03 08:30:53'

const telegramIcon = '/asset/svg/kN_fe_Gl.svg'

const socialIcons = [
  '/asset/svg/BpjPtDpL.svg',
  '/asset/svg/kN_fe_Gl.svg',
  '/asset/svg/B_Gx7ck.svg',
  '/asset/svg/URMDl3hM.svg',
  '/asset/svg/oMuAMAQ6.svg'
]

const policyLinks = [
  'howToPlay',
  'termsConditions',
  'amlPolicy',
  'kycPolicy',
  'selfExclusionPolicy',
  'responsibleGamingPolicy',
  'underageGamingPolicy'
]

const certifications = [
  'https://downpg117.uqianbao.com/source/public/static/webp/CbkHlecm.webp',
  'https://downpg117.uqianbao.com/source/public/static/webp/DcWbmleq.webp',
  'https://downpg117.uqianbao.com/source/public/static/webp/C-S8qa3_.webp'
]

const paymentIcons = [
  '/asset/svg/GZ2uwZ4U.svg',
  '/asset/svg/Civ14LDW.svg',
  '/asset/svg/B6TXnIDj.svg',
  '/asset/svg/rP1oFiSh.svg',
  '/asset/svg/D_i-KO_s.svg',
  '/asset/svg/CDma3emR.svg',
  '/asset/svg/B5U0gd8x.svg',
  '/asset/svg/BVy-OIx7.svg',
  '/asset/svg/CllcxtMJ.svg'
]

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
