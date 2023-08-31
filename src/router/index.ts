import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'
import type { VueCookies } from 'vue-cookies'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mazana_verde_prueba',
      name: 'main',
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/mazana_verde_prueba/login',
          name: 'login',
          component: () => import('../views/Access/Login.vue')
        },
        {
          path: '/mazana_verde_prueba/register',
          name: 'register',
          component: () => import('../views/Access/Register.vue')
        },
        {
          path: '/mazana_verde_prueba/food',
          name: 'order',
          component: () => import('../views/Food/Index.vue'),
          children: [
            {
              path: '',
              name: 'orderlist',
              component: () => import('../views/Food/List.vue')
            },
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  if(from.path==='/' && to.path ==='/')  next({name:'home'})
  const $cookies = inject<VueCookies>('$cookies')
  const publicPages = [ 'home', 'login', 'register']
  const authRequired = !publicPages.includes(to.name as string)
  if( $cookies ) {
    const token = $cookies.get('token-hungriest')
    const user = $cookies.get('user-hungriest')
    if ( token ) {
      store.commit('setToken', token)
      store.commit('setUser', user)
      store.commit('setLogged', true)
    } else {
      store.commit('setLogged', false)
    }
    if (authRequired && !token ) {
      return next({name:'login'})
    }
    //validacion para redireccionar a order page cuando ya se ha logueado
    if ((to.name === 'register' || to.name === 'login') && token) {
      return next({name:'orderlist'})
    }
  }
  next()
})

export default router
