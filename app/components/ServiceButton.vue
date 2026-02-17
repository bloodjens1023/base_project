<template>
  <button
    v-bind="$attrs"
    @click="openLink"
    class="w-full bg-gradient-to-b from-[#bfea36] to-[#48bc49]  active:from-emerald-700 active:via-green-700 active:to-teal-700 text-black font-semibold py-3 px-6 rounded-2xl shadow-xl border border-emerald-400/30  "
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
const { title, url, jumpOut } = defineProps<{
  title: string
  url: string
  jumpOut: number
}>()

function openLink() {
  if (jumpOut === 1) {
    window.open(url, '_blank')
  } else {
    window.location.href = url
  }
}
</script>
