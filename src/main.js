import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = '/api' 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
