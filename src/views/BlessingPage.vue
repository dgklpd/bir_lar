<template>
  <div class="blessing-container">
    <div class="background-pattern"></div>
    
    <div class="content-wrapper">
      <!-- 装饰元素 -->
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
      <div class="decoration decoration-3"></div>
      <div class="decoration decoration-4"></div>
      
      <div class="blessing-card">
        <div class="card-header">
          <h1 class="birthday-title">祝愿19岁生日快乐！</h1>
          <p class="recipient-info">To:{{ userName }}</p>
          <p class="date-info">2026年1月6日</p>
        </div>
        
        <!-- 合并的信件和照片容器 -->
        <div class="combined-container">
          <div class="letter-paper">
            <div class="letter-content">
              <!-- 信件内容显示区域 -->
              <div class="letter-body">
                <div class="letter-display" v-html="formattedLetterContent"></div>
              </div>
              
              <!-- 照片区域 -->
              <div class="photo-section">
                <div class="photo-frame">
                  <div class="photo-wrapper">
                    <img 
                      src="../assets/images/friends-photo.jpg" 
                      alt="友谊合照" 
                      class="friends-photo"
                      @error="handleImageError"
                    />
                    <div class="photo-caption">祝这个入生日快乐！（其实我想放我们俩合照来着）</div>
                  </div>
                </div>
              </div>
              
              <div class="letter-closing">
                <p class="signature">dgklpd</p>
                <p class="closing-date">2026年1月6日</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="interactive-elements">
          <div class="fun-buttons">
            <button class="confetti-btn" @click="launchConfetti">
              <span>发射祝福彩花</span>
              <div class="btn-icon">🎉</div>
            </button>
            <button class="share-btn" @click="shareBlessing">
              <span>分享祝福</span>
              <div class="btn-icon">📤</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 彩花效果 -->
    <div v-for="(confetti, index) in confettiList" 
         :key="index" 
         class="confetti"
         :style="confetti.style"></div>
  </div>
</template>

<script>
export default {
  name: 'BlessingPage',
  data() {
    return {
      userName: '',
      letterContent: '', // 从 TXT 文件加载的信件内容
      currentDate: new Date(),
      confettiList: [],
      txtFileLoaded: false, // 添加标记，记录是否成功加载 TXT 文件
      loadError: null // 添加错误信息记录
    }
  },
  computed: {
    // 格式化信件内容，将换行符转换为HTML换行标签
    formattedLetterContent() {
      return this.letterContent.replace(/\n/g, '<br>');
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentMonth() {
      return this.currentDate.getMonth() + 1;
    },
    currentDay() {
      return this.currentDate.getDate();
    }
  },
  async created() {
    // 获取用户名
    this.userName = localStorage.getItem('birthdayUserName') || '亲爱的朋友';
    console.log('用户名:', this.userName);
    
    // 先清除本地存储中的旧信件数据，确保每次都从 TXT 文件加载
    localStorage.removeItem('birthdayLetter');
    
    // 直接从 TXT 文件加载信件内容
    await this.loadLetterFromTxt();
  },
  mounted() {
    // 自动播放一些彩花
    setTimeout(() => {
      this.launchConfetti();
    }, 1500);
  },
  methods: {
    // 从 TXT 文件加载信件内容
    async loadLetterFromTxt() {
      try {
        console.log('开始从TXT文件加载信件内容...');
        
        // 使用不同的路径尝试加载TXT文件
        let response;
        let txtFilePath = '';
        
        // 尝试多个可能的路径
        const possiblePaths = [
          '/birthday-letter.txt',
          './birthday-letter.txt',
          'birthday-letter.txt',
          '../public/birthday-letter.txt'
        ];
        
        for (const path of possiblePaths) {
          try {
            console.log(`尝试路径: ${path}`);
            response = await fetch(path);
            if (response.ok) {
              txtFilePath = path;
              console.log(`成功找到文件: ${path}`);
              break;
            }
          } catch (pathError) {
            console.log(`路径 ${path} 失败:`, pathError.message);
            continue;
          }
        }
        
        if (!response || !response.ok) {
          throw new Error(`无法找到TXT文件，尝试的路径: ${possiblePaths.join(', ')}`);
        }
        
        const text = await response.text();
        console.log('成功从TXT文件加载内容，文件大小:', text.length, '字符');
        
        if (!text || text.trim() === '') {
          throw new Error('TXT文件内容为空');
        }
        
        // 显示原始内容的前100个字符用于调试
        console.log('TXT文件内容预览（前200字符）:', text.substring(0, 200));
        
        // 去掉"亲爱的"开头的行
        let processedText = text.replace(/^亲爱的.*?,?\s*/gm, '');
        
        // 替换文本中的占位符 {username} 为实际用户名
        processedText = processedText.replace(/\{username\}/g, this.userName);
        
        this.letterContent = processedText;
        this.txtFileLoaded = true;
        
        console.log('信件内容已处理并设置，处理后的内容预览:', processedText.substring(0, 100));
        
        // 保存到本地存储，供以后使用
        localStorage.setItem('birthdayLetter', processedText);
        
      } catch (error) {
        console.error('加载信件内容失败:', error);
        this.loadError = error.message;
        
        // 如果加载失败，使用一个完整的默认内容
        this.letterContent = `默认信件内容在这里存储`;
        
        console.log('使用默认信件内容');
        
        // 将默认内容也保存到本地存储
        localStorage.setItem('birthdayLetter', this.letterContent);
      }
    },
    
    launchConfetti() {
      for (let i = 0; i < 80; i++) {
        setTimeout(() => {
          this.createConfetti();
        }, i * 15);
      }
    },
    
    createConfetti() {
      const colors = ['#ff6b9d', '#c779d0', '#4bc0c8', '#ffd166', '#06d6a0', '#ff7eb3', '#ff758c'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const confetti = {
        style: {
          left: `${Math.random() * 100}vw`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          backgroundColor: color,
          transform: `rotate(${Math.random() * 360}deg)`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          animationDelay: `${Math.random() * 0.5}s`
        }
      };
      
      this.confettiList.push(confetti);
      
      setTimeout(() => {
        this.confettiList.shift();
      }, 5000);
    },
    
    shareBlessing() {
      if (navigator.share) {
        navigator.share({
          title: '生日祝福',
          text: `来自${this.userName}的生日祝福`,
          url: window.location.href
        });
      } else {
        alert('分享功能在此浏览器中不可用，您可以复制链接分享给朋友。');
      }
    },
    
    handleImageError(event) {
      console.error('图片加载失败，请检查图片路径');
      event.target.style.display = 'none';
      const wrapper = event.target.parentElement;
      if (wrapper) {
        wrapper.innerHTML = `
          <div class="photo-placeholder">
            <div class="placeholder-icon">📸</div>
            <div class="placeholder-text">合照加载失败<br>请确保图片路径正确</div>
          </div>
        `;
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');

/* 基础样式 - 统一粉色渐变背景 */
.blessing-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
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

.background-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 20%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 30%);
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1000px;
}

.blessing-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 30px;
  padding: 40px;
  box-shadow: 
    0 25px 70px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: cardAppear 0.8s ease-out;
}

@keyframes cardAppear {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* 卡片头部样式 */
.card-header {
  text-align: center;
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(255, 107, 157, 0.2);
}

.birthday-title {
  font-size: 3.8rem;
  color: #ff6b9d;
  margin-bottom: 15px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  background: linear-gradient(90deg, #ff6b9d, #c779d0, #4bc0c8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: titleGlow 3s infinite alternate;
}

@keyframes titleGlow {
  0% { 
    filter: brightness(1); 
  }
  100% { 
    filter: brightness(1.15); 
  }
}

.recipient-info {
  font-size: 1.8rem;
  color: #4361ee;
  font-weight: 600;
  margin-bottom: 8px;
}

.date-info {
  font-size: 1.3rem;
  color: #888;
  font-style: italic;
}

/* 合并的信件和照片容器 */
.combined-container {
  margin: 35px 0;
}

.letter-paper {
  background: #fffdf6;
  border-radius: 20px;
  padding: 40px;
  position: relative;
  box-shadow: 
    0 12px 35px rgba(0, 0, 0, 0.06),
    inset 0 0 0 1px rgba(255, 107, 157, 0.1),
    inset 0 0 30px rgba(255, 209, 102, 0.05);
  border: 1px solid rgba(255, 209, 102, 0.3);
  transition: all 0.3s ease;
  min-height: 650px;
  display: flex;
  flex-direction: column;
}

.letter-paper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(90deg, #ff6b9d, #c779d0, #4bc0c8);
  border-radius: 20px 20px 0 0;
}

.letter-content {
  font-family: 'Georgia', serif;
  line-height: 1.7;
  color: #444;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.letter-body {
  position: relative;
  flex-grow: 1;
  margin-bottom: 30px;
}

/* 信件显示区域 */
.letter-display {
  width: 100%;
  min-height: 280px;
  padding: 20px;
  font-size: 1.25rem;
  line-height: 1.7;
  color: inherit;
  letter-spacing: 0.5px;
  white-space: pre-line;
  font-family: 'Dancing Script', cursive, 'Georgia', 'Microsoft YaHei', sans-serif;
}

/* 照片区域样式 */
.photo-section {
  margin: 25px 0 30px;
  padding: 15px 0;
  border-top: 1px dashed rgba(68, 68, 68, 0.15);
  border-bottom: 1px dashed rgba(68, 68, 68, 0.15);
}

.photo-frame {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.06),
    inset 0 0 0 1px rgba(255, 107, 157, 0.1);
  border: 1px solid rgba(255, 209, 102, 0.2);
  text-align: center;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.photo-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.friends-photo {
  width: 100%;
  height: auto;
  max-height: 400px;
  min-height: 250px;
  object-fit: contain;
  border-radius: 12px;
  transition: transform 0.5s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.friends-photo:hover {
  transform: scale(1.03);
}

.photo-caption {
  margin-top: 20px;
  font-size: 1.3rem;
  color: #666;
  font-style: italic;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 107, 157, 0.1);
  width: 100%;
  text-align: center;
}

.photo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  border: 2px dashed rgba(255, 107, 157, 0.3);
}

.placeholder-icon {
  font-size: 3.5rem;
  margin-bottom: 15px;
  color: rgba(255, 107, 157, 0.5);
}

.placeholder-text {
  font-size: 1.1rem;
  color: #888;
  text-align: center;
  line-height: 1.5;
}

.letter-closing {
  margin-top: 30px;
  text-align: right;
  padding-top: 20px;
  border-top: 1px dashed rgba(68, 68, 68, 0.15);
}

.letter-closing p {
  margin-bottom: 8px;
}

.signature {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4361ee;
  font-family: 'Dancing Script', cursive;
}

.closing-date {
  color: #888;
  font-style: italic;
  font-size: 1.1rem;
}

/* 交互元素样式 */
.interactive-elements {
  margin-top: 35px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 107, 157, 0.15);
}

.fun-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.confetti-btn,
.share-btn {
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  border: none;
  min-width: 180px;
}

.confetti-btn {
  background: linear-gradient(90deg, #ff6b9d, #c779d0);
  color: white;
  box-shadow: 0 6px 20px rgba(199, 121, 208, 0.3);
}

.confetti-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(199, 121, 208, 0.4);
}

.share-btn {
  background: linear-gradient(90deg, #4361ee, #3a0ca3);
  color: white;
  box-shadow: 0 6px 20px rgba(67, 97, 238, 0.3);
}

.share-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(67, 97, 238, 0.4);
}

.btn-icon {
  font-size: 1.3rem;
}

/* 装饰元素 */
.decoration {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  opacity: 0.7;
}

.decoration-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 5%;
  background: rgba(255, 107, 157, 0.1);
  animation: float 15s infinite ease-in-out;
}

.decoration-2 {
  width: 60px;
  height: 60px;
  top: 20%;
  right: 8%;
  background: rgba(75, 192, 200, 0.1);
  animation: float 18s infinite ease-in-out reverse;
}

.decoration-3 {
  width: 100px;
  height: 100px;
  bottom: 15%;
  left: 8%;
  background: rgba(255, 209, 102, 0.1);
  animation: float 20s infinite ease-in-out;
}

.decoration-4 {
  width: 70px;
  height: 70px;
  bottom: 10%;
  right: 10%;
  background: rgba(199, 121, 208, 0.1);
  animation: float 16s infinite ease-in-out reverse;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
  }
  50% { 
    transform: translateY(-25px) rotate(180deg); 
  }
}

/* 彩花样式 */
.confetti {
  position: absolute;
  top: -20px;
  border-radius: 2px;
  z-index: 100;
  animation: confettiFall linear forwards;
  pointer-events: none;
}

@keyframes confettiFall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

/* 响应式设计 - 手机端优化 */
@media (max-width: 768px) {
  .blessing-container {
    padding: 15px;
    align-items: flex-start;
  }
  
  .content-wrapper {
    max-width: 100%;
  }
  
  .blessing-card {
    padding: 25px 20px;
    border-radius: 25px;
  }
  
  .card-header {
    margin-bottom: 25px;
    padding-bottom: 20px;
  }
  
  .birthday-title {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  .recipient-info {
    font-size: 1.4rem;
    margin-bottom: 6px;
  }
  
  .date-info {
    font-size: 1.1rem;
  }
  
  .combined-container {
    margin: 25px 0;
  }
  
  .letter-paper {
    padding: 25px 20px;
    border-radius: 18px;
    min-height: 550px;
  }
  
  .letter-paper::before {
    height: 8px;
    border-radius: 18px 18px 0 0;
  }
  
  .letter-body {
    margin-bottom: 25px;
  }
  
  .letter-display {
    min-height: 200px;
    padding: 15px;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .photo-section {
    margin: 20px 0 25px;
    padding: 12px 0;
  }
  
  .photo-frame {
    padding: 15px;
    min-height: 280px;
  }
  
  .friends-photo {
    max-height: 300px;
    min-height: 200px;
  }
  
  .photo-caption {
    font-size: 1.1rem;
    margin-top: 15px;
    padding: 10px 0;
  }
  
  .letter-closing {
    margin-top: 25px;
    padding-top: 15px;
  }
  
  .signature {
    font-size: 1.3rem;
  }
  
  .closing-date {
    font-size: 1rem;
  }
  
  .interactive-elements {
    margin-top: 30px;
    padding-top: 20px;
  }
  
  .fun-buttons {
    gap: 15px;
    justify-content: center;
  }
  
  .confetti-btn,
  .share-btn {
    padding: 10px 18px;
    font-size: 0.95rem;
    min-width: 160px;
  }
  
  .btn-icon {
    font-size: 1.1rem;
  }
  
  /* 在手机端隐藏部分装饰元素 */
  .decoration-1,
  .decoration-2,
  .decoration-3,
  .decoration-4 {
    display: none;
  }
}

/* 超小屏幕手机优化 */
@media (max-width: 480px) {
  .blessing-container {
    padding: 10px;
  }
  
  .blessing-card {
    padding: 20px 15px;
    border-radius: 20px;
  }
  
  .birthday-title {
    font-size: 2rem;
  }
  
  .recipient-info {
    font-size: 1.2rem;
  }
  
  .date-info {
    font-size: 1rem;
  }
  
  .letter-paper {
    padding: 20px 15px;
    min-height: 500px;
  }
  
  .letter-display {
    min-height: 180px;
    font-size: 1rem;
    padding: 12px;
  }
  
  .photo-frame {
    padding: 12px;
    min-height: 230px;
  }
  
  .friends-photo {
    max-height: 250px;
    min-height: 180px;
  }
  
  .photo-caption {
    font-size: 1rem;
  }
  
  .confetti-btn,
  .share-btn {
    min-width: 140px;
  }
}

/* 平板设备优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .content-wrapper {
    max-width: 850px;
  }
  
  .birthday-title {
    font-size: 3.2rem;
  }
  
  .letter-paper {
    min-height: 600px;
  }
  
  .letter-display {
    min-height: 250px;
  }
  
  .friends-photo {
    max-height: 350px;
  }
}
</style>