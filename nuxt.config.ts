import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: ["nuxt-lucide-icons", "@nuxtjs/i18n"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/tailwind.css"],
});