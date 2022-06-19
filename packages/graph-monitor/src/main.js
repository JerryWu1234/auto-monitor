import App from './App.vue';
import router from './router';
import store from './store';
import {
  registerMicroApps,
  start
} from 'qiankun';
import Vue from 'vue';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

registerMicroApps([{
  name: 'reactApp',
  entry: '//localhost:5000',
  container: '#container',
  activeRule: '/app-vue',
}]);
// 启动 qiankun
start();
