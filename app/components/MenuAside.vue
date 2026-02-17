<template>
  <teleport to="body">
    <transition name="slide">
      <div v-if="isOpen" class="fixed inset-0 z-[99]" @click="handleClose">
        <div class="absolute inset-0 bg-black/50"></div>

        <div class="max-w-[500px] mx-auto h-full relative">
          <aside
            @click.stop
            class="absolute left-0 top-0 h-full w-[70%] bg-primary shadow-2xl overflow-y-auto scrollbar-none"
          >
            <!-- Header fixe -->
            <div
              class="sticky top-0 z-10 w-full 
                      theme-bg
                     backdrop-blur-sm text-white shadow-xl 
                     border-b border-blue-800/30 
                     px-4 py-4 flex items-center justify-between"
            
            >
              <img src="/asset/svg/logo.svg" alt="" class="w-[120px]" />

              <button
                @click="handleClose"
                class="p-2 bg-blue-800/50 rounded-xl hover:bg-blue-700/50 transition-all duration-200"
                aria-label="Fermer"
              >
                <img
                  :src="asset('/static/svg/XVrMH9vx.svg')"
                  alt="Close"
                />
              </button>
            </div>

            <menu-aside-content />
          </aside>
        </div>
      </div>
    </transition>
  </teleport>
</template>



<script setup lang="ts">
import MenuAsideContent from './MenuAsideContent.vue';
const config = useRuntimeConfig()

const asset = (path: string) =>
  `${config.public.assetsURL}${path}`

const bg = (path: string) =>
  `url(${config.public.assetsURL}${path})`

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};
</script>

<style scoped>
.slide-enter-active aside,
.slide-leave-active aside {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from aside,
.slide-leave-to aside {
  transform: translateX(-320px);
}

.slide-enter-to aside,
.slide-leave-from aside {
  transform: translateX(0);
}

/* Masquer la scrollbar */
.scrollbar-none::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.scrollbar-none {
  -ms-overflow-style: none; /* IE et Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
