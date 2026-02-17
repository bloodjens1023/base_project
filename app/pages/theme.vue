<script setup>
import { useTheme } from '../../composables/useTheme'

const { theme, setTheme } = useTheme()

const themes = [
  { name: "light",     label: "Light" },
  { name: "night",     label: "Night" },
  { name: "dark",      label: "Dark" },
  { name: "synthwave", label: "Synthwave" },
  { name: "abyss",     label: "Abyss" },
  { name: "retro",     label: "Retro" },
]
</script>

<template>
  <div class="p-4">
    <select
      class="select select-bordered w-full max-w-xs"
      :value="theme"
      @change="setTheme($event.target.value)"
    >
      <option v-for="t in themes" :key="t.name" :value="t.name">
        {{ t.label }}
      </option>
    </select>
  </div>
</template>