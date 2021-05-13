<template>
	<section class="p-3">
		<div class="bg-white mb-14 mx-auto w-full md:w-1/2 flex flex-wrap">
			<div class="flex flex-wrap w-full relative">
				<div class="w-4/5">
					<h3 class="font-bold my-1 px-4 uppercase text-xl">{{id}}</h3>
					<h5 class="text-md px-4">0 Active</h5>
				</div>
				<div class="w-1/5 flex justify-center cursor-pointer hover:bg-gray-100">
					<DotsVerticalIcon class="h-12 my-2"></DotsVerticalIcon>
					<!-- <div class="absolute flex flex-wrap top-0 right-0 mt-16 shadow-xl">
						<a href="/" class="p-2 bg-gray-100 w-full">Show Member</a>
						<a href="/" class="p-2 bg-gray-100 w-full">Delete Room</a>
					</div> -->
				</div>
			</div>
			<div class="w-full border-t border-t h-screen overflow-auto">
				<div v-for="data in chat" v-bind:key="data.key">
					<!-- bubble chat me-->
					<div v-if="data.user_id === user_id" class="flex flex-wrap justify-end w-full p-2">
						<div class="block mt-2 bg-gray-200 border border-gray-300 rounded-xl">
							<div class="flex cursor-pointer border-b border-gray-300">
								<img :src="data.avatar" class="p-2 w-12" alt="">
								<p class="p-2 pl-0 font-bold mt-1">{{data.name}}</p>
							</div>
							<div class="p-2 rounded-3xl">
								<p class="text-sm">{{data.message}}</p>
								<p class="text-xs font-medium mt-1">{{new Date(data.created).toLocaleDateString("en-US")}} {{new Date(data.created).toLocaleTimeString("en-US")}}</p>
							</div>
							<div class="border-t border-gray-300 flex">
								<button class="p-2 font-bold text-sm hover:text-red-600">Reply</button>
								<button class="p-2 font-bold text-sm hover:text-red-600">Report</button>
								<button @click="deleteChat" :data-id="data.id" class="p-2 font-bold text-sm hover:text-red-600">Delete</button>
							</div>
						</div>
					</div>
					<!-- bubble chat people-->
					<div v-if="data.user_id !== user_id" class="flex flex-wrap justify-start w-full p-2">
						<div class="block mt-2 bg-gray-200 border border-gray-300 rounded-xl">
							<div class="flex cursor-pointer border-b border-gray-300">
								<img :src="data.avatar" class="p-2 w-12" alt="">
								<p class="p-2 pl-0 font-bold mt-1">{{data.name}}</p>
							</div>
							<div class=" p-2 rounded-3xl">
								<p class="text-sm">{{data.message}}</p>
								<p class="text-xs font-medium mt-1">{{new Date(data.created).toLocaleDateString("en-US")}} {{new Date(data.created).toLocaleTimeString("en-US")}}</p>
							</div>
							<div class="border-t border-gray-300 flex">
								<button class="p-2 font-bold text-sm hover:text-red-600">Reply</button>
								<button class="p-2 font-bold text-sm hover:text-red-600">Report</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<form @submit="sendChat" class="fixed left-0 bottom-0 mx-auto w-full flex">
			<input v-model="message" class="bg-white border mx-auto w-full md:w-1/2 p-3 focus:outline-none focus:ring" type="text" placeholder="Type here...">
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
		document.title = `Room ${this.$route.params.id} | App Chat`
		this.id = this.$route.params.id
		db.ref(`chats/${this.id}/chat`).on('value', (snapshot) => {
			this.chat = []
			var key = 0
			snapshot.forEach((snap) => {
				var data = snap.val()
				data.key = key
				key += 1
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
			}).then((res) => {
				db.ref(`chats/${this.id}/chat/${res.key}`).update({id: res.key})
				this.message = ''
			}).catch(e => console.log(e))
		},
		deleteChat(e){
			db.ref(`chats/${this.id}/chat/${e.target.dataset.id}`).remove().then(() => {
				console.log('delete')
			}).catch(e => {
				console.error(e.message)
			})
		},
		deleteRoom(e){
			e.preventDefault()
		}
	}
}
</script>