<template>
	<section class="p-3">
		<div class="bg-white mb-48 md:mb-14 mx-auto w-full md:w-1/2 flex flex-wrap">
			<div class="flex flex-wrap w-full relative">
				<div class="w-4/5">
					<h3 class="font-bold my-1 px-4 text-xl">{{id}}</h3>
					<h5 class="text-md px-4">{{active.length}} Active In Room</h5>
				</div>
				<div @click="actionRoom" class="w-1/5 flex justify-center cursor-pointer hover:bg-gray-100">
					<DotsVerticalIcon class="h-12 my-2"></DotsVerticalIcon>
				</div>
				<div id="action-room" class="absolute hidden w-48 flex flex-wrap top-0 right-0 mt-16 shadow-xl border">
					<a href="/" class="p-2 bg-white w-full">Show Member</a>
					<a @click="actionActiveMember" id="link-show" href="/" class="p-2 bg-white w-full">Show Member Active</a>
					<a v-if="admin" @click="deleteRoom" class="p-2 bg-white w-full cursor-pointer">Delete Room</a>
				</div>
			</div>
			<div class="w-full border-t border-t max-h-screen overflow-auto">
				<div id="body-active-member" class="p-2 bg-gray-200 transition-all duration-500 h-full hidden">
					<div class="p-2 flex flex-wrap" v-for="data in active" v-bind:key="data.key">
						<InformationCircleIcon class="h-10 w-8"></InformationCircleIcon>
						<span class="mt-2 ml-3 font-medium">{{Object.keys(data)[0]}}</span>
						<span class="text-green-400 mt-2 ml-3 font-bold"> Active</span>
					</div>
				</div>
				<div id="body-chat" v-for="data in chat" v-bind:key="data.key">
					<!-- bubble chat me-->
					<div v-if="data.user_id === user_id" class="flex flex-wrap justify-end w-full p-2">
						<div class="block mt-2 bg-gray-200 border border-gray-300 rounded-xl">
							<div class="flex cursor-pointer border-b border-gray-300">
								<img :src="data.avatar" class="p-2 w-12" alt="">
								<p class="p-2 pl-0 font-bold mt-1">{{data.name}}</p>
							</div>
							<div class="p-2 rounded-3xl">
								<p class="text-sm">{{data.message}}</p>
								<img v-if="data.img" :src="data.img" alt="image">
								<audio v-if="data.audio" :src="data.audio"></audio>
								<p class="text-xs font-medium mt-1">{{new Date(data.created).toLocaleDateString("en-US")}} {{new Date(data.created).toLocaleTimeString("en-US")}}</p>
							</div>
							<div class="border-t border-gray-300 flex">
								<button class="p-2 font-bold text-sm hover:text-red-600 focus:outline-none">Reply</button>
								<button class="p-2 font-bold text-sm hover:text-red-600 focus:outline-none">Report</button>
								<button @click="deleteChat" :data-id="data.id" class="p-2 font-bold text-sm hover:text-red-600 focus:outline-none">Delete</button>
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
								<img v-if="data.img" :src="data.img" alt="">
								<audio v-if="data.audio" :src="data.audio"></audio>
								<p class="text-xs font-medium mt-1">{{new Date(data.created).toLocaleDateString("en-US")}} {{new Date(data.created).toLocaleTimeString("en-US")}}</p>
							</div>
							<div class="border-t border-gray-300 flex">
								<button class="p-2 font-bold text-sm hover:text-red-600 focus:outline-none">Reply</button>
								<button class="p-2 font-bold text-sm hover:text-red-600 focus:outline-none">Report</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<form @submit="sendChat" class="fixed left-0 bottom-0 mx-auto w-full flex flex-wrap">
			<div id="body-attachment" class="mb-min-full w-full md:w-auto md:block md:fixed md:right-0 md:top-0 md:mt-32 bg-blue-400 flex flex-wrap justify-center shadow relative transition-all duration-500">
				<div @click="chooseFile" data-name="image" class="w-1/4 md:w-full md:p-2 flex flex-wrap justify-center cursor-pointer hover:bg-blue-300 text-white">
					<span data-name="image" class="w-full flex justify-center">
						<PhotographIcon data-name="image" class="h-14 text-white"></PhotographIcon>
					</span>
					<span data-name="image" class="w-full text-center mb-4 font-bold">Image</span>
				</div>
				<div @click="chooseFile" data-name="document" class="w-1/4 md:w-full md:p-2 flex flex-wrap justify-center cursor-pointer hover:bg-blue-300 text-white">
					<span data-name="document" class="w-full flex justify-center">
						<DocumentAddIcon data-name="document" class="h-14 text-white"></DocumentAddIcon>
					</span>
					<span data-name="document" class="w-full text-center mb-4 font-bold">Document</span>
				</div>
				<div @click="chooseFile" data-name="audio" class="w-1/4 md:w-full md:p-2 flex flex-wrap justify-center cursor-pointer hover:bg-blue-300 text-white">
					<span data-name="audio" class="w-full flex justify-center">
						<MicrophoneIcon data-name="audio" class="h-14 text-white"></MicrophoneIcon>
					</span>
					<span data-name="audio" class="w-full text-center mb-4 font-bold">Audio</span>
				</div>
				<div @click="chooseFile" data-name="contact" class="w-1/4 md:w-full md:p-2 flex flex-wrap justify-center cursor-pointer hover:bg-blue-300 text-white">
					<span data-name="contact" class="w-full flex justify-center">
						<UserIcon data-name="contact" class="h-14 text-white"></UserIcon>
					</span>
					<span data-name="contact" class="w-full text-center mb-4 font-bold">Contact</span>
				</div>
				<input @change="changeFile" type="file" class="hidden" accept="image/*" name="image">
				<input @change="changeFile" type="file" class="hidden" accept=".doc,.docx,.ppt,.pptx,.xls,.xlsx" name="document">
				<input @change="changeFile" type="file" class="hidden" accept=".mp3,.wav" name="audio">
				<input @change="changeFile" type="file" class="hidden" accept=".csv" name="contact">
			</div>
			<input v-model="message" class="bg-white border mx-auto w-full md:w-1/2 p-3 focus:outline-none focus:ring" type="text" placeholder="Type here...">
			<div @click="attachmentAction" id="action-attachment" class="fixed md:hidden right-0 bottom-0 mb-14 bg-blue-400 rounded-full p-5 shadow-2xl mr-5 transition-all duration-500 cursor-pointer">
				<PaperClipIcon class="h-6 w-6 text-white"></PaperClipIcon>
			</div>
		</form>
	</section>
</template>

<script>
import {
	DotsVerticalIcon,
	PhotographIcon,
	DocumentAddIcon,
	MicrophoneIcon,
	UserIcon,
	PaperClipIcon,
	InformationCircleIcon
} from '@vue-hero-icons/outline'
import {db, auth, storage, firebase} from '@/firebase'
export default{
	components: {
		DotsVerticalIcon,
		PhotographIcon,
		DocumentAddIcon,
		MicrophoneIcon,
		UserIcon,
		PaperClipIcon,
		InformationCircleIcon
	},
	data(){
		return{
			id: '',
			user_id: auth.currentUser.uid,
			message: '',
			chat: [],
			active: [],
			admin: false,
			closed: false,
			uploaded: {
				img: null,
				doc: null,
				audio: null,
				csv: null
			}
		}
	},
	destroy(){
		db.ref(`chats/${this.id}`).get().then((res) => {
			if(res.exists()){
				db.ref(`chats/${this.id}/active`).get().then(() => {
					db.ref(`chats/${this.id}/active/${auth.currentUser.uid}`).set({
						[auth.currentUser.displayName]: false
					})
				})
			}
		})
	},
	mounted(){
		window.db = db
		document.title = `Room ${this.$route.params.id} | App Chat`
		this.id = this.$route.params.id
		db.ref(`chats/${this.id}`).get().then((res) => {
			db.ref(`chats/${this.id}/admin`).get().then(admin => auth.currentUser.uid === admin.val() ? this.admin = true: this.admin = false)
			if(res.exists()){
				db.ref(`chats/${this.id}/active/${auth.currentUser.uid}`).set({
					[auth.currentUser.displayName]: true
				})
				db.ref(`chats/${this.id}/active`).on('value', (snapshot) => {
						this.active = []
						var key = 0
						snapshot.forEach((snap) => {
							var data = snap.val()
							data.key = key
							key += 1
							this.active = [...this.active, data]
						})
				})
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
			}else{
				db.ref(`users/${auth.currentUser.uid}/joined/${this.$route.params.id}`).remove().then(() => {
					this.$router.push('/')
				})
			}
		})
	},
	watch: {
		active(val){
			this.active = val
		}
	},
	methods: {
		sendChat(e){
			e.preventDefault()
			if(this.uploaded.img){
				storage.ref(`/images/${this.uploaded.img.name}`).put(this.uploaded.img).then(snapshot => {
					snapshot.ref.getDownloadURL().then(url => {
						db.ref(`chats/${this.id}/chat`).push({
							user_id: auth.currentUser.uid,
							name: auth.currentUser.displayName,
							img: url,
							avatar: auth.currentUser.photoURL,
							message: this.message,
							created: firebase.database.ServerValue.TIMESTAMP
						}).then((res) => {
							db.ref(`chats/${this.id}/chat/${res.key}`).update({id: res.key})
							this.message = ''
						})
					})
				})
			}
			if(this.uploaded.audio){
				storage.ref(`/audio/${this.uploaded.audio.name}`).put(this.uploaded.audio).then(snapshot => {
					snapshot.ref.getDownloadURL().then(url => {
						db.ref(`chats/${this.id}/chat`).push({
							user_id: auth.currentUser.uid,
							name: auth.currentUser.displayName,
							audio: url,
							avatar: auth.currentUser.photoURL,
							message: this.message,
							created: firebase.database.ServerValue.TIMESTAMP
						}).then((res) => {
							db.ref(`chats/${this.id}/chat/${res.key}`).update({id: res.key})
							this.message = ''
						})
					})
				})
			}
			if(this.uploaded.doc){
				storage.ref(`/doc/${this.uploaded.doc.name}`).put(this.uploaded.doc).then(snapshot => {
					snapshot.ref.getDownloadURL().then(url => {
						db.ref(`chats/${this.id}/chat`).push({
							user_id: auth.currentUser.uid,
							name: auth.currentUser.displayName,
							doc: url,
							avatar: auth.currentUser.photoURL,
							message: this.message,
							created: firebase.database.ServerValue.TIMESTAMP
						}).then((res) => {
							db.ref(`chats/${this.id}/chat/${res.key}`).update({id: res.key})
							this.message = ''
						})
					})
				})
			}
			if(this.uploaded.csv){
				storage.ref(`/csv/${this.uploaded.csv.name}`).put(this.uploaded.csv).then(snapshot => {
					snapshot.ref.getDownloadURL().then(url => {
						db.ref(`chats/${this.id}/chat`).push({
							user_id: auth.currentUser.uid,
							name: auth.currentUser.displayName,
							csv: url,
							avatar: auth.currentUser.photoURL,
							message: this.message,
							created: firebase.database.ServerValue.TIMESTAMP
						}).then((res) => {
							db.ref(`chats/${this.id}/chat/${res.key}`).update({id: res.key})
							this.message = ''
						})
					})
				})
			}
			else{
				db.ref(`chats/${this.id}/chat`).push({
					user_id: auth.currentUser.uid,
					name: auth.currentUser.displayName,
					avatar: auth.currentUser.photoURL,
					message: this.message,
					created: firebase.database.ServerValue.TIMESTAMP
				}).then((res) => {
					db.ref(`chats/${this.id}/chat/${res.key}`).update({id: res.key})
					this.message = ''
				})
			}
		},
		deleteChat(e){
			db.ref(`chats/${this.id}/chat/${e.target.dataset.id}`).remove()
		},
		deleteRoom(e){
			e.preventDefault()
			db.ref(`chats/${this.id}/`).remove().then(() => {
				db.ref(`users/${auth.currentUser.uid}/joined/${this.id}`).remove()
				this.$router.push('/')
			}).catch(e => {
				console.error(e.message)
			})
		},
		attachmentAction(e){
			e.preventDefault()
			const btn = document.querySelector('#action-attachment')
			const body = document.querySelector('#body-attachment')
			if(btn.classList.contains('open')){
				btn.classList.remove('open')
				btn.classList.add('mb-14')
				btn.classList.remove('mb-40')
				body.classList.add('mb-min-full')
				return true
			}
			else{
				btn.classList.add('open')
				btn.classList.remove('mb-14')
				btn.classList.add('mb-40')
				body.classList.remove('mb-min-full')
				return true
			}
		},
		chooseFile(e){
			e.preventDefault()
			console.log(e.target.dataset.name)
			document.querySelector(`input[name="${e.target.dataset.name}"]`).click()
		},
		actionRoom(e){
			e.preventDefault()
			const body = document.querySelector('#action-room')
			if(e.target.classList.contains('open')){
				e.target.classList.remove('open')
				body.classList.add('hidden')
				body.classList.remove('block')
				return true
			}
			else{
				e.target.classList.add('open')
				body.classList.remove('hidden')
				body.classList.add('block')
				return true
			}
		},
		actionActiveMember(e){
			e.preventDefault()
			const body = document.querySelector('#body-chat')
			const bodyActive = document.querySelector('#body-active-member')
			const show = document.querySelector('#link-show')
			if(show.classList.contains('open')){
				show.classList.remove('open')
				body.classList.remove('hidden')
				bodyActive.classList.add('hidden')
			}
			else{
				show.classList.add('open')
				body.classList.add('hidden')
				bodyActive.classList.remove('hidden')
			}
		},
		uploadFile(e){
			e.preventDefault()
			if(this.uploaded.img){
				storage.ref(`/images/${this.uploaded.img.name}`).put(this.uploaded.img).then(snapshot => {
					snapshot.ref.getDownloadURL().then(url => {
						db.ref(`chats/${this.id}/chat`).push({
							user_id: auth.currentUser.uid,
							name: auth.currentUser.displayName,
							img: url,
							avatar: auth.currentUser.photoURL,
							message: this.message,
							created: firebase.database.ServerValue.TIMESTAMP
						}).then((res) => {
							db.ref(`chats/${this.id}/chat/${res.key}`).update({id: res.key})
							this.message = ''
						})
					})
				})
			}
		},
		changeFile(e){
			if(e.target.name == 'image'){
				this.uploaded.img = e.target.files[0]
			}
			if(e.target.name == 'document'){
				this.uploaded.doc = e.target.files[0]
			}
			if(e.target.name == 'audio'){
				this.uploaded.audio = e.target.files[0]
			}
			if(e.target.name == 'contact'){
				this.uploaded.csv = e.target.files[0]
			}
		}
	}
}
</script>
<style>
.mb-min-full{
	margin-left: 1000vh
}
</style>