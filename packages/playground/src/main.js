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
let instance

function render(props) {
  const {
    container
  } = props;
  instance = createApp(App);
  instance
    .use(router)
    .mount(
      container instanceof Element ?
      (container.querySelector("#app")) :
      (container)
    );
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({
    container: "#app"
  });
}
//暴露主应用生命周期钩子
export async function bootstrap() {
  console.log("subapp bootstraped");
}

export async function mount(props) {
  console.log("mount subapp");
  render(props);
}

window.monitorlist = []
monitor({
    url: 'http://localhost:4000/index'
  })
  .use('detectDevice', detectDevice())
  .use('performance', performance())
  .use('event', event()).use('route', route())
  .use('error', error()).use('ajaxpluin', ajaxpluin()).run((e) => {
    console.log(e)
    window.monitorlist.push(e)
    window.sessionStorage.setItem('monitor', JSON.stringify(e))
    return e
  })