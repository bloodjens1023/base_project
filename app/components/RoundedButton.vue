
<template>
  <div 
    class="z-0 mt-0.5 relative w-full aspect-[1.4/1] flex flex-col menu-icon-bg justify-center items-center rounded-(--borderRadius)  bg-contain bg-no-repeat"
    style="background-image: url(&quot;https://downpg117.uqianbao.com/source/public/static/webp/2t18UHtq.webp&quot;);"
  >
    <div class="flex flex-col gap-1">
        <img :src="bgImage"  alt="" class="h-12.5 w-12.5 mt-2">
      </div>
      <div class="mt-4 mb-2 text-[12px] font-bold"><p>{{ title }}</p></div>
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