import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import store from '@/store/index'
import Menu from '@/components/layout/header.vue'
import { products } from './components/products'
import { gallery } from './components/gallery'
import { feedback } from './components/feedback'
import { configuration } from './components/configuration'

Vue.use(VueRouter)

const routes = [
  products,
  gallery,
  feedback,
  configuration,
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      menu: Menu
    },
  },
  {
    path: '/information',
    name: 'Information',
    components: {
      default: () => import('@/views/Information/Show.vue'),
      menu: Menu
    },
  },
  {
    path: '/statistics',
    name: 'Statistics',
    components: {
      default: () => import('@/views/Statistics/Index.vue'),
      menu: Menu
    },
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'SignIn'){
    if (!store.getters['authentication/isAuthenticated']) {
      store.dispatch('authentication/tryAutologin')
    }

    if (!store.getters['authentication/isAuthenticated']){
      next('/signin')
    }
  }
  next()
})

export default router
