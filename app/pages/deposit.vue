<template>
  <div class="max-w-[500px] mx-auto min-h-screen bg-base-100">
    <HeaderGlobal :title="t('deposit')" />

    <div class="flex justify-center mt-24">
      <img src="/asset/Giro.png" alt="logo" class="w-24 h-24" />
    </div>

    <div class="flex items-center justify-center mt-4 px-3">
      <div class="w-full bg-primary rounded-3xl shadow-2xl p-6 space-y-5">

        <!-- Méthode PIX -->
        <div class="flex items-center gap-3 bg-base-100 rounded-2xl px-4 py-3">
          <div class="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <LucideQrCode class="w-5 h-5 text-accent" />
          </div>
          <div class="flex-1">
            <p class="text-white font-bold text-sm">PIX</p>
            <p class="text-white/40 text-xs">{{ t('deposit_instant') }}</p>
          </div>
          <div class="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
            <LucideCheck class="w-3 h-3 text-black" />
          </div>
        </div>

        <!-- Montants rapides -->
        <div>
          <p class="text-white/50 text-xs font-bold mb-2 px-1">{{ t('deposit_quick_amount') }}</p>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="amount in quickAmounts"
              :key="amount"
              @click="selectAmount(amount)"
              :class="[
                'py-2 rounded-xl text-sm font-bold transition-all duration-200',
                selectedAmount === amount
                  ? 'bg-accent text-black scale-105 shadow-lg shadow-accent/30'
                  : 'bg-base-100 text-white/70 hover:bg-white/10'
              ]"
            >
              R$ {{ amount }}
            </button>
          </div>
        </div>

        <!-- Montant personnalisé -->
        <div>
          <p class="text-white/50 text-xs font-bold mb-2 px-1">{{ t('deposit_custom_amount') }}</p>
          <div class="flex items-center gap-2 bg-base-100 rounded-xl px-4 py-3 border border-white/10 focus-within:border-accent/60 transition-colors">
            <span class="text-accent font-bold text-sm">R$</span>
            <input
              v-model="customAmount"
              type="number"
              inputmode="numeric"
              :placeholder="t('deposit_enter_amount')"
              class="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm font-bold"
              @input="selectedAmount = null"
            />
          </div>
        </div>

        <!-- Montant final affiché -->
        <div
          v-if="finalAmount > 0"
          class="flex items-center justify-between bg-accent/10 border border-accent/20 rounded-xl px-4 py-3"
        >
          <span class="text-white/60 text-sm">{{ t('deposit_total') }}</span>
          <span class="text-accent font-bold text-lg">R$ {{ finalAmount }}</span>
        </div>

        <!-- Bouton confirmer -->
        <button
          @click="handleDeposit"
          :disabled="finalAmount <= 0 || loading"
          :class="[
            'w-full py-[0.85rem] rounded-xl font-bold text-gray-900 transition-all duration-200',
            finalAmount > 0 && !loading
              ? 'bg-accent hover:brightness-110 active:scale-95'
              : 'bg-accent/30 text-white/30 cursor-not-allowed'
          ]"
        >
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <LucideLoader2 class="w-4 h-4 animate-spin" />
            {{ t('deposit_processing') }}
          </span>
          <span v-else>{{ t('deposit_confirm') }}</span>
        </button>

        <!-- Checkbox termes -->
        <label class="flex items-start gap-3 text-white/60 text-xs">
          <input type="checkbox" v-model="acceptTerms" class="w-4 h-4 rounded mt-0.5" />
          <span>{{ t('accept_terms') }}</span>
        </label>

      </div>
    </div>

    <!-- QR Code modal -->
    <Transition name="fade">
      <div
        v-if="showQR"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
        @click.self="showQR = false"
      >
        <div class="w-full max-w-[500px] bg-primary rounded-t-3xl p-6 space-y-4">
          <div class="w-10 h-1 bg-white/20 rounded-full mx-auto" />

          <h3 class="text-white font-bold text-center text-lg">{{ t('deposit_scan_qr') }}</h3>

          <!-- QR Code placeholder -->
          <div class="flex justify-center">
            <div class="w-48 h-48 bg-white rounded-2xl flex items-center justify-center p-3">
              <LucideQrCode class="w-full h-full text-black" />
            </div>
          </div>

          <div class="bg-base-100 rounded-xl px-4 py-3 flex items-center gap-2">
            <p class="flex-1 text-white/60 text-xs truncate">{{ qrCode }}</p>
            <button @click="copyQR" class="btn btn-accent btn-xs rounded-lg flex-shrink-0">
              <LucideCopy class="w-3 h-3" />
            </button>
          </div>

          <p class="text-center text-white/40 text-xs">{{ t('deposit_qr_expires') }}</p>

          <button
            @click="showQR = false"
            class="w-full py-3 rounded-xl bg-base-100 text-white font-bold"
          >
            {{ t('deposit_close') }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Logos bas -->
    <div class="w-full flex flex-row justify-between items-center gap-2 px-6 mt-10">
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

const quickAmounts = [20, 50, 100, 200, 500, 1000]
const selectedAmount = ref<number | null>(null)
const customAmount = ref<string>('')
const acceptTerms = ref(true)
const loading = ref(false)
const showQR = ref(false)
const qrCode = ref('')

const finalAmount = computed(() => {
  if (selectedAmount.value) return selectedAmount.value
  const v = parseFloat(customAmount.value)
  return isNaN(v) ? 0 : v
})

const selectAmount = (amount: number) => {
  selectedAmount.value = amount
  customAmount.value = ''
}

const copyQR = async () => {
  await navigator.clipboard.writeText(qrCode.value)
}

const handleDeposit = async () => {
  if (finalAmount.value <= 0 || loading.value) return
  loading.value = true
  try {
    const result = await $fetch<any>('/api/recharge/submit', {
      query: {
        payChannelId: 1,
        amount: finalAmount.value,
        payType: 'PIX',
      }
    })
    qrCode.value = result?.qrCode ?? result?.data?.qrCode ?? 'PIX_CODE_HERE'
    showQR.value = true
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>