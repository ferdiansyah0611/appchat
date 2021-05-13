<template>
	<section class="p-4">
		<div class="bg-white mt-5 p-3 mx-auto w-full md:w-1/2 lg:w-2/5">
			<h4 class="font-bold text-xl mb-2">Manage Room</h4>
			<div class="flex space-x-1">
				<button @click="changeTab" data-name="my-room" class="bg-indigo-400 text-white p-3 font-medium w-1/3 focus:outline-none focus:ring">My Room</button>
				<button @click="changeTab" data-name="create-room" class="bg-indigo-400 text-white p-3 font-medium w-1/3 focus:outline-none focus:ring">Create Room</button>
				<button @click="changeTab" data-name="join-room" class="bg-indigo-400 text-white p-3 font-medium w-1/3 focus:outline-none focus:ring">Join Room</button>
			</div>
			<div id="body-tabs">
				<div v-for="list in listTab" v-bind:key="list">
					<div v-if="list == activeTab" class="block mt-4">
						<div v-if="activeTab == 'my-room'">
							<p class="mx-auto mt-10 mb-10 w-full text-center" v-if="listJoined.length === 0">Room is empty</p>
							<div v-else class="grid grid-cols-2 gap-3">
								<div class="flex flex-wrap h-20 text-center" v-for="joined in listJoined" v-bind:key="joined[Object.getOwnPropertyNames(joined)[0]]">
									<router-link :to="{path: '/room/' + joined[Object.getOwnPropertyNames(joined)[0]]}" class="w-full border p-2 cursor-pointer hover:bg-gray-200">
										<p><b>{{joined[Object.getOwnPropertyNames(joined)[0]]}}</b></p>
									</router-link>
								</div>
								
							</div>
						</div>
						<div v-if="activeTab == 'create-room'">
							<Notification v-if="success" type="success" :msg="success"/>
							<Notification v-if="error" type="error" :msg="error"/>
							<form @submit="SubmitCreateRoom">
								<input v-model="createRoom" type="text" class="p-3 w-full border mt-4 focus:outline-none focus:ring focus:ring-blue-100" placeholder="Name room...">
								<button type="submit" class="p-3 bg-blue-400 text-white mt-4">Create</button>
							</form>
						</div>
						<div v-if="activeTab == 'join-room'">
							<Notification v-if="success" type="success" :msg="success"/>
							<Notification v-if="error" type="error" :msg="error"/>
							<form @submit="SubmitJoinRoom">
								<input v-model="joinedRoom" type="text" class="p-3 w-full border mt-4 focus:outline-none focus:ring focus:ring-blue-100" placeholder="Name room...">
								<button type="submit" class="p-3 bg-blue-400 text-white mt-4">Join</button>
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
import Notification from '@/components/Notification'
export default {
  name: 'Home',
	components: {
		Notification
	},
  data(){
		return{
			activeTab: 'my-room',
			listTab: ['my-room', 'create-room', 'join-room'],
			createRoom: '',
			joinedRoom: '',
			success: '',
			error: '',
			listJoined: []
		}
  },
	mounted(){
		document.title = 'Home | App Chat'
		var i = 0;
			const getUser = db.ref(`users/${auth.currentUser.uid}/joined`)
				getUser.on('value', (snapshot) => {
					this.listJoined = []
					snapshot.forEach((snap) => {
						var data = snap.val()
						data.key = i
						i +=1
						this.listJoined = [...this.listJoined, snap.val()]
						/*console.log(data)*/
					})
				})
	},
  methods: {
		changeTab(e){
			this.activeTab = e.target.dataset.name
		},
		SubmitCreateRoom(e){
			e.preventDefault()
			db.ref(`chats/${this.createRoom}`).get().then(snapshot => {
				if(!snapshot.exists()){
					db.ref(`chats/${this.createRoom}`).set({
						admin: auth.currentUser.uid
					}).then(() => {
						db.ref(`users/${auth.currentUser.uid}/joined/${this.createRoom}`).set({
							[this.createRoom]: this.createRoom
						}).then(() => {
							this.createRoom = ''
							this.success = 'Successful create the room'
						})
					}).catch(e => this.error = e.message)
				}else{
					this.error = 'Failed to create the room because this room has created'
				}
			})
		},
		SubmitJoinRoom(e){
			e.preventDefault()
			db.ref(`chats/${this.joinedRoom}`).get().then((snapshot) => {
				if(snapshot.exists()){
					db.ref(`users/${auth.currentUser.uid}/joined/${this.joinedRoom}`).set({
						[this.joinedRoom]: this.joinedRoom
					}).then(() => {
						db.ref(`chats/${this.joinedRoom}/member`).set({
							uid: auth.currentUser.uid,
							name: auth.currentUser.displayName,
							avatar: auth.currentUser.photoURL
						}).then(() => {
							this.joinedRoom = ''
							this.success = 'Successful join the room'
						}).catch(e => this.error = e.message)
					}).catch(e => this.error = e.message)
				}
				else{
					this.error = 'Chat Room Not Founds'
				}
			})
		}
  }
}
</script>
