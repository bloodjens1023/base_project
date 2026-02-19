<template>
  <div class="max-w-[500px] mx-auto min-h-screen bg-base-100">
    <HeaderGlobal title="Service" />

    <div class="max-w-2xl mx-auto px-2 pt-24">

      <div
        v-if="!loading"
        class="bg-primary backdrop-blur-md rounded-2xl shadow-2xl py-2 px-2 mb-8 text-center"
      >
        <p class="text-gray-300 text-[14px]">
          {{ t('service_description') }}
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-12">
        <LoadingSkeleton />
      </div>

      <!-- Erreur -->
      <div
        v-else-if="error"
        class="bg-error/10 border-l-4 border-error p-4 rounded-xl"
      >
        <div class="flex items-center gap-3">
          <LucideAlertCircle class="h-6 w-6 text-error flex-shrink-0" />
          <span class="text-error-content">{{ error }}</span>
        </div>
      </div>

      <!-- Boutons -->
      <div v-else class="flex flex-col space-y-4">
        <ServiceButton
          v-for="(btn, index) in buttons"
          :key="index"
          :title="btn.title"
          :url="btn.url"
          :jumpOut="jumpOut"
          class="transform transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl"
        />

        <!-- État vide -->
        <div
          v-if="buttons.length === 0"
          class="text-center py-12 text-white/40"
        >
          <LucideHeadphones class="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>{{ t('service_unavailable') }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderGlobal from '~/components/HeaderGlobal.vue'
import ServiceButton from '~/components/ServiceButton.vue'
import { useI18n } from 'vue-i18n'
import LoadingSkeleton from '~/components/LoadingSkeleton.vue'

const { t } = useI18n()

interface ServiceButton {
  title: string
  url: string
}

interface ServiceConfig {
  jumpOut: number
  customerButtons: ServiceButton[]
}

const buttons = ref<ServiceButton[]>([])
const jumpOut = ref(1)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    // ✅ CORRIGÉ : pointe vers le nouvel endpoint qui appelle la vraie API
    const result = await $fetch<ServiceConfig>('/api/config/service')
    buttons.value = result.customerButtons
    jumpOut.value = result.jumpOut
  } catch (e: any) {
    error.value = t('errors.serviceLoad')
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>