<script setup lang="ts">
import { ref, onMounted } from "vue-demi";
import NavigationButtons from "./NavigationButtons.vue";

// Interface pour une catégorie
interface Category {
  name: string;
  barLogo: string;
  barImgUrl?: string;
  gameType?: string;
  unId?: string;
  children?: Game[];
}

// Interface pour un jeu
interface Game {
  unId: string;
  gameImg: string;
  name: string;
  platformCode: string;
  playCode?: string;
  gameKindCode?: string;
  isVertical?: number;
  demoEnable?: number;
  leftLogoText?: string;
  rightLogoText?: string;
}

const categories = ref<Category[]>([]); // Stocker les catégories complètes
const groupedGames = ref<Record<string, Game[]>>({});
const loading = ref(true);
const error = ref<string | null>(null);

const MAX_GAMES_PER_PLATFORM = 100; // 2 lignes x 5 colonnes
const platformCodes = ref<string[]>([]);

onMounted(async () => {
  loading.value = true;
  try {
    // Appel à l'API qui retourne maintenant les catégories formatées
    const result = await $fetch<{ success: boolean; data: Category[] }>("/api/game");
    
    if (result.success) {
      categories.value = result.data;
      
      // Extraire tous les jeux pour le regroupement par plateforme
      const allGames: Game[] = [];
      result.data.forEach(category => {
        if (category.children) {
          allGames.push(...category.children);
        }
      });
      
      // Regrouper par plateforme (comme avant)
      const groups: Record<string, Game[]> = {};
      allGames.forEach((game) => {
        const platform = game.platformCode || "Autre";
        if (!groups[platform]) groups[platform] = [];
        if (groups[platform].length < MAX_GAMES_PER_PLATFORM) {
          groups[platform].push(game);
        }
      });

      groupedGames.value = groups;
      platformCodes.value = Object.keys(groups).sort();
    } else {
      throw new Error("Erreur lors du chargement des données");
    }
  } catch (e) {
    console.error(e);
    error.value = "Impossible de charger les jeux.";
  } finally {
    loading.value = false;
  }
});

const sectionRefs = ref<Record<string, HTMLElement | null>>({})

const setSectionRef = (el: HTMLElement | null, name: string) => {
  if (el) {
    sectionRefs.value[name] = el
  }
}


const scrollToSection = (name: string) => {
  const el = sectionRefs.value[name]
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

function enleverPrefix(str) {
  return str.replace("intl_a_", "");
}



</script>

<template>
  <NavigationButtons 
    :groupedGames="categories" 
    :platformCodes="platformCodes"
    :section-refs="sectionRefs"
    @scroll-to="scrollToSection"
    v-if="!loading"
  />

  <div class="max-w-125 mx-auto px-5 mb-24">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-8 text-white">
        <Loading/>
    </div>

    <!-- Erreur -->
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <!-- Affichage des catégories avec leurs logos -->
    <div v-else>
      <!-- Version 1: Affichage par catégories (comme dans mes exemples) -->
      <div
        v-for="category in categories"
        :key="category.name"
         :ref="el => setSectionRef(el, category.name)"
        class="mb-8 mt-5"
      >
        <!-- En-tête de catégorie avec logo -->
        <div class="flex items-center gap-3 mb-3 px-2">
          <img 
            v-if="category.barLogo"
            :src="category.barLogo" 
            :alt="category.name"
            class="w-10 h-10 object-contain rounded-lg bg-gray-800 p-1"
            @error="$event.target.src = '/placeholder.png'"
          >
          <h2 class="text-xl font-bold" :style="{ color: 'var(--text)' }">
            {{ enleverPrefix(category.name) }}
          </h2>
          <span class="text-sm text-gray-400 ml-auto">
            {{ category.children?.length || 0 }} jeux
          </span>
          <button class="btn bg-base-100 rounded-2xl text-white text-sm px-3 py-1">
            More <LucideArrowRight class="w-4 h-4"/>
          </button>
        </div>
        
        <!-- Scroll horizontal des jeux de la catégorie -->
        <div class="overflow-x-auto custom-scrollbar overflow-y-hidden pb-3">
          <div class="grid grid-flow-col grid-rows-2 gap-4" style="grid-auto-columns: 136px;">
            <div 
              v-for="game in category.children || []" 
              :key="game.unId" 
              class="flex flex-col items-center w-34 relative group"
            >
              <div class="relative w-34 h-34 rounded-lg overflow-hidden shrink-0">
                <img
                  :src="game.gameImg"
                  :alt="game.name"
                  class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  @error="$event.target.src = '/placeholder-game.jpg'"
                />
                
                <!-- Badge plateforme (optionnel) -->
                <span class="absolute top-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {{ game.platformCode }}
                </span>
                
                <!-- Badge démo si disponible -->
                <span v-if="game.demoEnable === 2" class="absolute top-1 right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded">
                  Demo
                </span>
              </div>
              
             
            </div>
          </div>
        </div>
      </div>

    
      <div v-if="categories.length === 0" class="text-center py-8 text-white">
        Aucune catégorie disponible
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles scrollbar custom */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4a5568;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #718096;
}

/* Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #4a5568 transparent;
}

/* Animation hover pour les jeux */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}
</style>