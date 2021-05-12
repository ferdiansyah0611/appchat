import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
	state: {
		users: {}
	},
	mutations: {
		addUser(state, payload){
			state.users = payload
		}
	}
})

export default Store