import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: { title: '给lar的生日祝福 - 登录' }
  },
  {
    path: '/animation',
    name: 'Animation',
    component: () => import('../views/AnimationPage.vue'),
    meta: { title: '给lar的生日祝福 - 加载中' }
  },
  {
    path: '/blessing',
    name: 'Blessing',
    component: () => import('../views/BlessingPage.vue'),
    meta: { title: '给lar的生日祝福' }
  },
  // 添加重定向，确保所有未匹配路径回到首页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 添加路由滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 添加全局前置守卫，确保路由切换时页面完全加载
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // 确保组件完全加载后再进行路由切换
  next()
})

export default router