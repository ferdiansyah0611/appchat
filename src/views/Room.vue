<template>
	<section class="p-3">
		<div class="bg-white mb-14 mx-auto w-full md:w-1/2 flex flex-wrap">
			<div class="flex flex-wrap w-full">
				<div class="w-4/5">
					<h3 class="font-bold my-1 px-4 uppercase text-xl">{{id}}</h3>
					<h5 class="text-md px-4">14 Active</h5>
				</div>
				<div class="w-1/5 flex justify-center cursor-pointer hover:bg-gray-100">
					<DotsVerticalIcon class="h-12 my-2"></DotsVerticalIcon>
				</div>
			</div>
			<div class="w-full border-t border-t h-screen overflow-auto">
				<div v-for="data in chat" v-bind:key="data.key">
					<!-- bubble chat me-->
					<div v-if="data.user_id === user_id" class="flex flex-wrap justify-end w-full p-2">
						<div class="block mt-2 bg-gray-200 border border-gray-300 rounded-xl">
							<div class="flex cursor-pointer border-b border-gray-300">
								<img :src="data.avatar" class="p-2 w-12" alt="">
								<p class="p-2 font-bold mt-1">{{data.name}}</p>
								<p class="p-2 mt-1">{{new Date(data.created).toLocaleDateString("en-US")}} {{new Date(data.created).toLocaleTimeString("en-US")}}</p>
							</div>
							<div class=" p-2 rounded-3xl">
								{{data.message}}
							</div>
						</div>
					</div>
					<!-- bubble chat people-->
					<div v-if="data.user_id !== user_id" class="flex flex-wrap justify-start w-full p-2">
						<div class="block mt-2 bg-gray-200 border border-gray-300 rounded-xl">
							<div class="flex cursor-pointer border-b border-gray-300">
								<img :src="data.avatar" class="p-2 w-12" alt="">
								<p class="p-2 font-bold mt-1">{{data.name}}</p>
								<p class="p-2 mt-1">{{data.created}}</p>
							</div>
							<div class=" p-2 rounded-3xl">
								{{data.message}}
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<form @submit="sendChat" class="fixed left-0 bottom-0 mx-auto w-full flex">
			<input v-model="message" class="bg-white mx-auto w-full md:w-1/2 p-3 rounded-2xl focus:outline-none focus:ring" type="text" placeholder="Type here...">
		</form>
	</section>
</template>

<script>
import {
	DotsVerticalIcon
} from '@vue-hero-icons/outline'
import {db, auth} from '@/firebase'
import firebase from 'firebase'
export default{
	components: {
		DotsVerticalIcon
	},
	data(){
		return{
			id: '',
			user_id: auth.currentUser.uid,
			message: '',
			chat: []
		}
	},
	mounted(){
		this.id = this.$route.params.id
		db.ref(`chats/${this.id}/chat`).on('value', (snapshot) => {
			this.chat = []
			snapshot.forEach((snap, key) => {
				var data = snap.val()
				data.key = key
				this.chat = [...this.chat, data]
			})
		})
	},
	methods: {
		sendChat(e){
			e.preventDefault()
			db.ref(`chats/${this.id}/chat`).push({
				user_id: auth.currentUser.uid,
				name: auth.currentUser.displayName,
				avatar: auth.currentUser.photoURL,
				message: this.message,
				created: firebase.database.ServerValue.TIMESTAMP
			}).then(() => {
				console.log('success add')
			}).catch(e => console.log(e))
		}
	}
}
</script>