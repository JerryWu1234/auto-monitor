import {
  detectDevice,
  error,
  performance,
  monitor,
  route,
  event
} from 'auto-monitor'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

monitor({
  url: 'http://localhost:4000'
})
.use('detectDevice', detectDevice())
.use('performance', performance())
.use('event', event()).use('route', route())
.use('error', error()).run((e) => {
  console.log(e)
  return e
})
