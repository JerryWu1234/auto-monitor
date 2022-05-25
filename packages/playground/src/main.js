import {
  createApp
} from 'vue'
import middle from 'auto-monitor'
import App from './App.vue'

createApp(App).mount('#app')

let m = new Promise((res) => {
  setTimeout(() => {
    res(4)
  })
})

const app = middle()

app.use('name0', async function (context, next) {
    
    const v = await m
    debugger
    console.log(v)
    console.log(4)
    await next()
    console.log(3)

})

// app.use('name3', async function (context, next) {

//   Promise.resolve(3).then(res => {
//     console.log(res)
//   })
//   await next()
 
// })

app.use('name3', async function (context, next) {

  console.log(1)
  await next()
  console.log(6)
})

app.run()