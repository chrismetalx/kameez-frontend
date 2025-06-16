import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/SignInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signIn',
      component: HomeView,
      meta: {
        hideNavbar: true,
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUpView.vue'),
      meta: {
        hideNavbar: true,
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        hideNavbar: false,
      }
    },
  ],
})

export default router
