import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import HomePage from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage,
      name: 'addpost'
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }
  ]
})
