<template>
  <div class="max-w-[500px] mx-auto min-h-screen bg-base-100">
    <HeaderGlobal title="Service"/>
    <div class="max-w-2xl mx-auto px-2 py-8">
      <div
        v-if="!loading"
        class="bg-primary backdrop-blur-md rounded-2xl shadow-2xl py-2 px-2 mb-8 text-center  font-Montserrat-Regular"
      >
        <p class="text-gray-300 text-[14px] mt-2">
          {{ t('service_description') }}
        </p>
      </div>

      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-12"
      >
        <Loading />
      </div>

      <div
        v-else-if="error"
        class="bg-error/10 border-l-4 border-error p-4 rounded-xl backdrop-blur-sm"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-error mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-error-content">{{ error }}</span>
        </div>
      </div>

      <div v-else class="flex flex-col space-y-4">
        <ServiceButton
          v-for="(btn, index) in buttons"
          :key="index"
          :title="btn.title"
          :url="btn.url"
          :jumpOut="jumpOut"
          class="transform transition-all duration-200 hover:scale-102 hover:shadow-2xl"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
import { ref, onMounted } from "vue-demi";
import HeaderGlobal from "~/components/HeaderGlobal.vue";
import ServiceButton from "~/components/ServiceButton.vue";

const buttons = ref<{ title: string; url: string }[]>([]);
const jumpOut = ref(0);
const loading = ref(true);
const error = ref("");


interface ServiceConfig {
  jumpOut: number;
  customerButtons: { title: string; url: string }[];
}

onMounted(async () => {
  try {
    const result = await $fetch<ServiceConfig>("/api/service");
    buttons.value = result.customerButtons;
    jumpOut.value = result.jumpOut;
  } catch (e) {
    error.value = "Impossible de charger les options de service client.";
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
