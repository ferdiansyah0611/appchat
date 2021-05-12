<template>
	<section class="mx-auto mt-10 flex flex-wrap justify-center text-center ml-5 mr-5">
		<div class="w-full sm:w-1/3 bg-white p-10">
			<h3 class="font-bold text-xl w-full mb-8">Login App Chat</h3>
			<div id="error" class="bg-red-400 text-white p-3 mb-3" v-if="error">{{error}}</div>
			<form class="w-full" @submit="submit">
				<input v-model="email" class="w-full p-3 border focus:outline-none focus:ring" type="email" placeholder="Email">
				<input v-model="password" class="w-full p-3 border focus:outline-none focus:ring mt-2" type="password" placeholder="Password" autocomplete="off">
				<button type="submit" class="p-3 text-black rounded w-full font-bold mt-2 focus:outline-none focus:ring focus:ring-blue-400 hover:bg-gray-200 transition-all duration-500">Submit</button>
			</form>
			<div class="w-full flex">
				<span class="border w-1/3 border-b-0 border-l-0 border-r-0 mt-3"></span>
				<span class="w-1/3 font-medium">OR</span>
				<span class="border w-1/3 border-b-0 border-l-0 border-r-0 mt-3"></span>
			</div>
			<button
				@click="facebook"
				class="bg-blue-500 p-3 text-white rounded w-full font-medium mt-2 focus:outline-none focus:ring focus:ring-blue-400 hover:bg-blue-600 transition-all duration-500"
			>
			LOGIN WITH FACEBOOK
			</button>
			<button
				@click="google"
				class="bg-gray-300 p-3 text-gray-600 rounded w-full font-medium mt-2 focus:outline-none focus:ring focus:ring-gray-100 hover:bg-gray-400 hover:bg-opacity-75 transition-all duration-500"
			>
			LOGIN WITH GOOGLE
			</button>
		</div>
	</section>
</template>
<script>
import firebase from 'firebase'
export default{
	name: 'Login',
	data: () =>{
		return{
			email: '',
			password: '',
			error: ''
		}
	},
	created(){
		document.title = 'Login | App Chat'
		this.$store.watch(function(state){
			return state.users
		}, function(){
			console.log('change')
		}, {
			deep: true
		})
	},
	beforeMount(){
		const auth = firebase.auth().currentUser
		if(auth){
			this.$router.push({name: 'Home'})
		}
	},
	methods: {
		facebook(){
			var provider = new firebase.auth.FacebookAuthProvider();
			firebase.auth().signInWithPopup(provider).then(res => {
				firebase.firestore().collection('users').doc(res.user.uid).set({
					uid: res.user.uid,
					name: res.user.displayName,
					email: res.user.email,
					photo: res.user.photoURL
				}).then(() => {
					this.$store.commit('addUser', res.user)
					this.$router.push({name: 'Home'})
				}).catch(e => console.error(e))
			}).catch(e => {
				this.error = e.message
				document.querySelector('#error').classList.remove('hidden')
				setTimeout(() => {
					this.error = ''
					document.querySelector('#error').classList.add('hidden')
				}, 10000)
			})
		},
		google(){
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(res => {
				firebase.firestore().collection('users').doc(res.user.uid).set({
					uid: res.user.uid,
					name: res.user.displayName,
					email: res.user.email,
					photo: res.user.photoURL
				}).then(() => {
					this.$store.commit('addUser', res.user)
					this.$router.push({name: 'Home'})
				}).catch(e => console.error(e))
			}).catch(e => {
				this.error = e.message
				document.querySelector('#error').classList.remove('hidden')
				setTimeout(() => {
					this.error = ''
					document.querySelector('#error').classList.add('hidden')
				}, 10000)
			})
		},
		submit(e){
			e.preventDefault()
			firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(result => {
				console.log(result)
			}).catch(e => console.error(e))
		}
	}
}
</script>