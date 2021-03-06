import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.use(VueAxios, axios)


Vue.config.productionTip = false
// Vue.prototype.$MainURL = 'http://gpturismo.herokuapp.com'
Vue.prototype.$MainURL = 'http://natanaelpythonflask.pythonanywhere.com'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
