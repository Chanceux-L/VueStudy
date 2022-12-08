import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: require('@/views/404.vue').default,
  },
].filter(Boolean) as Array<RouteRecordRaw>;

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_ROUTER_BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
