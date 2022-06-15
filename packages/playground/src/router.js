import * as VueRouter from 'vue-router'
import page1 from './components/page1.vue'
import page2 from './components/page2.vue'
export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [{
      path: '/',
      name: 'page1',
      component: page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    }
  ],
})