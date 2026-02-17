<script setup>
import { Sun, Moon } from "lucide-vue-next";
import { useTheme } from '../../composables/useTheme'

const { setTheme } = useTheme()

const themes = [
  { name: "synthwave", icon: Sun },
  { name: "abyss", icon: Moon }
]

const selectTheme = (name) => {
  setTheme(name)
}
</script>

<template>
  <div class="flex gap-4 p-4">
    <button
      v-for="t in themes"
      :key="t.name"
      @click="selectTheme(t.name)"
      class="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      <component :is="t.icon" class="w-6 h-6"/>
    </button>
  </div>
  
</template>
