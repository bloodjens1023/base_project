<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
const { t } = useI18n() // Hook i18n
const props = defineProps<{
  groupedGames?: Record<string, any> | null
}>()

// Onglet actif
const activeTab = ref(0)

// Générer les tabs dynamiquement
const tabs = computed(() => {
  if (!props.groupedGames) return []
  return Object.keys(props.groupedGames)
})



let observer: IntersectionObserver | null = null

const initObserver = async () => {
  await nextTick()

  observer?.disconnect()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const name = entry.target.id.replace('platform-', '')
          const index = tabs.value.findIndex(t => t === name)
          if (index !== -1) activeTab.value = index
        }
      })
    },
    {
      rootMargin: '-80px 0px -50% 0px',
      threshold: 0.1
    }
  )

  document.querySelectorAll('[id^="platform-"]').forEach(el => {
    observer?.observe(el)
  })
}

onMounted(initObserver)

watch(tabs, () => {
  initObserver()
})
function enleverPrefix(str) {
  return str.replace("intl_a_", "");
}
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="w-full flex gap-4 px-4 justify-center items-center">
    
    <!-- Tabs -->
    <div class="flex gap-2 overflow-x-auto sticky top-0 z-10 py-2 custom-scrollbar">
      <div
        v-for="(category, index) in groupedGames"
        :key="category.name"
         @click="$emit('scroll-to', category.name)"
        :class="[
          'px-6 py-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-2 min-w-fit whitespace-nowrap',
          activeTab === parseInt(index)
            ? 'font-bold btn btn-secondary shadow-lg scale-105 text-gray-950'
            : 'font-semibold btn btn-primary'
        ]"
      >
        <span class="text-sm">{{ enleverPrefix(category.name) }}</span>
      </div>
    </div>

    <!-- Search -->
    <div class="btn btn-primary flex items-center justify-center p-1 rounded-lg">
      <input
        type="text"
        :placeholder="t('common.search')" 
        class="px-5 py-2 max-w-40 h-[50%] rounded-xl border-none outline-none text-white"
      />
    </div>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #fff;
  border-radius: 3px;
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #fff transparent;
}
</style>
