import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 页面路由
export const pageRoutes = [
  { path: '/404', component: () => import('@/views/pages/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: () => import('@/views/pages/login'), name: 'login', meta: { title: '登录' } }
]

// 模块路由
export const moduleRoutes = {
  path: '/',
  component: () => import('@/views/layout'),
  name: 'layout',
  redirect: { name: 'home' },
  meta: { title: '布局' },
  children: [
    { path: '/home', component: () => import('@/views/modules/home'), name: 'home', meta: { title: '首页', isTab: true } }
  ]
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: pageRoutes.concat(moduleRoutes)
})

export default router
