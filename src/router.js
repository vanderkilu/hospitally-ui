import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Hospitals from './components/Hospitals.vue'
import Hospital from './components/Hospital.vue'
import Auth from './components/Auth.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import MedicalPractioner from './components/MedicalPractitioner.vue'
import ChatRoom from './components/ChatRoom.vue'
import AdminHome from './components/AdminHome.vue'
import AdminWrapper from './components/AdminWrapper.vue'
import AdminHospitalCreate from './components/AdminHospitalCreate.vue'
import AdminHospitalEdit from './components/AdminHospitalEdit.vue'

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
      path: '/admin',
      name: 'admin',
      component: AdminWrapper,
      children: [{
        path: '',
        name: 'admin-home',
        component: AdminHome
      },
      {
        path: 'new-hospital',
        name: 'new-hospital',
        component: AdminHospitalCreate
      },
      {
        path: 'edit-hospital/:id',
        name: 'edit-hospital',
        component: AdminHospitalEdit
      },

    ]
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
      path: '/practitioner',
      name: 'practitioner',
      component: MedicalPractioner
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: ChatRoom
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
