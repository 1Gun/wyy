import Vue from 'vue'
import VueRouter from 'vue-router'
const index= ()=>import('../views/index.vue')
const home= ()=>import('../views/Home.vue')
const playlist= ()=>import('../views/Playlist.vue')
const list= ()=>import('../views/List.vue')
const musiclist= ()=>import('../views/Musiclist.vue')
const llist= ()=>import('../views/list/list.vue')
const comments= ()=>import('../views/list/comments.vue')
const collectors= ()=>import('../views/list/collectors.vue')
const sousuo= ()=>import('../views/sousuo/sousuo.vue')
const footer= ()=>import('../loyout/footer.vue')
const sindex=()=>import('../views/singer/index.vue')
const details=()=>import('../views/singer/details.vue')
const mindex=()=>import('../views/mv/index.vue')
const video=()=>import('../views/mv/video.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/video',
    name: 'video',
    component: video
  },
  {
    path: '/mindex',
    name: 'mindex',
    component: mindex
  },
  {
    path: '/details',
    name: 'details',
    component: details
  },
  {
    path: '/footer',
    name: 'footer',
    component: footer
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/playlists',
    name: 'playlist',
    component: playlist
  },
  {
    path: '/list',
    name: 'list',
    component: list
  },
  {
    path: '/musiclist',
    name: 'musiclist',
    component: musiclist
  },
  {
    path: '/llist',
    name: 'llist',
    component: llist
  },
  {
    path: '/collectors',
    name: 'collectors',
    component: collectors
  },
  {
    path: '/comments',
    name: 'comments',
    component: comments
  },
  {
    path: '/sousuo',
    name: 'sousuo',
    component: sousuo
  },
  {
    path: '/sindex',
    name: 'sindex',
    component: sindex
  },
  // {
  //   path: '/Home',
  //   name: 'Home',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
