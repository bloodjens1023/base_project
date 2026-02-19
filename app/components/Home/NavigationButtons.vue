<template>
  <div class="w-full sticky top-14 z-50">

    <!-- ═══════════════════════════════════════
         BARRE DU HAUT — Tabs avec icônes
    ════════════════════════════════════════════ -->
    <div class="w-full bg-base-100/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div
        ref="scrollContainer"
        class="flex overflow-x-auto no-scrollbar px-2 pt-2 gap-1"
      >
        <button
          v-for="(category, index) in groupedGames"
          :key="category.name"
          @click="selectTab(index, category.name)"
          class="relative flex flex-col items-center gap-1 px-4 pb-2 pt-1.5 min-w-fit whitespace-nowrap transition-all duration-200 group"
        >
          <!-- Icône -->
          <div
            :class="[
              'w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200',
              activeTab === index
                ? 'bg-secondary shadow-lg shadow-secondary/40 scale-110'
                : 'bg-white/10 group-hover:bg-white/20'
            ]"
          >
            <img
              v-if="category.barLogo"
              :src="category.barLogo"
              :alt="category.displayName"
              class="w-5 h-5 object-contain"
            />
            <LucideGamepad2 v-else class="w-4 h-4 text-white" />
          </div>

          <!-- Label -->
          <span
            :class="[
              'text-[10px] font-bold transition-colors duration-200',
              activeTab === index ? 'text-secondary' : 'text-white/50 group-hover:text-white/80'
            ]"
          >
            {{ category.displayName }}
          </span>

          <!-- Indicateur actif -->
          <div
            v-if="activeTab === index"
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-secondary"
          />
        </button>
      </div>
    </div>

    <!-- ═══════════════════════════════════════
         BARRE DU BAS — Recherche
    ════════════════════════════════════════════ -->
    <div class="w-full bg-primary/80 backdrop-blur-md border-b border-white/10 px-3 py-2">
      <div class="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 border border-white/10 focus-within:border-secondary/60 focus-within:bg-white/15 transition-all duration-200">
        <LucideSearch class="w-4 h-4 text-white/40 flex-shrink-0" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('common.search')"
          class="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none"
          @input="$emit('search', searchQuery)"
        />
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="text-white/40 hover:text-white transition-colors"
        >
          <LucideX class="w-4 h-4" />
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'

const { t } = useI18n()

const props = defineProps<{
  groupedGames?: Array<{
    name: string
    displayName: string
    barLogo?: string
    [key: string]: any
  }> | null
}>()

const emit = defineEmits<{
  (e: 'scroll-to', name: string): void
  (e: 'search', query: string): void
}>()

const activeTab = ref(0)
const searchQuery = ref('')
const scrollContainer = ref<HTMLElement | null>(null)

const tabs = computed(() => props.groupedGames?.map(cat => cat.name) ?? [])

// ✅ Sélection onglet + scroll automatique du tab actif dans la barre
const selectTab = async (index: number, name: string) => {
  activeTab.value = index
  emit('scroll-to', name)

  await nextTick()

  // Scroll le tab actif au centre de la barre
  const container = scrollContainer.value
  const activeBtn = container?.children[index] as HTMLElement
  if (container && activeBtn) {
    const offset = activeBtn.offsetLeft - container.clientWidth / 2 + activeBtn.clientWidth / 2
    container.scrollTo({ left: offset, behavior: 'smooth' })
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('search', '')
}

// ✅ IntersectionObserver pour sync onglet actif au scroll de la page
let observer: IntersectionObserver | null = null

const initObserver = async () => {
  await nextTick()
  observer?.disconnect()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const name = entry.target.getAttribute('data-section')
          const index = tabs.value.findIndex(t => t === name)
          if (index !== -1) activeTab.value = index
        }
      })
    },
    {
      rootMargin: '-80px 0px -50% 0px',
      threshold: 0.1,
    }
  )

  document.querySelectorAll('[data-section]').forEach(el => {
    observer?.observe(el)
  })
}

onMounted(initObserver)
watch(tabs, initObserver)
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>