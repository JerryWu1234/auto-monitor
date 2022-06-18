import {
  createApp
} from 'vue'
import {
  router
} from './router'
import {
  detectDevice,
  error,
  performance,
  monitor,
  route,
  event,
  ajaxpluin
} from 'auto-monitor'
import App from './App.vue'

createApp(App).use(router).mount('#app')


monitor({
    url: 'http://localhost:4000/index'
  })
  .use('detectDevice', detectDevice())
  .use('performance', performance())
  .use('event', event()).use('route', route())
  .use('error', error()).use('ajaxpluin', ajaxpluin()).run((e) => {
    console.log(e)
    return e
  })