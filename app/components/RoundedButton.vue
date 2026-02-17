
<template>
  <div 
    class="z-0 mt-[2px] relative w-full aspect-[1.4/1] flex flex-col menu-icon-bg justify-center items-center rounded-[var(--borderRadius)]  bg-contain bg-no-repeat"
    style="background-image: url(&quot;https://downpg117.uqianbao.com/source/public/static/webp/2t18UHtq.webp&quot;);"
  >
    <div class="flex flex-col gap-[4px]">
        <img :src="bgImage"  alt="" class="h-[50px] w-[50px] mt-[8px]">
      </div>
      <div class="mt-4 text-[12px] font-bold"><p>{{ title }}</p></div>
  </div>
  
</template>

<script setup>
defineProps({
  bgImage: {
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  }
})
</script>