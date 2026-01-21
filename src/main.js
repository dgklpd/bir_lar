import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 添加全局路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
  
  // 如果是加载组件失败，尝试重新加载页面
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    if (window.location.hash.includes('/animation')) {
      window.location.reload()
    }
  }
})

// 添加全局路由后置钩子
router.afterEach((to, from) => {
  // 确保页面完全滚动到顶部
  window.scrollTo(0, 0)
  
  // 如果是跳转到动画页面，确保完全加载
  if (to.path === '/animation') {
    console.log('进入动画页面，准备加载动画')
    
    // 强制浏览器重新渲染
    setTimeout(() => {
      document.body.clientHeight
    }, 100)
  }
})

app.use(router)

// 添加应用加载状态
let appLoaded = false

// 监听应用完全加载
window.addEventListener('load', () => {
  appLoaded = true
  console.log('应用完全加载')
})

// 添加全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue错误:', err, info)
  
  // 如果是路由相关错误，尝试重新导航
  if (err.message && err.message.includes('navigation')) {
    setTimeout(() => {
      if (window.location.hash.includes('/animation')) {
        router.replace('/blessing')
      }
    }, 1000)
  }
}

app.mount('#app')

// 全局变量，用于页面间通信
window.birthdayApp = {
  version: '1.0.0',
  getRouter: () => router,
  reloadAnimation: () => {
    if (window.location.hash.includes('/animation')) {
      window.location.reload()
    }
  }
}