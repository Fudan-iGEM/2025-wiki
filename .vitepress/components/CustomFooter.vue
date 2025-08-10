<template>
  <footer class="custom-footer">
    <!-- Top Logo Section -->
    <div class="footer-top">
      <img src="https://static.igem.wiki/teams/5643/img/footer-logo.webp" alt="Team Logo" class="footer-logo" />
    </div>
    
    <!-- Divider -->
    <div class="footer-divider"></div>
    
    <!-- Middle Section -->
    <div class="footer-middle">
      <div class="footer-nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/project">Project</a></li>
          <li><a href="/lab">Lab</a></li>
          <li><a href="/human-practice">Human Practice</a></li>
          <li><a href="/team">Team</a></li>
        </ul>
      </div>
      <div class="footer-sponsors">
        <img src="https://static.igem.wiki/teams/5643/img/sponsor.webp" alt="Sponsors" class="sponsor-logos" />
      </div>
    </div>
    
    <!-- Divider -->
    <div class="footer-divider"></div>
    
    <!-- Bottom Section -->
    <div class="footer-bottom">
      <div class="footer-copyright">
        &copy; Fudan iGEM 2025
      </div>
      <div class="footer-license">
        <p>Content on this site is licensed under a Creative Commons Attribution 4.0 International license.</p>
        <p>The repository used to create this website is available at gitlab.igem.org/2025/fudan.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.custom-footer {
  background-color: rgb(223, 246, 246);
  color: rgb(72, 157, 152);
  padding: 2rem 0;
  margin-top: 2rem;
}

.footer-top {
  text-align: left;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 0;
}

.footer-logo {
  max-height: 130px;
  height: auto;
  width: auto;
}

.footer-divider {
  height: 3px;
  background-color: rgb(59, 133, 146);
  margin: 0.25rem 0;
}

.footer-middle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 0;
}

.footer-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav li {
  margin-bottom: 0.8rem;
}

.footer-nav a {
  color: rgb(72, 157, 152);
  text-decoration: none;
  font-size: 1rem;
  transition: opacity 0.3s ease;
}

.footer-nav a:hover {
  opacity: 0.7;
}

.footer-sponsors {
  flex-shrink: 0;
}

.sponsor-logos {
  max-height: 110px;
  height: auto;
  width: auto;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.1rem 0;
}

.footer-copyright {
  font-size: 1.8rem;
  font-weight: bold;
}

.footer-license {
  text-align: right;
  font-size: 0.8rem;
  line-height: 1.4;
}

.footer-license p {
  margin: 0.2rem 0;
}

/* Responsive Design */
/* Tablet styles */
@media (max-width: 1024px) {
  .footer-top {
    padding: 1rem 0.5rem;
  }
  
  .footer-middle {
    padding: 0.5rem 0.5rem;
  }
  
  .footer-bottom {
    padding: 0.1rem 0.5rem;
  }
  
  .footer-logo {
    max-height: 100px;
  }
  
  .sponsor-logos {
    max-height: 90px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .footer-top {
    text-align: center;
    padding: 1rem 1rem;
  }
  
  .footer-middle {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
    padding: 0.5rem 1rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
  }
  
  .footer-license {
    text-align: center;
  }
  
  .footer-copyright {
    font-size: 1.4rem;
  }
  
  .sponsor-logos {
    max-height: 70px;
  }
  
  .footer-logo {
    max-height: 80px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .footer-top {
    padding: 0.75rem 0.75rem;
  }
  
  .footer-middle {
    gap: 1rem;
    padding: 0.4rem 0.75rem;
  }
  
  .footer-bottom {
    gap: 0.75rem;
    padding: 0.4rem 0.75rem;
  }
  
  .footer-copyright {
    font-size: 1.2rem;
  }
  
  .footer-license {
    font-size: 0.75rem;
  }
  
  .sponsor-logos {
    max-height: 60px;
  }
  
  .footer-logo {
    max-height: 60px;
  }
}
</style>
