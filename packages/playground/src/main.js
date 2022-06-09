import {
  createApp
} from 'vue'
import {
  
  detectDevice,
  error,
  performance,
  monitor,
  route
} from 'auto-monitor'
import App from './App.vue'

createApp(App).mount('#app')


monitor({
  url: 'http://localhost:4000'
}).use('detectDevice', detectDevice()).use('performance', performance()).use('route',route()).use('error', error()).run((e) => {
  console.log(e)
  return e
})
