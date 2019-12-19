import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    /* 共享页面 */
    {
      path: '/',
      name: '',
      redirect:'/login',
      hidden: true //用户自定义属性,主要用来控制本条路由是否显示在菜单中
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue'),
      name: '',
      hidden: true //用户自定义属性,主要用来控制本条路由是否显示在菜单中
    },
    {
      path: '/404',
      component: () => import('@/components/404.vue'),
      name: '',
      hidden: true
    },
    // {
    //   path: '/password',
    //   component: () => import('@/components/ChangePassword.vue'),
    //   name: '',
    //   hidden: true
    // },
    {
      path: '/home',
      component: () => import('@/components/Home.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/recommend',
      component: () => import('@/components/Recommend.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/literature',
      component: () => import('@/components/Literature.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/search',
      component: () => import('@/components/Search.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/term',
      component: () => import('@/components/Term.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/signup',
      component: () => import('@/components/SignUp.vue'),
      name: '',
      hidden: true
    }
  ]
})
