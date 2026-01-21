<template>
  <div class="login-container">
    <div class="background-overlay"></div>
    
    <div class="login-card">
      <div class="card-header">
        <h1>写给你的一些话</h1>
      </div>
      
      <div class="card-body">
        <div class="input-group">
          <label for="name">您的姓名</label>
          <input 
            type="text" 
            id="name" 
            v-model="userName" 
            placeholder="请输入名字"
            @keyup.enter="handleLogin"
            autocomplete="off"
          />
          <div class="input-decoration">
            <div class="decoration-line"></div>
          </div>
        </div>
        
        <button class="login-btn" @click="handleLogin">
          <span>登录</span>
          <div class="btn-icon">🎁</div>
        </button>
        
        <div class="hint">
        </div>
      </div>
      
      <div class="card-footer">
        <p>祝19岁生日快乐捏，lar小姐</p>
      </div>
    </div>
    
    <div class="floating-elements">
      <div class="floating-circle circle-1"></div>
      <div class="floating-circle circle-2"></div>
      <div class="floating-circle circle-3"></div>
      <div class="floating-heart">🎈</div>
      <div class="floating-heart">🎂</div>
      <div class="floating-heart">🎁</div>
      <div class="floating-heart">🎈</div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    handleLogin() {
      if (this.userName.trim() === '') {
        alert('请输入您的名字');
        return;
      }
      
      // 保存用户名到本地存储
    localStorage.setItem('birthdayUserName', this.userName.trim());
    
    console.log('登录成功，准备跳转到动画页面');
    
    // 使用replace而不是push，避免路由历史问题
    this.$router.replace('/animation').catch(err => {
      console.error('跳转失败:', err);
      
      // 如果路由跳转失败，使用备用方案
      if (err.name !== 'NavigationDuplicated') {
        // 延迟后重试
        setTimeout(() => {
          window.location.hash = '/animation';
        }, 100);
      }
    });
    }
  },
  mounted() {
    // 检查是否有已保存的用户名
    const savedName = localStorage.getItem('birthdayUserName');
    if (savedName) {
      this.userName = savedName;
    }
  }
}
</script>

<style scoped>
.login-container {
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

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.login-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px 35px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: cardAppear 0.8s ease-out;
}

@keyframes cardAppear {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card-header {
  text-align: center;
  margin-bottom: 40px;
}

.card-header h1 {
  font-size: 2.8rem;
  background: linear-gradient(45deg, #ff7eb3, #ff758c, #ff7eb3);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 12px;
  text-shadow: 0 2px 10px rgba(255, 118, 140, 0.3);
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.card-body {
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 35px;
}

.input-group label {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 1.1rem;
}

.input-group input {
  width: 100%;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  color: white;
  font-size: 1.2rem;
  outline: none;
  transition: all 0.3s ease;
}

.input-group input:focus {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 118, 140, 0.7);
  box-shadow: 0 0 0 4px rgba(255, 118, 140, 0.2);
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input-decoration {
  height: 4px;
  margin-top: 8px;
  overflow: hidden;
}

.decoration-line {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, #ff7eb3, #ff758c);
  border-radius: 2px;
  transition: width 0.5s ease;
}

.input-group input:focus + .input-decoration .decoration-line {
  width: 100%;
}

.login-btn {
  width: 100%;
  padding: 20px;
  background: linear-gradient(45deg, #ff7eb3, #ff758c);
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(255, 118, 140, 0.3);
  position: relative;
  overflow: hidden;
}

.login-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 118, 140, 0.4);
}

.login-btn:active {
  transform: translateY(-2px);
}

.login-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s ease;
}

.login-btn:hover::after {
  left: 100%;
}

.btn-icon {
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.hint {
  text-align: center;
  margin-top: 25px;
}

.hint p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

.card-footer {
  text-align: center;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.card-footer p {
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 5%;
  animation: float 20s infinite linear;
}

.circle-2 {
  width: 80px;
  height: 80px;
  bottom: 15%;
  right: 10%;
  animation: float 18s infinite linear reverse;
}

.circle-3 {
  width: 60px;
  height: 60px;
  top: 60%;
  left: 15%;
  animation: float 15s infinite linear;
}

.floating-heart {
  position: absolute;
  font-size: 2.5rem;
  animation: float 25s infinite linear;
}

.floating-heart:nth-child(4) {
  top: 20%;
  right: 15%;
  animation-delay: -5s;
}

.floating-heart:nth-child(5) {
  top: 70%;
  right: 20%;
  animation-delay: -10s;
}

.floating-heart:nth-child(6) {
  bottom: 20%;
  left: 20%;
  animation-delay: -15s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(20px, -20px) rotate(90deg);
  }
  50% {
    transform: translate(0, -40px) rotate(180deg);
  }
  75% {
    transform: translate(-20px, -20px) rotate(270deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

@media (max-width: 600px) {
  .login-card {
    padding: 30px 25px;
    margin: 15px;
  }
  
  .card-header h1 {
    font-size: 2.2rem;
  }
  
  .input-group input {
    padding: 16px 18px;
    font-size: 1.1rem;
  }
  
  .login-btn {
    padding: 18px;
    font-size: 1.2rem;
  }
}
</style>