<template>
  <div class="bg-gray-200 w-full mx-auto">
    <Navbar/>
    <div class="bg-blue-100 mt-20">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
export default{
  name: 'App',
  components:{
    Navbar
  },
  mounted(){
    document.body.classList.add('bg-blue-100')
  }
}
</script>