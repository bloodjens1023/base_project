<script setup lang="ts">
import { ref, onMounted } from "vue-demi";
import NavigationButtons from "./NavigationButtons.vue";

interface Game {
  unId: string;
  gameImg: string;
  name: string;
  platformCode: string;
  gameType?: string;
}

const sectionRefs = ref<HTMLElement[]>([]);
const games = ref<Game[]>([]);
const groupedGames = ref<Record<string, Game[]>>({});
const loading = ref(true);
const error = ref<string | null>(null);

const MAX_GAMES_PER_PLATFORM = 30; // 2 lignes x 5 colonnes

const platformCodes = ref<string[]>([]);

onMounted(async () => {
  loading.value = true;
  try {
    const result = await $fetch<Game[]>("/api/game");
    games.value = result;

    const groups: Record<string, Game[]> = {};
    result.forEach((game) => {
      const platform = game.platformCode || "Autre";
      if (!groups[platform]) groups[platform] = [];
      if (groups[platform].length < MAX_GAMES_PER_PLATFORM) {
        groups[platform].push(game);
      }
    });

    groupedGames.value = groups;
    platformCodes.value = Object.keys(groups).sort();
  } catch (e) {
    console.error(e);
    error.value = "Impossible de charger les jeux.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <NavigationButtons 
    :groupedGames="groupedGames" 
    :platformCodes="platformCodes"
    :section-refs="sectionRefs"
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

    <!-- Jeux groupés -->
    <div v-else>
      <div
        v-for="platform in Object.keys(groupedGames)"
        :key="platform"
        :id="`platform-${platform}`"
        class="mb-8 mt-5"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-xl font-bold  mb-3 px-2" :style="{ color: 'var(--text)' }">
            {{ platform }}
          </h2>
          <button class="btn bg-base-100 rounded-2xl text-white">More <LucideArrowRight/></button>
        </div>
       <div class="overflow-x-auto custom-scrollbar overflow-y-hidden pb-3">
        <div class="grid grid-flow-col grid-rows-2 gap-4" style="grid-auto-columns: 136px;">
            <div 
            v-for="game in groupedGames[platform]" 
            :key="game.unId" 
            class="flex flex-col items-center w-34"
            >
            <div class="relative w-34 h-34 rounded-lg overflow-hidden shrink-0">
                
                <img
                :src="game.gameImg"
                :alt="game.name"
                class="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                loading="lazy"
                />
                
                
            </div>
            
            
            </div>
        </div>
        </div>
      </div>

      <div v-if="Object.keys(groupedGames).length === 0" class="text-center py-8 text-white">
        Aucun jeu disponible
      </div>
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
  background-color: #4a5568; /* couleur du curseur */
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #718096; /* couleur au hover */
}

/* Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #4a5568 transparent;
}
</style>
