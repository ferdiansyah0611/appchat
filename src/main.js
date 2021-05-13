import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Store from './store'
import {auth} from './firebase'

/*firebase.analytics()*/

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
if(!app){
	app = new Vue({
		router,
		store: Store,
		render: h => h(App)
	}).$mount('#app')
}
})
