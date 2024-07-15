import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Login from '../components/Login.vue';
import Home from '../components/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
    ,{ path: '/login', component: Login }
    ,{ path: '/', component: Home }
  ]
})
// //路由拦截
const routerHistory = []
router.beforeEach((to,from,next)=>{
  let info= localStorage.getItem('loginStatus');
  console.log(info);
  if (to.path === '/login') {
    if (from.name !== null) {
      // 将上一个路由对象保存在Vue实例或Vuex store中
      routerHistory.push(from)
    }
    next();
  } else {
    if(info!==null){
      next();
    }else{
      next('/login');
    }
  }

})
export default router
