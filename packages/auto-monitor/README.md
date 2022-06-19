# auto-monitor

<h5>
自动化埋点
</h5>
根据路由跳转能够自动上报路由数据，根据 useragent 上报手机类型、浏览器类型、手机品牌，自动分析页面性能、最后数据上报时可自定义数据内容

#install

```js
npm install auto-monitor
```
or

```js
pnpm install auto-monitor
```

or 
```js
yarn add auto-monitor
```

#### vue react 的应用

```js
import { ajaxplugin, detectDevice, error, event, monitor, performance, route } from 'auto-monitor'

monitor({
  url: 'http://localhost:4000'
})
  .use('detectDevice', detectDevice())
  .use('performance', performance())
  .use('ajaxplugin', ajaxplugin())
  .use('event', event())
  .use('route', route())
  .use('error', error()).run((e) => {
    console.log(e)
    return e
  })
```
埋点采用返回整个实体类, 可以根据自己的需要再 **run** 函数中选择自己需要的数据进行封装