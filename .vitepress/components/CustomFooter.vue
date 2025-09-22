<template>
  <div class="footer">
    <!-- 上方的 Logo 和赞助商部分保持不变 -->
    <div class="footer-top">
      <div class="footer-logo">
        <img src="https://static.igem.wiki/teams/5643/img/footer-logo.svg" alt="logo" />
      </div>
    </div>
    <div class="footer-sponsors">
      <img src="https://static.igem.wiki/teams/5643/img/sponsor.svg" alt="sponsors" />
    </div>

    <!-- 版权信息区域 -->
    <div class="footer-copyright">
      <!-- 左侧内容 -->
      <div class="copyright-left">
        <p>© Fudan iGEM 2025</p>
      </div>
      <!-- 右侧内容 -->
      <div class="copyright-right">
        <!-- Content on this site is licensed under a Creative Commons Attribution 4.0 International license -->
        <p>The repository used to create this website is available at <a class="footer-copyright-link" href="https://gitlab.igem.org/2025/fudan/" target="_blank">gitlab.igem.org/2025/fudan/</a>.</p>
        <p>Contact us <a href="mailto:igem@fudan.edu.cn" target="_blank">igem@fudan.edu.cn</a></p>
      </div>
    </div>
  </div>
</template>

<style>
.footer {
  background-color: #d9f7f5; 
  text-align: center;
  padding-top: 40px;
  font-family: 'Outfit', sans-serif;
}

.footer-sponsors {
  padding-bottom: 30px;
}

.footer-logo img {
  width: clamp(460px, 40vw, 680px);
  height: auto;
  display: block;
  margin: 0 auto;
}

.footer-sponsors img {
  width: clamp(460px, 40vw, 680px);
  height: auto;
  display: block;
  margin: 0 auto;
}

.footer-copyright {
  background-color: #0e9f99; 
  color: white;
  padding: 25px 5%; 
  display: flex; 
  justify-content: center; /* 两列作为组合整体居中 */
  align-items: center; /* 垂直居中 */
  flex-wrap: wrap; /* 允许在屏幕过窄时换行 */
  gap: 28px; /* 列之间的间距 */
}

.copyright-left {
  flex: 0 0 auto; /* 固定内容尺寸，不拉伸 */
  text-align: left; /* 文字左对齐 */
}

.copyright-left p {
  font-size: 1.5em; /* 稍大的字体 */
  font-weight: bold; /* 粗体 */
  margin: 0;
}

.copyright-right {
  flex: 0 1 auto; /* 不强制拉伸，仅按内容或最大宽度 */
  max-width: 900px; /* 限制行宽以便阅读 */
  text-align: left; /* 文字左对齐 */
  font-size: 0.9em; /* 稍小的字体 */
  line-height: 1.5; /* 增加行高 */
}

.copyright-right p {
  margin: 4px 0; /* 段落间的微小间距 */
}

/* 链接样式 */
.footer-copyright-link {
  color: white;
  text-decoration: underline;
}

.footer-copyright-link:hover {
  text-decoration: none;
}

/* -- 响应式设计 -- */
/* 当屏幕宽度小于 768px 时应用以下样式 */
@media (max-width: 768px) {
  .footer-copyright {
    flex-direction: column; /* 将主轴方向变为垂直，实现堆叠 */
    text-align: center; /* 文本居中 */
    padding: 20px 15px; /* 调整内边距 */
  }

  /* 移动端放大可读性并尽量贴近设计 */
  .footer-logo img {
    width: min(80%, 520px);
  }

  .footer-sponsors img {
    width: min(95%, 960px);
  }

  .copyright-left,
  .copyright-right {
    text-align: center; /* 确保两列中的文本都居中 */
    flex-basis: auto; /* 重置基础宽度 */
  }
}

</style>