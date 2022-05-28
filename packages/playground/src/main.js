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

app.use('name0',  function (context, next) {
   
    // const v =  m 
    
    // console.log(v)
    console.log(4)
     next()
    console.log(9)

})

app.use('name3', function (context, next) {

  setTimeout(()=> {
    console.log(11)
    next()
  },100)
  
 
})

// app.use('name3', function (context, next) {
//   // throw(new Error('ssd')) 
//   Promise.resolve(3).then(res => {
//     console.log(res)
   
//   })
//   next()

 
// })

app.use('name3', async function (context, next) {
  
  console.log(1)
  
  await next()
  console.log(6)
})


app.run()