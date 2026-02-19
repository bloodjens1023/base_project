<template>
  <div class="max-w-125 mx-auto px-5 mb-24 animate-pulse">

    <!-- ══════════════════════════════════
         Répété 3 fois = 3 catégories fantômes
    ═══════════════════════════════════════ -->
    <div
      v-for="section in 3"
      :key="section"
      class="mb-8 mt-5"
    >

      <!-- Header de catégorie fantôme -->
      <div class="flex items-center gap-3 mb-3 px-2">
        <!-- Icône -->
        <div class="w-10 h-10 rounded-lg bg-white/10" />
        <!-- Titre -->
        <div class="h-5 w-28 rounded-lg bg-white/10" />
        <!-- Count + bouton -->
        <div class="ml-auto flex items-center gap-2">
          <div class="h-4 w-12 rounded-md bg-white/10" />
          <div class="h-8 w-20 rounded-2xl bg-white/10" />
        </div>
      </div>

      <!-- Grille de cards fantômes (2 lignes × 4 colonnes) -->
      <div class="overflow-hidden">
        <div
          class="grid grid-flow-col grid-rows-2 gap-4"
          style="grid-auto-columns: 136px;"
        >
          <div
            v-for="card in 8"
            :key="card"
            class="flex flex-col gap-2 w-34"
          >
            <!-- Image fantôme -->
            <div class="w-34 h-34 rounded-lg bg-white/10 relative overflow-hidden">
              <!-- ✅ Shimmer effect — la ligne qui passe -->
              <div class="shimmer absolute inset-0" />
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* ✅ Shimmer — bande lumineuse qui traverse la card comme YouTube */
.shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.06) 40%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.06) 60%,
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