import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import('views/index')
const Music = () => import('views/music')
const My = () => import('views/my')
const Login = () => import('views/login')
const Play = () => import('views/play')
const Register = () => import('views/register')
const Edit = () => import('views/edit')
const Password = () => import('views/password')
const Search = () => import('views/search')
const Temp = () => import('views/temp')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
  },
  {
    path: '/music',
    component: Music
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/play',
    name: 'play',
    component: Play
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/password',
    name: 'password',
    component: Password
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/temp',
    name: 'temp',
    component: Temp
  }
]

const router = new VueRouter({
  routes,
  module: "history"
})

export default router
