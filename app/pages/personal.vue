<template>
  <div class="max-w-[500px] mx-auto min-h-screen bg-base-100 pb-24">
    <HeaderGlobal :title="t('personal')" />

    <div class="pt-20 px-4 space-y-4">

      <!-- ══════════════════════════════
           CARTE PROFIL
      ═══════════════════════════════════ -->
      <div
        v-if="!userLoading"
        class="bg-primary rounded-3xl p-5 shadow-2xl"
      >
        <div class="flex items-center gap-4">

          <!-- Avatar -->
          <div class="w-16 h-16 rounded-2xl bg-base-100 flex items-center justify-center flex-shrink-0 border-2 border-accent/30">
            <LucideUser class="w-8 h-8 text-accent" />
          </div>

          <!-- Infos -->
          <div class="flex-1 min-w-0">
            <p class="text-white font-bold text-base truncate">
              {{ user?.username ?? t('personal_guest') }}
            </p>
            <p class="text-white/40 text-xs mt-0.5">
              {{ user?.phone ?? '---' }}
            </p>
            <!-- Badge VIP -->
            <div class="flex items-center gap-2 mt-2">
              <span class="bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-lg">
                VIP {{ user?.vipLevel ?? 0 }}
              </span>
              <span class="text-white/30 text-xs">ID: {{ user?.identity ?? '---' }}</span>
            </div>
          </div>

          <!-- Bouton éditer -->
          <button class="w-9 h-9 rounded-xl bg-base-100 flex items-center justify-center flex-shrink-0">
            <LucideSettings class="w-4 h-4 text-white/50" />
          </button>
        </div>

        <!-- Solde -->
        <div class="mt-4 bg-base-100 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div>
            <p class="text-white/40 text-xs">{{ t('personal_balance') }}</p>
            <p class="text-accent font-bold text-2xl mt-0.5">
              R$ {{ user?.balance ?? '0.00' }}
            </p>
          </div>
          <div class="flex gap-2">
            <NuxtLink
              to="/deposit"
              class="btn btn-accent btn-sm rounded-xl text-black text-xs font-bold"
            >
              <LucidePlus class="w-3 h-3" />
              {{ t('deposit') }}
            </NuxtLink>
            <NuxtLink
              to="/withdrawal"
              class="btn btn-sm rounded-xl bg-base-100 text-white text-xs font-bold border border-white/10"
            >
              <LucideArrowDown class="w-3 h-3" />
              {{ t('withdrawal_title') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Skeleton profil -->
      <div v-else class="bg-primary rounded-3xl p-5 space-y-3">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-white/10 relative overflow-hidden"><div class="shimmer absolute inset-0"/></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 w-32 rounded bg-white/10 relative overflow-hidden"><div class="shimmer absolute inset-0"/></div>
            <div class="h-3 w-24 rounded bg-white/10 relative overflow-hidden"><div class="shimmer absolute inset-0"/></div>
          </div>
        </div>
        <div class="h-16 rounded-2xl bg-white/10 relative overflow-hidden"><div class="shimmer absolute inset-0"/></div>
      </div>

      <!-- ══════════════════════════════
           MENU ACTIONS RAPIDES
      ═══════════════════════════════════ -->
      <div class="bg-primary rounded-3xl p-4 shadow-xl space-y-1">
        <p class="text-white/40 text-xs font-bold px-2 mb-3">{{ t('personal_account') }}</p>

        <NuxtLink
          v-for="item in accountItems"
          :key="item.key"
          :to="item.route"
          class="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/5 transition-colors"
        >
          <div class="w-9 h-9 rounded-xl bg-base-100 flex items-center justify-center flex-shrink-0">
            <component :is="item.icon" class="w-4 h-4 text-accent" />
          </div>
          <span class="flex-1 text-white text-sm font-bold">{{ t(item.label) }}</span>
          <LucideChevronRight class="w-4 h-4 text-white/20" />
        </NuxtLink>
      </div>

      <!-- ══════════════════════════════
           HISTORIQUE RETRAITS
      ═══════════════════════════════════ -->
      <div class="bg-primary rounded-3xl p-4 shadow-xl">
        <p class="text-white/40 text-xs font-bold px-2 mb-3">{{ t('personal_history') }}</p>

        <!-- Loading -->
        <div v-if="historyLoading" class="space-y-2">
          <div
            v-for="i in 3" :key="i"
            class="h-14 rounded-2xl bg-white/10 relative overflow-hidden"
          >
            <div class="shimmer absolute inset-0" />
          </div>
        </div>

        <!-- Liste -->
        <div v-else-if="history.length > 0" class="space-y-2">
          <div
            v-for="item in history"
            :key="item.id"
            class="flex items-center gap-3 bg-base-100 rounded-2xl px-3 py-3"
          >
            <!-- Status icon -->
            <div
              :class="[
                'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
                statusColor(item.cashStatus).bg
              ]"
            >
              <component :is="statusColor(item.cashStatus).icon" class="w-4 h-4" :class="statusColor(item.cashStatus).text" />
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-bold">R$ {{ item.cashMoney }}</p>
              <p class="text-white/30 text-xs truncate">{{ formatDate(item.createTime) }}</p>
            </div>

            <span
              :class="[
                'text-xs font-bold px-2 py-1 rounded-lg',
                statusColor(item.cashStatus).badge
              ]"
            >
              {{ statusLabel(item.cashStatus) }}
            </span>
          </div>
        </div>

        <!-- Vide -->
        <div v-else class="text-center py-8 text-white/30">
          <LucideInbox class="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p class="text-xs">{{ t('personal_no_history') }}</p>
        </div>
      </div>

      <!-- ══════════════════════════════
           BOUTON DÉCONNEXION
      ═══════════════════════════════════ -->
      <button
        @click="handleLogout"
        class="w-full py-3 rounded-2xl bg-primary border border-error/30 text-error font-bold text-sm flex items-center justify-center gap-2 hover:bg-error/10 transition-colors"
      >
        <LucideLogOut class="w-4 h-4" />
        {{ t('personal_logout') }}
      </button>

      <!-- Logos bas -->
      <div class="w-full flex flex-row justify-between items-center gap-2 px-2 mt-4">
        <img src="https://downpg117.uqianbao.com/source/public/static/webp/CbkHlecm.webp" alt="" loading="lazy" class="h-7 aspect-[4.45/1]" />
        <img src="https://downpg117.uqianbao.com/source/public/static/webp/DcWbmleq.webp" alt="" loading="lazy" class="h-7 aspect-[3.5/1]" />
        <img src="https://downpg117.uqianbao.com/source/public/static/webp/C-S8qa3_.webp" alt="" loading="lazy" class="h-7 aspect-[3.04/1]" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  LucideUser, LucideSettings, LucidePlus, LucideArrowDown,
  LucideChevronRight, LucideLogOut, LucideInbox,
  LucideWallet, LucideHistory, LucideShield, LucideHeadphones,
  LucideCheckCircle, LucideClock, LucideXCircle, LucideAlertCircle
} from 'lucide-vue-next'
import HeaderGlobal from '~/components/HeaderGlobal.vue'
import { useI18n } from 'vue-i18n'

definePageMeta({ layout: 'default' })

const { t } = useI18n()

// ─── State ───────────────────────────────────────
interface UserInfo {
  username: string
  phone: string
  balance: string
  vipLevel: number
  identity: string
}

interface WithdrawRecord {
  id: string
  cashMoney: string
  createTime: string
  cashStatus: number
  cashOrderNo: string
}

const user = ref<UserInfo | null>(null)
const userLoading = ref(true)
const history = ref<WithdrawRecord[]>([])
const historyLoading = ref(true)

// ─── Menu items ───────────────────────────────────
const accountItems = [
  { key: 'deposit',    label: 'deposit',           icon: LucideWallet,      route: '/deposit' },
  { key: 'withdraw',   label: 'withdrawal_title',  icon: LucideArrowDown,   route: '/withdrawal' },
  { key: 'history',    label: 'personal_history',  icon: LucideHistory,     route: '/personal/history' },
  { key: 'security',   label: 'personal_security', icon: LucideShield,      route: '/personal/security' },
  { key: 'service',    label: 'service_title',     icon: LucideHeadphones,  route: '/service' },
]

// ─── Status helpers ───────────────────────────────
const statusColor = (status: number) => {
  const map: Record<number, any> = {
    0: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', badge: 'bg-yellow-500/10 text-yellow-400', icon: LucideClock },
    1: { bg: 'bg-green-500/10',  text: 'text-green-400',  badge: 'bg-green-500/10 text-green-400',   icon: LucideCheckCircle },
    3: { bg: 'bg-green-500/10',  text: 'text-green-400',  badge: 'bg-green-500/10 text-green-400',   icon: LucideCheckCircle },
    4: { bg: 'bg-red-500/10',    text: 'text-red-400',    badge: 'bg-red-500/10 text-red-400',       icon: LucideXCircle },
  }
  return map[status] ?? { bg: 'bg-white/10', text: 'text-white/40', badge: 'bg-white/10 text-white/40', icon: LucideAlertCircle }
}

const statusLabel = (status: number) => {
  const labels: Record<number, string> = {
    0: t('personal_status_pending'),
    1: t('personal_status_success'),
    3: t('personal_status_success'),
    4: t('personal_status_failed'),
  }
  return labels[status] ?? '---'
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit'
  })
}

// ─── API calls ────────────────────────────────────
const token = useCookie('token')

onMounted(async () => {
  // Charger infos utilisateur
  try {
    const res = await $fetch<UserInfo>('/api/user/info', {
      headers: { Authorization: token.value ?? '' }
    })
    user.value = res
  } catch (e) {
    console.error(e)
  } finally {
    userLoading.value = false
  }

  // Charger historique retraits
  try {
    const res = await $fetch<WithdrawRecord[]>('/api/withdraw/history', {
      headers: { Authorization: token.value ?? '' }
    })
    history.value = res ?? []
  } catch (e) {
    console.error(e)
  } finally {
    historyLoading.value = false
  }
})

const handleLogout = () => {
  token.value = null
  navigateTo('/login')
}
</script>

<style scoped>
.shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.06) 40%,
    rgba(255,255,255,0.12) 50%,
    rgba(255,255,255,0.06) 60%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite linear;
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
</style>