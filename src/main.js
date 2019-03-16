import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue();

Vue.component('box-answers', {
	props: ['level','hint'],
	template: '<div class="droppable answer ui-widget-header" :id="level"></div>'
});

new Vue({
  el: '#app',
  render: h => h(App)
})
