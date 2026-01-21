<template>
  <div class="animation-container">
    <div class="animation-content">
      <!-- 蛋糕动画 -->
      <div class="cake-animation">
        <!-- 蛋糕盘 -->
        <div class="cake-plate">
          <div class="plate-shadow"></div>
        </div>
        
        <!-- 蛋糕主体 -->
        <div class="cake">
          <!-- 蛋糕底层 -->
          <div class="cake-bottom-layer"></div>
          
          <!-- 蛋糕中层 -->
          <div class="cake-middle-layer"></div>
          
          <!-- 蛋糕顶层 -->
          <div class="cake-top-layer"></div>
          
          <!-- 奶油装饰 -->
          <div class="icing icing-1"></div>
          <div class="icing icing-2"></div>
          <div class="icing icing-3"></div>
          <div class="icing icing-4"></div>
          <div class="icing icing-5"></div>
          
          <!-- 蜡烛 -->
          <div class="candle">
            <div class="candle-body"></div>
            <div class="candle-flame">
              <div class="flame-core"></div>
              <div class="flame-outer"></div>
              <div class="flame-glow"></div>
            </div>
          </div>
          
          <!-- 糖果装饰 -->
          <div class="candy candy-1"></div>
          <div class="candy candy-2"></div>
          <div class="candy candy-3"></div>
        </div>
        
        <!-- 庆祝火花效果 -->
        <div class="sparkle sparkle-1"></div>
        <div class="sparkle sparkle-2"></div>
        <div class="sparkle sparkle-3"></div>
        <div class="sparkle sparkle-4"></div>
        <div class="sparkle sparkle-5"></div>
      </div>
      
      <!-- 祝福文字 -->
      <div class="greeting-text">
        <h2 class="greeting-title">祝所得皆所愿，幸福依旧</h2>
        <p class="greeting-subtitle">献给{{ userName }} 的专属生日祝福</p>
      </div>
      
      <!-- 进度条 -->
      <div class="progress-container">
        <div class="progress-info">
          <span class="progress-label">加载进度</span>
          <span class="progress-percent">{{ Math.floor(progress) }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          <div class="progress-glow" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="progress-hint">即将进入...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimationPage',
  data() {
    return {
      userName: '',
      progress: 0,
      animationTimer: null
    }
  },
  created() {
    // 在组件创建时就获取用户名
    this.userName = localStorage.getItem('birthdayUserName') || '亲爱的朋友';
  },
  mounted() {
    // 立即开始动画，不使用任何延迟
    this.startAnimation();
  },
  beforeUnmount() {
    // 清理定时器
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
    }
  },
    methods: {
  startAnimation() {
    // 6秒完成动画 (6000ms / 60ms = 100次)
    const totalSteps = 100;
    const intervalTime = 60; // 将20ms改为60ms
    
    this.animationTimer = setInterval(() => {
      if (this.progress < 100) {
        // 使用缓动函数使动画更自然
        const remaining = 100 - this.progress;
        // 减小增量因子，使动画更平滑
        const increment = Math.max(0.5, Math.min(remaining, remaining * 0.05));
        this.progress = Math.min(this.progress + increment, 100);
      } else {
        clearInterval(this.animationTimer);
        // 短暂停留后跳转
        setTimeout(() => {
          this.$router.push('/blessing');
        }, 500);
      }
    }, intervalTime);
  }
}
  }
</script>

<style scoped>
/* 统一的粉色渐变背景 - 与Login页面相同 */
.animation-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(255, 182, 193, 0.8) 0%, 
    rgba(255, 105, 180, 0.8) 25%, 
    rgba(221, 160, 221, 0.8) 50%, 
    rgba(186, 85, 211, 0.8) 75%, 
    rgba(138, 43, 226, 0.8) 100%);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animation-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 30px 20px;
}

/* 蛋糕动画区域 */
.cake-animation {
  position: relative;
  width: 280px;
  height: 280px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 蛋糕盘 */
.cake-plate {
  position: absolute;
  bottom: 0;
  width: 240px;
  height: 20px;
  background: linear-gradient(to bottom, #e0e0e0, #f5f5f5);
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.plate-shadow {
  position: absolute;
  top: 5px;
  left: 10px;
  right: 10px;
  height: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  filter: blur(4px);
}

/* 蛋糕主体 */
.cake {
  position: relative;
  width: 200px;
  height: 180px;
  z-index: 2;
}

/* 蛋糕层 */
.cake-bottom-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 70px;
  background: linear-gradient(to bottom, #ff9a9e, #fad0c4);
  border-radius: 10px 10px 20px 20px;
  box-shadow: 
    inset 0 5px 10px rgba(255, 255, 255, 0.4),
    0 5px 15px rgba(0, 0, 0, 0.2);
}

.cake-middle-layer {
  position: absolute;
  bottom: 70px;
  left: 15px;
  width: 170px;
  height: 60px;
  background: linear-gradient(to bottom, #ffd1ff, #ffb6c1);
  border-radius: 10px 10px 15px 15px;
  box-shadow: 
    inset 0 5px 10px rgba(255, 255, 255, 0.4),
    0 3px 10px rgba(0, 0, 0, 0.15);
}

.cake-top-layer {
  position: absolute;
  bottom: 130px;
  left: 30px;
  width: 140px;
  height: 50px;
  background: linear-gradient(to bottom, #ffafbd, #ffc3a0);
  border-radius: 10px 10px 15px 15px;
  box-shadow: 
    inset 0 5px 10px rgba(255, 255, 255, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 奶油装饰 */
.icing {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.icing-1 {
  width: 22px;
  height: 22px;
  bottom: 135px;
  left: 40px;
  animation: icingFloat 3s infinite ease-in-out;
}

.icing-2 {
  width: 18px;
  height: 18px;
  bottom: 140px;
  left: 90px;
  animation: icingFloat 3s infinite ease-in-out 0.3s;
}

.icing-3 {
  width: 20px;
  height: 20px;
  bottom: 145px;
  left: 140px;
  animation: icingFloat 3s infinite ease-in-out 0.6s;
}

.icing-4 {
  width: 16px;
  height: 16px;
  bottom: 75px;
  left: 60px;
  animation: icingFloat 3s infinite ease-in-out 0.9s;
}

.icing-5 {
  width: 14px;
  height: 14px;
  bottom: 80px;
  left: 140px;
  animation: icingFloat 3s infinite ease-in-out 1.2s;
}

@keyframes icingFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* 蜡烛 - 调整位置 */
.candle {
  position: absolute;
  top: -49px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.candle-body {
  width: 14px;
  height: 50px;
  background: linear-gradient(to bottom, #ff5e62, #ff9966, #ff5e62);
  border-radius: 7px 7px 0 0;
  margin: 0 auto;
  box-shadow: 
    inset 0 0 10px rgba(255, 255, 255, 0.3),
    0 2px 5px rgba(0, 0, 0, 0.2);
  position: relative;
}

.candle-body::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

/* 蜡烛火焰 - 调整位置 */
.candle-flame {
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  z-index: 11;
}

.flame-core {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 30px;
  background: linear-gradient(to bottom, #ffff00, #ff9900);
  border-radius: 50% 50% 20% 20%;
  animation: flameFlicker 0.5s infinite alternate;
  filter: blur(0.5px);
  z-index: 2;
}

.flame-outer {
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 35px;
  background: linear-gradient(to bottom, #ff9900, #ff3300);
  border-radius: 50% 50% 30% 30%;
  opacity: 0.8;
  animation: flameFlicker 0.7s infinite alternate-reverse;
  filter: blur(1px);
  z-index: 1;
}

.flame-glow {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(255, 153, 0, 0.5) 0%, rgba(255, 51, 0, 0.2) 50%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  animation: glowPulse 1.2s infinite alternate;
}

@keyframes flameFlicker {
  0%, 100% {
    transform: translateX(-50%) scale(1, 1);
  }
  25% {
    transform: translateX(-50%) scale(1.1, 0.9);
  }
  50% {
    transform: translateX(-50%) scale(0.9, 1.1);
  }
  75% {
    transform: translateX(-50%) scale(1.05, 0.95);
  }
}

@keyframes glowPulse {
  0% {
    opacity: 0.6;
    transform: translateX(-50%) scale(0.9);
  }
  100% {
    opacity: 0.9;
    transform: translateX(-50%) scale(1.1);
  }
}

/* 糖果装饰 */
.candy {
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.candy-1 {
  width: 12px;
  height: 12px;
  bottom: 50px;
  left: 40px;
  background: linear-gradient(45deg, #ff9a9e, #fad0c4);
  animation: candyBounce 2s infinite ease-in-out;
}

.candy-2 {
  width: 10px;
  height: 10px;
  bottom: 90px;
  left: 170px;
  background: linear-gradient(45deg, #a1c4fd, #c2e9fb);
  animation: candyBounce 2s infinite ease-in-out 0.5s;
}

.candy-3 {
  width: 14px;
  height: 14px;
  bottom: 120px;
  left: 80px;
  background: linear-gradient(45deg, #ffecd2, #fcb69f);
  animation: candyBounce 2s infinite ease-in-out 1s;
}

@keyframes candyBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* 庆祝火花效果 */
.sparkle {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  opacity: 0;
  animation: sparkleTwinkle 2s infinite;
}

.sparkle-1 {
  width: 6px;
  height: 6px;
  top: 40px;
  left: 60px;
  animation-delay: 0.2s;
}

.sparkle-2 {
  width: 4px;
  height: 4px;
  top: 80px;
  left: 200px;
  animation-delay: 0.7s;
}

.sparkle-3 {
  width: 5px;
  height: 5px;
  top: 120px;
  left: 40px;
  animation-delay: 1.2s;
}

.sparkle-4 {
  width: 7px;
  height: 7px;
  top: 150px;
  left: 180px;
  animation-delay: 1.7s;
}

.sparkle-5 {
  width: 5px;
  height: 5px;
  top: 180px;
  left: 80px;
  animation-delay: 0.9s;
}

@keyframes sparkleTwinkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 10px #fff, 0 0 20px #ff9a9e;
  }
}

/* 祝福文字 */
.greeting-text {
  text-align: center;
  margin-bottom: 40px;
  color: white;
  max-width: 500px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.greeting-title {
  font-size: 2.5rem;
  margin-bottom: 15px;
  background: linear-gradient(45deg, #ffffff, #ffd6e0, #ffffff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  animation: textShine 3s infinite alternate;
  background-size: 300% 100%;
}

@keyframes textShine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.greeting-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 300;
  letter-spacing: 1px;
}

/* 进度条 */
.progress-container {
  width: 100%;
  max-width: 450px;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.progress-label {
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.1rem;
  font-weight: 500;
}

.progress-percent {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  animation: percentPulse 1s infinite alternate;
}

@keyframes percentPulse {
  0% {
    opacity: 0.8;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }
}

.progress-bar {
  width: 100%;
  height: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
  position: relative;
  box-shadow: 
    inset 0 2px 8px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, 
    #ff6b9d 0%, 
    #ff8fab 25%, 
    #ffb6c1 50%, 
    #ffd1ff 75%, 
    #ff6b9d 100%);
  border-radius: 10px;
  transition: width 0.1s ease-out;
  position: relative;
  z-index: 1;
  background-size: 300% 100%;
  animation: gradientMove 3s infinite linear;
}

.progress-glow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.6) 50%, 
    transparent 100%);
  border-radius: 10px;
  transition: width 0.1s ease-out;
  z-index: 2;
  pointer-events: none;
  animation: glowMove 1.5s infinite linear;
}

@keyframes glowMove {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.progress-hint {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-style: italic;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .cake-animation {
    width: 220px;
    height: 220px;
    margin-bottom: 40px;
  }
  
  .cake {
    width: 160px;
    height: 140px;
  }
  
  .cake-bottom-layer {
    width: 160px;
    height: 55px;
  }
  
  .cake-middle-layer {
    width: 130px;
    height: 45px;
    bottom: 55px;
    left: 15px;
  }
  
  .cake-top-layer {
    width: 100px;
    height: 40px;
    bottom: 100px;
    left: 30px;
  }
  
  .candle {
    top: -25px;
  }
  
  .candle-body {
    height: 40px;
  }
  
  .candle-flame {
    top: -40px;
  }
  
  .greeting-title {
    font-size: 2rem;
  }
  
  .greeting-subtitle {
    font-size: 1.1rem;
  }
  
  .progress-container {
    max-width: 350px;
    padding: 15px;
  }
  
  .progress-percent {
    font-size: 1.2rem;
  }
}
</style>