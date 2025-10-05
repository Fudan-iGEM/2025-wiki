<template>
  <div class="footer">
    <div class="footer-top">
      <div class="footer-logo">
        <img src="https://static.igem.wiki/teams/5643/img/footer-logo.svg" alt="logo" />
      </div>
    </div>
    <div class="footer-sponsors">
      <a href="https://life.fudan.edu.cn/" target="_blank" class="sponsor-link">
        <img src="https://static.igem.wiki/teams/5643/img/sky.svg" alt="Fudan Life Science School" class="sky"/>
      </a>
      <a href="https://www.fudan.edu.cn/en/" target="_blank" class="sponsor-link">
        <img src="https://static.igem.wiki/teams/5643/img/fudan.svg" alt="Fudan University" />
      </a>
      <a href="https://igem.org/" target="_blank" class="sponsor-link">
        <img src="https://static.igem.wiki/teams/5643/img/igem.svg" alt="iGEM" />
      </a>
      <a href="https://www.yfc.cn/" target="_blank" class="sponsor-link">
        <img src="https://static.igem.wiki/teams/5643/img/yf-capital.svg" alt="YF Capital" />
      </a>
      <a href="https://www.fudan.edu.cn/2019/0408/c526a95643/page.htm" target="_blank" class="sponsor-link">
        <img src="https://static.igem.wiki/teams/5643/img/kq.svg" alt="KeQin" />
      </a>
    </div>
    <div class="footer-copyright">
      <!-- 左侧内容 -->
      <div class="copyright-left">
        <p>Grape Job!</p>
      </div>
      <!-- 右侧内容 -->
      <div class="copyright-right">
        <!-- Content on this site is licensed under a Creative Commons Attribution 4.0 International license -->
        <p>The repository used to create this website is available at <a class="footer-copyright-link" href="https://gitlab.igem.org/2025/fudan/" target="_blank">gitlab.igem.org/2025/fudan/</a>.</p>
        <p>Contact us&nbsp;&nbsp; <a href="mailto:igem@fudan.edu.cn" target="_blank">igem@fudan.edu.cn</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #d9f7f5;
  text-align: center;
  padding-top: 40px;
  font-family: 'Outfit', sans-serif;
}

.footer-sponsors {
  padding: 0 20px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(15px, 2.5vw, 30px);
  flex-wrap: wrap;
}

.sponsor-link {
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sponsor-link img {
  transition: transform 0.3s ease;
  display: block;
}

.sponsor-link:hover img {
  transform: scale(1.05);
}

.sponsor-link img:not(.sky) {
  height: clamp(40px, 6vw, 70px);
  width: auto;
  max-width: 100%;
  object-fit: contain;
}

.sky {
  height: clamp(45px, 6.8vw, 80px);
}

.footer-logo img,
.footer-sponsors img {
  display: block;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.footer-logo img {
  width: clamp(460px, 40vw, 680px);
  height: auto;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease;
  transform-origin: center;
}

.footer-logo img:hover {
  transform: scale(1.02);
}

.footer-copyright {
  background-color: #0e9f99;
  color: white;
  padding: 25px 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
}

.copyright-left {
  flex: 0 0 auto;
  text-align: left;
}

.copyright-left p {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
}

.copyright-right {
  flex: 0 1 auto;
  max-width: 900px;
  text-align: left;
  font-size: 0.9em;
  line-height: 1.5;
}

.copyright-right p {
  margin: 4px 0;
}

/* 链接样式 */
.footer-copyright-link {
  color: white;
  text-decoration: underline;
}

.footer-copyright-link:hover {
  text-decoration: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-copyright {
    flex-direction: column;
    text-align: center;
    padding: 20px 15px;
  }

  .footer-logo img {
    width: min(80%, 520px);
  }

  .footer-sponsors {
    gap: 15px;
  }

  .sponsor-link img:not(.sky) {
    height: clamp(45px, 8vw, 70px);
  }

  .sky {
    height: clamp(51px, 9vw, 79px);
  }

  .copyright-left,
  .copyright-right {
    text-align: center;
    flex-basis: auto;
  }
}

</style>
