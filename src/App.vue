<template>
  <div id="app">
    <router-view v-slot="{ Component, route }"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    beforeEnter() {
      // 路由切换前，确保DOM已准备
      console.log('路由切换开始')
    },
    afterEnter() {
      // 路由切换后，确保页面完全加载
      console.log('路由切换完成')
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}

body {
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  position: relative;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff7eb3, #ff758c, #ff7eb3);
  border-radius: 4px;
}

/* 全局加载动画 */
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.global-loading.hidden {
  opacity: 0;
  pointer-events: none;
}

/* 确保所有图片加载平滑 */
img {
  max-width: 100%;
  height: auto;
  transition: opacity 0.3s ease;
}

img[data-src] {
  opacity: 0;
}

img.loaded {
  opacity: 1;
}
</style>