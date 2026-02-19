<template>
  <div class="max-w-125 mx-auto min-h-screen bg-base-100">
    <HeaderGlobal :title="t('login')" />

    <div class="flex justify-center mt-24">
      <img src="/asset/Giro.png" alt="logo" class="w-30 h-30" />
    </div>

    <div class="flex items-center justify-center mt-3">
      <div class="w-full mx-3 text-center bg-primary rounded-3xl shadow-2xl p-6">
        <form class="space-y-5" @submit.prevent>

          <!-- Numéro -->
          <div class="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary text-white">
            <span class="px-4 flex items-center gap-2">
              <img src="https://downpg117.uqianbao.com/source/public/static/png/DuiwawP0.png" class="h-5" alt="flag" />
              <span class="text-sm">+55</span>
            </span>
            <input
              type="text"
              v-model="phone"
              maxlength="11"
              inputmode="numeric"
              :placeholder="t('your_number')"
              class="w-full py-2 px-4 text-gray-400 placeholder-gray-400 focus:outline-none"
            />
          </div>

          <!-- Mot de passe -->
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              :placeholder="t('enter_password')"
              class="w-full py-2 px-4 text-gray-400 placeholder-gray-400 border border-gray-300 rounded-xl pr-12 focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>

          <!-- Bonus -->
          <div class="flex justify-center">
            <div class="bg-yellow-100 text-yellow-800 font-semibold px-4 py-2 rounded-full inline-flex items-center gap-2">
              🎁 {{ t('register_bonus') }}
            </div>
          </div>

          <!-- Submit -->
          <button
            type="button"
            @click="handleLogin"
            :class="['w-full py-[0.8rem] rounded-xl font-bold text-gray-900 transition-colors', 'bg-accent']"
          >
            {{ showSuccess ? t('success_entered') : t('login') }}
          </button>

          <!-- Checkbox -->
          <label class="flex items-start gap-3 text-white font-bold text-sm">
            <input type="checkbox" v-model="acceptTerms" class="w-5 h-5 rounded" />
            <span>{{ t('accept_terms') }}</span>
          </label>

        </form>
      </div>
    </div>

    <!-- ✅ CORRIGÉ : lien vers /register pour créer un compte -->
    <div>
      <p class="text-white ml-4 mt-4 font-bold">
        {{ t('no_account') }}
        <span class="text-yellow-300 underline">
          <NuxtLink to="/register">{{ t('register') }}</NuxtLink>
        </span>
      </p>
    </div>

    <!-- Message bienvenue -->
    <div class="px-6 text-sm">
      <p class="text-gray-400 font-bold text-center mt-6">
        {{ t('welcome_to') }} <span class="text-yellow-300">https://giro77.bet</span>
      </p>
      <p class="text-gray-400 font-bold text-center">
        {{ t('gaming_experience') }}
      </p>
    </div>

    <!-- Logos bas -->
    <div class="w-full flex flex-row justify-between items-center gap-2 px-6 mt-14">
      <img src="https://downpg117.uqianbao.com/source/public/static/webp/CbkHlecm.webp" alt="" loading="eager" fetchpriority="high" decoding="async" class="h-7.5 aspect-[4.45/1]" />
      <img src="https://downpg117.uqianbao.com/source/public/static/webp/DcWbmleq.webp" alt="" loading="eager" fetchpriority="high" decoding="async" class="h-7.5 aspect-[3.5/1]" />
      <img src="https://downpg117.uqianbao.com/source/public/static/webp/C-S8qa3_.webp" alt="" loading="eager" fetchpriority="high" decoding="async" class="h-7.5 aspect-[3.04/1]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import HeaderGlobal from "~/components/HeaderGlobal.vue"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const phone = ref('')
const password = ref('')
const showPassword = ref(false)
const acceptTerms = ref(true)
const showSuccess = ref(false)

const handleLogin = () => {
  // TODO: brancher l'appel API d'authentification ici
  showSuccess.value = true
}

watch(showSuccess, (value) => {
  if (value) {
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  }
})
</script>