<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue-demi'


const props = defineProps<{
  groupedGames?: Record<string, { unId: string; gameImg: string; name: string }[]> | null;
  platformCodes?: string[];
}>()

// ✅ Computed pour éviter les erreurs undefined
const tabs = computed(() => {
  if (!props.groupedGames || Object.keys(props.groupedGames).length === 0) {
    return []
  }
  return Object.keys(props.groupedGames).map((platform, i) => ({
    name: platform,
    active: i === 0,
    icon: '<path d="M12 2L2 7h20L12 2z"/>'
  }))
})

// ✅ FONCTION scrollToSection COMPLÈTE
const scrollToSection = async (index: number) => {
  // 1. Activer la bonne tab
  const tabList = tabs.value
  tabList.forEach((tab, i) => tab.active = i === index)
  
  // 2. Trouver l'élément par ID
  await nextTick()
  const platform = tabs.value[index]?.name
  if (!platform) return
  
  const element = document.getElementById(`platform-${platform}`)
  if (element) {
    const navHeight = 80 // Hauteur de votre nav sticky
    const offsetTop = element.offsetTop - navHeight
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

// ✅ Détecter la section active au scroll
let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const platformName = entry.target.id.replace('platform-', '')
          const index = tabs.value.findIndex(tab => tab.name === platformName)
          if (index !== -1) {
            tabs.value.forEach((tab, i) => tab.active = i === index)
          }
        }
      })
    },
    { 
      rootMargin: '-80px 0px -50% 0px', 
      threshold: 0.1 
    }
  )
  
  // Observer toutes les sections platform-*
  nextTick(() => {
    document.querySelectorAll('[id^="platform-"]').forEach(el => {
      observer?.observe(el as Element)
    })
  })
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="w-full flex gap-4 px-4 justify-center items-center">
    <div class=" flex gap-2 overflow-x-auto sticky top-0 z-5 py-2  custom-scrollbar ">
    <div
      v-for="(tab, index) in tabs"
      :key="tab.name"
      @click="scrollToSection(index)"
      :class="[
        'tabs-item px-6 py-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-2 min-w-fit whitespace-nowrap',
        tab.active
          ? 'font-bold btn btn-secondary shadow-lg scale-105 text-gray-950'
          : 'font-semibold btn btn-primary'
      ]"
    >
      <LucideFlame v-if="tab.name==='PG'"/>
      <span class="text-sm">{{ tab.name }}</span>
      
    </div>
  </div>
  <div class="btn btn-primary flex items-center justify-center p-1 rounded-lg ">
    <LucideSearch size="30" stroke-width="2"/>
    <input
        type="text"
      
        placeholder="Buscar"
        class="w-auto px-5 py-2 max-w-25 h-[50%]  rounded-xl border-none outline-none text-white flex-1"
      />
  </div>
    
  </div>
 
  
  
</template>
<style scoped>
/* Styles scrollbar custom */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px; /* Hauteur de la scrollbar horizontale */
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent; /* fond transparent ou couleur douce */
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #ffff; /* couleur du curseur */
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #ffff; /* couleur au hover */
}

/* Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #ffff transparent;
}
</style>