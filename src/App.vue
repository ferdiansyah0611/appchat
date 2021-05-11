<template>
  <div class="bg-gray-200 w-full sm:w-3/5 md:w-2/5 mx-auto h-screen relative">
    <nav class="bg-blue-700 flex p-2 h-auto absolute top-0 left-0 w-full shadow-md">
      <div class="flex flex-wrap w-1/2 justify-start">
        <h5 class="text-white p-2 font-bold">App Chat</h5>
      </div>
      <div class="flex flex-wrap w-1/2 justify-end mr-2">
        <MenuIcon class="h-10 text-white float-right cursor-pointer" />
      </div>
    </nav>
    <div class="overflow-auto h-screen">
      <router-view/>
    </div>
  </div>
</template>
<script>
import {MenuIcon} from '@vue-hero-icons/outline'
export default{
  name: 'App',
  components:{
    MenuIcon
  },
  mounted(){
    document.body.classList.add('overflow-hidden', 'bg-black')
  }
}
</script>