<template>
	<section class="mx-auto mt-28 flex flex-wrap justify-center text-center p-10 bg-white ml-5 mr-5">
		<h3 class="font-bold text-xl w-full mb-8">Login App Chat</h3>
		<form class="w-full">
			<input @model="email" class="w-full p-3 border focus:outline-none focus:ring" type="email" placeholder="Email">
			<input @model="password" class="w-full p-3 border focus:outline-none focus:ring mt-2" type="email" placeholder="Password">
			<button type="submit" class="p-3 text-black rounded w-full font-bold mt-2 focus:outline-none focus:ring focus:ring-blue-400 hover:bg-gray-200 transition-all duration-500">Submit</button>
		</form>
		<div class="w-full flex">
			<span class="border w-1/3 border-b-0 border-l-0 border-r-0 mt-3"></span>
			<span class="w-1/3">OR</span>
			<span class="border w-1/3 border-b-0 border-l-0 border-r-0 mt-3"></span>
		</div>
		<button @click="facebook" class="bg-blue-500 p-3 text-white rounded w-full font-medium mt-2 focus:outline-none focus:ring focus:ring-blue-400 hover:bg-blue-600 transition-all duration-500">LOGIN WITH FACEBOOK</button>
		<button @click="google" class="bg-gray-300 p-3 text-white rounded w-full font-medium mt-2 focus:outline-none focus:ring focus:ring-gray-100 hover:bg-gray-400 transition-all duration-500">LOGIN WITH GOOGLE</button>
	</section>
</template>
<script>
import firebase from 'firebase'
export default{
	name: 'Login',
	data: () =>{
		return{
			email: '',
			password: ''
		}
	},
	methods: {
		facebook: () => {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(res => {
				firebase.firestore().collection('users').doc(res.user.uid).set({
					uid: res.user.uid,
					name: res.user.displayName,
					email: res.user.email,
					photo: res.user.photoURL
				}).then(result => console.log(result)).catch(e => console.error(e))
			}).catch(e => console.error(e))
		},
		google: () => {
			var provider = new firebase.auth.FacebookAuthProvider();
			firebase.auth().signInWithPopup(provider).then(res => {
				firebase.firestore().collection('users').doc(res.user.uid).set({
					uid: res.user.uid,
					name: res.user.displayName,
					email: res.user.email,
					photo: res.user.photoURL
				}).then(result => console.log(result)).catch(e => console.error(e))
			}).catch(e => console.error(e))
		},
		submit: () => {

		}
	}
}
</script>