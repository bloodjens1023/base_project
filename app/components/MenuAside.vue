<template>
  <teleport to="body">

    <!-- ✅ Overlay fade séparé de la slide du aside -->
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-99 bg-black/50"
        @click="handleClose"
      />
    </Transition>

    <!-- ✅ Slide du aside indépendant, transition directement sur l'élément racine -->
    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-100 pointer-events-none"
      >
        <div class="max-w-[500px] mx-auto h-full relative">
          <aside
            @click.stop
            class="pointer-events-auto absolute left-0 top-0 h-full w-[70%] bg-primary shadow-2xl overflow-y-auto scrollbar-none"
          >
            <!-- Header fixe -->
            <div
              class="sticky top-0 z-10 w-full backdrop-blur-sm text-white shadow-xl
                     border-b border-blue-800/30 px-4 py-4
                     flex items-center justify-between
                     bg-cover bg-no-repeat"
              :style="{ backgroundImage: `url('/asset/OMR6_kmw.png')` }"
            >
              <img src="/asset/svg/logo.svg" alt="logo" class="w-[120px]" />

              <button
                @click="handleClose"
                class="p-2 bg-base-100 cursor-pointer rounded-lg"
                aria-label="Fermer le menu"
              >
                <img :src="closeIcon" alt="Close" />
              </button>
            </div>

            <MenuAsideContent />
          </aside>
        </div>
      </div>
    </Transition>

  </teleport>
</template>

<script setup lang="ts">
import MenuAsideContent from './MenuAsideContent.vue'

const config = useRuntimeConfig()
const closeIcon = `${config.public.assetsURL}/static/svg/XVrMH9vx.svg`

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => emit('close')
</script>

<style scoped>
/* ✅ Overlay : simple fondu */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ✅ Aside : slide depuis la gauche
   La transition est sur l'élément racine de <Transition> directement */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

/* Scrollbar cachée */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>