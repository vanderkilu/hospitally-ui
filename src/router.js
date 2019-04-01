import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Hospitals from './components/Hospitals.vue'
import Hospital from './components/Hospital.vue'
import Auth from './components/Auth.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/hospitals/:city',
      name: 'hospitals-by-city',
      component: Hospitals
    },
    {
      path: '/hospital/:id',
      name: 'hospital',
      component: Hospital
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      children: [
        {
          path: '',
          name: 'signup',
          component: Signup
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        }
      ]
    }
  ]
})
