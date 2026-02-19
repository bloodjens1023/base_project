<template>
  <div class="max-w-[500px] mx-auto min-h-screen bg-base-100">
    <HeaderGlobal :title="t('withdrawal_title')" />

    <div class="flex justify-center mt-24">
      <img src="/asset/Giro.png" alt="logo" class="w-24 h-24" />
    </div>

    <div class="flex items-center justify-center mt-4 px-3">
      <div class="w-full bg-primary rounded-3xl shadow-2xl p-6 space-y-5">

        <!-- Solde disponible -->
        <div class="flex items-center justify-between bg-base-100 rounded-2xl px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <LucideWallet class="w-5 h-5 text-accent" />
            </div>
            <div>
              <p class="text-white/40 text-xs">{{ t('withdrawal_balance') }}</p>
              <p class="text-white font-bold text-base">R$ {{ balance }}</p>
            </div>
          </div>
          <button
            @click="setMaxAmount"
            class="text-accent text-xs font-bold bg-accent/10 px-3 py-1 rounded-lg"
          >
            {{ t('withdrawal_max') }}
          </button>
        </div>

        <!-- Montant -->
        <div>
          <p class="text-white/50 text-xs font-bold mb-2 px-1">{{ t('withdrawal_amount') }}</p>
          <div class="flex items-center gap-2 bg-base-100 rounded-xl px-4 py-3 border border-white/10 focus-within:border-accent/60 transition-colors">
            <span class="text-accent font-bold text-sm">R$</span>
            <input
              v-model="amount"
              type="number"
              inputmode="numeric"
              :placeholder="t('withdrawal_enter_amount')"
              class="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm font-bold"
            />
          </div>
          <p v-if="amountError" class="text-error text-xs mt-1 px-1">{{ amountError }}</p>
        </div>

        <!-- CPF -->
        <div>
          <p class="text-white/50 text-xs font-bold mb-2 px-1">CPF</p>
          <div class="flex items-center gap-2 bg-base-100 rounded-xl px-4 py-3 border border-white/10 focus-within:border-accent/60 transition-colors">
            <LucideUser class="w-4 h-4 text-white/30 flex-shrink-0" />
            <input
              v-model="cpf"
              type="text"
              inputmode="numeric"
              maxlength="14"
              :placeholder="t('withdrawal_cpf_placeholder')"
              class="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
              @input="formatCPF"
            />
          </div>
          <p v-if="cpfError" class="text-error text-xs mt-1 px-1">{{ cpfError }}</p>
        </div>

        <!-- Nom titulaire -->
        <div>
          <p class="text-white/50 text-xs font-bold mb-2 px-1">{{ t('withdrawal_holder') }}</p>
          <div class="flex items-center gap-2 bg-base-100 rounded-xl px-4 py-3 border border-white/10 focus-within:border-accent/60 transition-colors">
            <LucideIdCard class="w-4 h-4 text-white/30 flex-shrink-0" />
            <input
              v-model="cardHolder"
              type="text"
              :placeholder="t('withdrawal_holder_placeholder')"
              class="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
            />
          </div>
        </div>

        <!-- Mot de passe de retrait -->
        <div>
          <p class="text-white/50 text-xs font-bold mb-2 px-1">{{ t('withdrawal_password') }}</p>
          <div class="relative">
            <div class="flex items-center gap-2 bg-base-100 rounded-xl px-4 py-3 border border-white/10 focus-within:border-accent/60 transition-colors">
              <LucideLock class="w-4 h-4 text-white/30 flex-shrink-0" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('withdrawal_password_placeholder')"
                class="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="text-white/30 hover:text-white transition-colors"
              >
                <LucideEye v-if="!showPassword" class="w-4 h-4" />
                <LucideEyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Résumé -->
        <div
          v-if="parseFloat(amount) > 0"
          class="bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 space-y-2"
        >
          <div class="flex justify-between text-sm">
            <span class="text-white/50">{{ t('withdrawal_amount') }}</span>
            <span class="text-white font-bold">R$ {{ amount }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-white/50">{{ t('withdrawal_method') }}</span>
            <span class="text-accent font-bold">PIX</span>
          </div>
        </div>

        <!-- Bouton soumettre -->
        <button
          @click="handleWithdrawal"
          :disabled="!isFormValid || loading"
          :class="[
            'w-full py-[0.85rem] rounded-xl font-bold text-gray-900 transition-all duration-200',
            isFormValid && !loading
              ? 'bg-accent hover:brightness-110 active:scale-95'
              : 'bg-accent/30 text-white/30 cursor-not-allowed'
          ]"
        >
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <LucideLoader2 class="w-4 h-4 animate-spin" />
            {{ t('withdrawal_processing') }}
          </span>
          <span v-else>
            {{ success ? t('withdrawal_success') : t('withdrawal_confirm') }}
          </span>
        </button>

      </div>
    </div>

    <!-- Logos bas -->
    <div class="w-full flex flex-row justify-between items-center gap-2 px-6 mt-10 mb-10">
      <img src="https://downpg117.uqianbao.com/source/public/static/webp/CbkHlecm.webp" alt="" loading="lazy" class="h-7.5 aspect-[4.45/1]" />
      <img src="https://downpg117.uqianbao.com/source/public/static/webp/DcWbmleq.webp" alt="" loading="lazy" class="h-7.5 aspect-[3.5/1]" />
      <img src="https://downpg117.uqianbao.com/source/public/static/webp/C-S8qa3_.webp" alt="" loading="lazy" class="h-7.5 aspect-[3.04/1]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HeaderGlobal from '~/components/HeaderGlobal.vue'
import { useI18n } from 'vue-i18n'

definePageMeta({ layout: 'default' })

const { t } = useI18n()

const balance = ref('0.00')
const amount = ref('')
const cpf = ref('')
const cardHolder = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const success = ref(false)

// ✅ Format CPF : 000.000.000-00
const formatCPF = () => {
  let v = cpf.value.replace(/\D/g, '').slice(0, 11)
  if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4')
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2')
  cpf.value = v
}

const rawCPF = computed(() => cpf.value.replace(/\D/g, ''))

const amountError = computed(() => {
  const v = parseFloat(amount.value)
  if (!amount.value) return ''
  if (isNaN(v) || v <= 0) return t('withdrawal_amount_invalid')
  return ''
})

const cpfError = computed(() => {
  if (!cpf.value) return ''
  if (rawCPF.value.length !== 11) return t('withdrawal_cpf_invalid')
  return ''
})

const isFormValid = computed(() => {
  const v = parseFloat(amount.value)
  return (
    !isNaN(v) && v > 0 &&
    rawCPF.value.length === 11 &&
    cardHolder.value.trim().length > 2 &&
    password.value.length >= 4
  )
})

const setMaxAmount = () => {
  amount.value = balance.value
}

const handleWithdrawal = async () => {
  if (!isFormValid.value || loading.value) return
  loading.value = true
  try {
    await $fetch('/api/withdraw/submit', {
      method: 'POST',
      body: {
        cashMoney: amount.value,
        cpf: rawCPF.value,
        cardHolder: cardHolder.value,
        cashPassword: password.value,
        memberBindCardId: 1,
      }
    })
    success.value = true
    setTimeout(() => success.value = false, 3000)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>