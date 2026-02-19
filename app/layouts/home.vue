<template>
  <div class="min-h-screen bg-white">
    <div class="w-full max-w-[500px] mx-auto flex flex-col min-h-screen bg-base-100">

      <!-- Header -->
      <TheHeader />

      <!-- Main -->
      <main class="flex-1">
        <slot />
      </main>

      <!-- Footer -->
      <TheFooter />

    </div>
  </div>
</template>