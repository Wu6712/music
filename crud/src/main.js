import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant, { Lazyload } from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => { return h(App) }
}).$mount('#app')
