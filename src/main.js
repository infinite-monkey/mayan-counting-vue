import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

export const eventBus = new Vue();
export const authService = { isLoggedIn: false };

Vue.use(VueRouter);
const router = new VueRouter({
	routes: routes,
    mode: 'history', //alternate to using hash mark in URL (html5)
    scrollBehavior(to, from, savedPosition) {
    	if (to.hash) {
    		return {
    			selector: to.hash
    		};
    	}

    	if (savedPosition) {
    		return savedPosition;
    	}

    	return { x:0, y:0 }; //default top
    }
});

Vue.component('box-answers', {
	props: ['level','hint'],
	template: '<div class="droppable answer ui-widget-header" :id="level"></div>'
});

new Vue({
	el: '#app',
	render: h => h(App),
	router: router
})
