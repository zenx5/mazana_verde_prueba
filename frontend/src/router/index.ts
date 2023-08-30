import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { inject } from 'vue'
import type { VueCookies } from 'vue-cookies'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Access/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Access/Register.vue')
    },
    {
      path: '/food',
      name: 'order',
      component: () => import('../views/Food/Index.vue'),
      children: [
        {
          path: '',
          name: 'orderlist',
          component: () => import('../views/Food/List.vue')
        },
      ]
    },


  ]
})

router.beforeEach((to, from, next) => {
  const $cookies = inject<VueCookies>('$cookies')
  const publicPages = [ 'home', 'login', 'register']
  const authRequired = !publicPages.includes(to.name as string)
  if( $cookies ) {
    const user = $cookies.get('token-hungriest')
    if ( user ) {
      store.commit('setLogged', true)
    } else {
      store.commit('setLogged', false)
    }
    console.log(store.state)

    console.log(user)
    if (authRequired && !user ) {
      console.log('to login')
      return next('/login')
    }
    //validacion para redireccionar a order page cuando ya se ha logueado
    if (to.name === 'login' && user) {
      console.log('to order')
      return next('/food')
    }
  }
  next()
})

export default router
