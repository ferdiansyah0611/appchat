<template>
	<section class="p-4">
		<div class="bg-white mt-5 p-3 mx-auto w-full md:w-1/2 lg:w-1/3">
			<h4 class="font-bold text-xl mb-2">Manage Room</h4>
			<div class="flex space-x-1">
				<button @click="changeTab" data-name="my-room" class="bg-indigo-400 text-white p-3 font-medium w-1/3 focus:outline-none focus:ring">My Room</button>
				<button @click="changeTab" data-name="create-room" class="bg-indigo-400 text-white p-3 font-medium w-1/3 focus:outline-none focus:ring">Create Room</button>
				<button @click="changeTab" data-name="join-room" class="bg-indigo-400 text-white p-3 font-medium w-1/3 focus:outline-none focus:ring">Join Room</button>
			</div>
			<div id="body-tabs">
				<div v-for="list in listTab" v-bind:key="list">
					<div v-if="list == activeTab" class="block mt-4">
						<div v-if="activeTab == 'my-room'" class="">
							<p class="mx-auto mt-10 mb-10" v-if="listJoined.length === 0">Room is empty</p>
							<div v-else class="flex flex-wrap" v-for="joined in listJoined" v-bind:key="joined">
								<router-link :to="/room/ + joined" class="w-full border-b p-2 cursor-pointer hover:bg-gray-200">
									<b>{{joined}}</b>
								</router-link>
							</div>
						</div>
						<div v-if="activeTab == 'create-room'">
							<div class="bg-green-400 text-white p-3 mt-3" v-if="success">{{success}}</div>
							<form @submit="SubmitcreateRoom">
								<input v-model="createRoom" type="text" class="p-3 w-full border mt-4 focus:outline-none focus:ring focus:ring-blue-100" placeholder="Name room...">
								<button type="submit" class="p-3 bg-blue-400 text-white mt-4">Create</button>
							</form>
						</div>
						<div v-if="activeTab == 'join-room'">
							<form>
								<input type="text" class="p-3 w-full border mt-4 focus:outline-none focus:ring focus:ring-blue-100" placeholder="Name room...">
								<button  class="p-3 bg-blue-400 text-white mt-4">Join</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import {auth, db} from '@/firebase'
export default {
  name: 'Home',
  data(){
		return{
			activeTab: 'my-room',
			listTab: ['my-room', 'create-room', 'join-room'],
			createRoom: '',
			success: '',
			listJoined: []
		}
  },
	mounted(){
			const getUser = db.ref(`users/${auth.currentUser.uid}/joined`)
				getUser.on('value', (snapshot) => {
					window.snapshot = snapshot
					snapshot.forEach((snap) => {
						console.log(snap.val())
						this.listJoined = [...this.listJoined, snap.val()]
					})
				})
	},
  methods: {
		changeTab(e){
			this.activeTab = e.target.dataset.name
		},
		SubmitcreateRoom(e){
			e.preventDefault()
			db.ref(`chats/${this.createRoom}`).set({
				admin: auth.currentUser.uid
			}).then(() => {
				db.ref(`users/${auth.currentUser.uid}/joined`).set({
					[this.createRoom]: this.createRoom
				})
				this.success = 'Successful create the room'
			})
		}
  }
}
</script>
