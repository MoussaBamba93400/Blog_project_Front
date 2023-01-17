import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/ErrorView.vue'
import Upload from '../views/Upload.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('token');
        if (token) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'error',
      component: ErrorView
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleView.vue')
    },
    { path: '/', redirect: '/login' }
  ]
})

export default router
