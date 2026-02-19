<template>
  <div class="max-w-2xl mx-auto px-2 ">

    <!-- Description fantôme -->
    <div class="bg-primary rounded-2xl py-4 px-4 mb-8 relative overflow-hidden">
      <div class="h-3 w-100 mx-auto rounded bg-white/10 relative overflow-hidden mb-2">
        <div class="shimmer absolute inset-0" />
      </div>
      <div class="h-3 w-1/2 mx-auto rounded bg-white/10 relative overflow-hidden">
        <div class="shimmer absolute inset-0" />
      </div>
    </div>

    <!-- Boutons fantômes -->
    <div class="flex flex-col space-y-4">
      <div
        v-for="i in 3"
        :key="i"
        class="w-full h-14 rounded-2xl bg-primary relative overflow-hidden"
      >
        <div class="shimmer absolute inset-0" />
      </div>
    </div>

  </div>
</template>

<style scoped>
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