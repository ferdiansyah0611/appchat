<template>
  <div>
    <nav class="bg-blue-700 flex p-3 h-auto fixed top-0 left-0 w-full shadow-md z-30">
      <div class="flex flex-wrap w-1/2 justify-start">
        <h5 class="text-white p-2 font-bold">App Chat</h5>
      </div>
      <div class="flex flex-wrap w-1/2 justify-end mr-2">
				<MenuIcon @click="menu" class="h-10 w-8 text-white float-right cursor-pointer" />
      </div>
    </nav>
    <div id="body-sidebar" :class="bodyClass">
      <div class="flex flex-wrap justify-center mt-5">
        <div class="w-full">
          <img v-if="user" :src="user.photoURL" alt="avatar" class="w-24 mx-auto">
          <img v-else src="/favicon.ico" alt="avatar" class="w-24 mx-auto">
        </div>
        <h3 v-if="user" class="w-full text-center font-bold mt-2">{{user.displayName}}</h3>
      </div>
      <div class="flex flex-wrap mt-5">
        <router-link to="/" class="w-full p-3 font-medium hover:bg-blue-300 hover:bg-opacity-50 flex">
          <HomeIcon class="h-6 w-1/3"/>
          <span class="-w-2/3">Home</span>
        </router-link>
        <a v-if="user" @click="logout" href="/" class="w-full p-3 font-medium hover:bg-blue-300 hover:bg-opacity-50 flex">
          <LogoutIcon class="h-6 w-1/3"/>
          <span class="-w-2/3">Logout</span>
        </a>
        <router-link v-if="!user" to="/login" class="w-full p-3 font-medium hover:bg-blue-300 hover:bg-opacity-50 flex">
          <LoginIcon class="h-6 w-1/3"/>
          <span class="-w-2/3">Login</span>
        </router-link>
      </div>
      <div class="absolute bottom-0 right-0 mb-4 mr-2">&copy; 2020 ferdiansyah0611</div>
    </div>
    <div @click="menu" id="overlay-sidebar" :class="overlayClass"></div>
  </div>
</template>
<script>
import {auth} from '@/firebase'
import {
  HomeIcon,MenuIcon,LogoutIcon,LoginIcon
} from '@vue-hero-icons/outline'

export default {
  name: 'Navbar',
  components: {
    MenuIcon,
    HomeIcon,
    LogoutIcon,
    LoginIcon
  },
  data(){
    return {
      user: auth.currentUser,
      opened: false,
      bodyClass: 'h-screen bg-blue-500 fixed right-0 top-0 text-white transition-all duration-500 z-40',
      overlayClass: 'h-screen bg-black fixed left-0 top-0 bg-opacity-75 transition-all duration-200 z-30 w-full'
    }
  },
  mounted(){},
  methods: {
    menu(e){
      e.preventDefault()
      if(this.opened)
      {
        this.opened = false
        document.body.classList.add('overflow-auto')
        document.body.classList.remove('overflow-hidden')
        document.querySelector('#body-sidebar').classList.remove('mr-max-0')
        document.querySelector('#overlay-sidebar').classList.remove('ml-max-0')
        return true
      }
      else{
        this.opened = true
        document.body.classList.add('overflow-hidden')
        document.body.classList.remove('overflow-auto')
        document.querySelector('#body-sidebar').classList.add('mr-max-0')
        document.querySelector('#overlay-sidebar').classList.add('ml-max-0')
      }
    },
    logout(e){
      e.preventDefault()
      auth.signOut().then(() => {
        this.$router.push({name: 'Login'})
      }).catch((error) => {
        console.error(error)
      });
    }
  }
}
</script>
<style>
  .ml-max-0{
    margin-left: 0% !important;
  }
  .mr-max-0{
    margin-right: 0% !important;
  }
  #body-sidebar{
    width: 240px;
    margin-right: -100%;
  }
  #overlay-sidebar{
    margin-left: -100%;
  }
</style>