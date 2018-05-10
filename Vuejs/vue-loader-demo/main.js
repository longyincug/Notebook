import Vue from 'vue/dist/vue.js'
import App from './App.vue'

new Vue({
	el:'#box',
	data:{},
	components:{
		//引入主组件App.vue
		'app':App
	}
});


