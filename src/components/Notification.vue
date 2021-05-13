<template>
	<div>
		<div :class="classSuccess" v-if="type == 'success' && msg.length >= 1">{{msg}}</div>
		<div :class="classErorr" v-if="type == 'error' && msg.length >= 1">{{msg}}</div>
	</div>
</template>
<script>
export default{
	name: 'Success',
	props: ['msg', 'type'],
	data(){
		return{
			classErorr: 'bg-red-400 text-white p-3 mt-3',
			classSuccess: 'bg-green-400 text-white p-3 mt-3'
		}
	},
	mounted(){
		setTimeout(() => {
			if(this.type == 'success'){
				this.classSuccess = this.classSuccess + ' hidden'
			}
			if(this.type == 'error'){
				this.classErorr = this.classErorr + ' hidden'
			}
		}, 10000)
	}
}
</script>