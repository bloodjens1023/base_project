<template>
  <div class="w-full max-w-[500px] mx-auto h-[30px] px-3 overflow-hidden">
    
    <div class="flex w-full h-full items-center overflow-hidden">
      
      <!-- Speaker -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 106 104"
        class="w-[22px] h-[22px] flex-shrink-0"
      >
        <g fill="#f8dd29">
          <path d="M52.54 0h2.84c3.8 1.66 3.91 6.38 4.13 9.93.04 28.37.02 56.73.01 85.1.2 3.48-1.62 6.48-3.85 8.97h-.61c-4.97.44-8.15-3.65-11.55-6.56-10-8.95-20.17-17.72-30.56-26.23-4.29.41-10.71 1.06-12.17-4.25C.27 59 .74 50.99.56 43.01c.11-2.89-.53-6.34 1.78-8.57 2.69-2.96 7.03-1.91 10.55-2.1C22.91 23.89 33 15.51 43.08 7.13c3.05-2.51 5.93-5.29 9.46-7.13ZM79.13 22.99c-.21-2.85 2.43-4.61 4.84-5.32 3.44.83 6.04 3.39 8.54 5.73 8.29 7.75 13.44 19.07 12.86 30.5-.51 12.8-7.89 24.86-18.48 31.9-3.24 2.49-8.47-.92-7.74-4.84.07-2.37 2.25-3.67 3.85-5.03 7.52-5.89 12.58-15.23 12.18-24.9-.39-9.28-5.86-17.79-13.2-23.21-1.52-1.15-3.16-2.71-2.85-4.83Z"/>
          <path d="M75.12 36.26c1.23-.74 2.46-.75 3.67-.04 9.63 7.92 9.55 24.46-.21 32.26-3.26 1.49-7.02-2.28-5.89-5.62 1.15-2.72 3.34-4.94 4.07-7.85 1.07-4.23-.87-8.22-3.2-11.62-1.71-2.24-1.13-5.97 1.56-7.13Z"/>
        </g>
      </svg>

      <!-- News -->
      <div class="flex-1 overflow-hidden ml-3">
        <div class="flex whitespace-nowrap animate-marquee">
          
          <div
            v-for="loop in 2"
            :key="loop"
            class="flex"
          >
            <span
              v-for="(item, index) in news"
              :key="index"
              class="mx-6 flex items-center text-xs font-semibold"
            >
              {{ item }}
            </span>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>



<script setup>
const news = [
  "339***029 acabou de retirar 2.035,00 R$",
  "519***780 acabou de retirar 207,00 R$",
  "619***123 acabou de retirar 590,00 R$",
  "379***237 acabou de retirar 590,00 R$",
  "719***596 acabou de retirar 207,00 R$",
  "649***378 acabou de retirar 207,00 R$",
  "349***336 acabou de retirar 494,00 R$",
  "939***712 acabou de retirar 1.200,00 R$",
  "479***431 acabou de retirar 207,00 R$",
  "479***633 acabou de retirar 207,00 R$",
];
</script>

<style scoped>
.animate-marquee {
  animation: marquee 60s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>