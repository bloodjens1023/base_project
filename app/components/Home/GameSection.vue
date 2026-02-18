<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useI18n } from "vue-i18n"
import NavigationButtons from "./NavigationButtons.vue"

interface Category {
  name: string
  barLogo: string
  children?: Game[]
}

interface Game {
  unId: string
  gameImg: string
  name: string
  platformCode: string
  demoEnable?: number
}

const { t } = useI18n()

const categories = ref<Category[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const sectionRefs = ref<Record<string, HTMLElement | null>>({})

const setSectionRef = (el: HTMLElement | null, name: string) => {
  if (el) sectionRefs.value[name] = el
}

const scrollToSection = (name: string) => {
  sectionRefs.value[name]?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// 🔥 Pré-traitement des catégories (évite enleverPrefix dans le template)
const formattedCategories = computed(() =>
  categories.value.map(cat => ({
    ...cat,
    displayName: cat.name.replace("intl_a_", "")
  }))
)

onMounted(async () => {
  try {
    const result = await $fetch<{ success: boolean; data: Category[] }>("/api/game")

    if (!result.success) throw new Error()

    categories.value = result.data
  } catch (e) {
    console.error(e)
    error.value = t("errors.gamesLoad") // ✅ i18n
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <NavigationButtons
    :groupedGames="formattedCategories"
    :section-refs="sectionRefs"
    @scroll-to="scrollToSection"
    v-if="!loading"
  />

  <div class="max-w-125 mx-auto px-5 mb-24">

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8 text-white">
      <Loading />
    </div>

    <!-- Erreur -->
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <!-- Catégories -->
    <div v-else>

      <div
        v-for="category in formattedCategories"
        :key="category.name"
        :ref="el => setSectionRef(el, category.name)"
        class="mb-8 mt-5"
      >

        <!-- Header -->
        <div class="flex items-center gap-3 mb-3 px-2">

          <img
            v-if="category.barLogo"
            :src="category.barLogo"
            :alt="category.displayName"
            class="w-10 h-10 object-contain rounded-lg  p-1"
            loading="lazy"
          />

          <h2 class="text-xl font-bold text-(--text)">
            {{ category.displayName }}
          </h2>

          <span class="text-sm text-gray-400 ml-auto">
            {{ category.children?.length || 0 }} {{ t('games.label') }}
          </span>

          <button class="btn bg-base-100 rounded-2xl text-white text-sm px-3 py-1">
            {{ t('common.more') }}
            <LucideCircleArrowRight/>
          </button>
        </div>

        <!-- Games -->
        <div class="overflow-x-auto custom-scrollbar pb-3">
          <div
            class="grid grid-flow-col grid-rows-2 gap-4"
            style="grid-auto-columns: 136px;"
          >

            <div
              v-for="game in category.children || []"
              :key="game.unId"
              class="flex flex-col items-center w-34 relative group"
            >

              <div class="relative w-34 h-34 rounded-lg overflow-hidden">

                <img
                  :src="game.gameImg"
                  :alt="game.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                <!-- Platform -->
                <span class="absolute top-2 left-2 btn btn-primary rounded-full">
                  {{ game.platformCode }}
                </span>

                <!-- Demo -->
                <span
                  v-if="game.demoEnable === 2"
                  class="absolute top-1 right-1 badge badge-warning"
                >
                  {{ t('games.demo') }}
                </span>

              </div>

            </div>

          </div>
        </div>

      </div>

      <div v-if="formattedCategories.length === 0" class="text-center py-8 text-white">
        {{ t('games.empty') }}
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