<template>
  <div
    class="w-full max-w-[500px] mx-auto h-[30px] px-3 overflow-hidden"
    role="region"
    aria-label="Latest withdrawals"
  >
    <div class="flex w-full h-full items-center overflow-hidden">

      <!-- Speaker Icon -->
      <LucideVolume2/>

      <!-- News Marquee -->
      <div class="flex-1 overflow-hidden ml-3">
        <div
          class="flex whitespace-nowrap will-change-transform animate-marquee"
        >
          <div
            v-for="item in duplicatedNews"
            :key="item.id"
            class="mx-6 flex items-center text-xs font-semibold"
          >
            {{ item.text }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>



<script setup lang="ts">
import { computed } from 'vue'
const { t } = useI18n()

// Structure plus propre
const baseNews = [
  { id: 1, phone: "339***029", amount: "2.035,00" },
  { id: 2, phone: "519***780", amount: "207,00" },
  { id: 3, phone: "619***123", amount: "590,00" },
  { id: 4, phone: "379***237", amount: "590,00" },
  { id: 5, phone: "719***596", amount: "207,00" },
  { id: 6, phone: "649***378", amount: "207,00" },
  { id: 7, phone: "349***336", amount: "494,00" },
  { id: 8, phone: "939***712", amount: "1.200,00" },
  { id: 9, phone: "479***431", amount: "207,00" },
  { id: 10, phone: "479***633", amount: "207,00" }
]

// Texte traduit dynamiquement
const news = computed(() =>
  baseNews.map(item => ({
    id: item.id,
    text: t('withdrawal_message', {
      phone: item.phone,
      amount: item.amount
    })
  }))
)

// Duplication optimisée (au lieu de double v-for)
const duplicatedNews = computed(() => [...news.value, ...news.value])
</script>


<style scoped>
.animate-marquee {
  animation: marquee 5s linear infinite;
  transform: translate3d(0, 0, 0);
}

.animate-marquee:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translate3d(0%, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
