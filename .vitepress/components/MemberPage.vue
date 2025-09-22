<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProfileCard from './ProfileCard/ProfileCard.vue'
import ExpandableGallery from './ExpandableGallery.vue'

const handleContactClick = () => {
  // 处理联系点击事件
  console.log('Contact clicked');
};
const images = [
  
];

// 团队成员数据
const teamMembers = [
  {
    name: "Zhiqin Wang",
    title: "Team Leader",
    handle: "Zhiqin Wang",
    status: "INTP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "I'm honored to be the captain of this igem team, responsible for design and experiments. I'm a bit of a nerd who enjoys watching anime, reading comics, and listening to music. I love exploring the unknown and look forward to facing challenges together with everyone at iGEM to create a new kind of synthetic biology!"
  },
  {
    name: "Alex Chen",
    title: "Project Manager",
    handle: "Alex Chen",
    status: "ENTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Passionate about synthetic biology and project coordination. I love organizing complex workflows and ensuring our team achieves its goals efficiently. In my free time, I enjoy hiking and reading science fiction novels."
  },
  {
    name: "Sarah Johnson",
    title: "Research Scientist",
    handle: "Sarah Johnson", 
    status: "ISFJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Dedicated researcher with expertise in molecular biology and protein engineering. I'm fascinated by the potential of engineered biological systems to solve real-world problems. When not in the lab, I enjoy cooking and photography."
  },
  {
    name: "Michael Davis",
    title: "Lab Technician",
    handle: "Michael Davis",
    status: "ISTP",
    contactText: "Detail", 
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Expert in laboratory techniques and equipment maintenance. I ensure our experiments run smoothly and help troubleshoot technical issues. I'm passionate about precision and attention to detail in scientific work."
  },
  {
    name: "Emma Wilson",
    title: "Bioinformatics Specialist",
    handle: "Emma Wilson",
    status: "INTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Computational biologist specializing in data analysis and modeling. I love transforming complex biological data into meaningful insights. Outside of work, I enjoy playing chess and learning new programming languages."
  },
  {
    name: "James Lee",
    title: "Design Engineer",
    handle: "James Lee",
    status: "ENFP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Creative engineer focused on designing innovative biological systems. I bridge the gap between theoretical concepts and practical implementations. I'm also passionate about 3D printing and sustainable design."
  },
  {
    name: "Lisa Rodriguez",
    title: "Communications Lead",
    handle: "Lisa Rodriguez",
    status: "ESFJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Responsible for outreach and science communication. I love making complex scientific concepts accessible to diverse audiences. In my spare time, I volunteer at local science museums and write science blogs."
  },
  {
    name: "David Kim",
    title: "Quality Assurance",
    handle: "David Kim",
    status: "ISTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Ensures our research meets the highest standards of quality and reproducibility. I'm meticulous about documentation and protocol validation. I enjoy playing board games and studying historical science discoveries."
  },
  {
    name: "Rachel Green",
    title: "Ethics Advisor",
    handle: "Rachel Green", 
    status: "INFJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Guides our team on ethical considerations in synthetic biology research. I'm passionate about ensuring our work benefits society while addressing potential risks. I love reading philosophy and practicing meditation."
  },
  {
    name: "Tom Anderson",
    title: "Hardware Specialist",
    handle: "Tom Anderson",
    status: "ESTP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Develops and maintains our custom laboratory equipment and automation systems. I love building things and solving practical engineering challenges. In my free time, I race remote-controlled cars and tinker with electronics."
  },
  {
    name: "Maria Santos",
    title: "Data Analyst",
    handle: "Maria Santos",
    status: "INTP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Specializes in statistical analysis and experimental design. I help optimize our research protocols and interpret complex datasets. I'm also interested in machine learning applications in biology and enjoy playing violin."
  },
  {
    name: "Chris Taylor",
    title: "Safety Officer",
    handle: "Chris Taylor",
    status: "ESFP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/img/2ff20be0-c51d-4fef-b602-32f2067f7657-removebg-preview.webp", 
    barAvatarUrl: "https://static.igem.wiki/teams/5643/img/output-removebg-preview.webp",
    description: "Ensures our laboratory operates safely and in compliance with regulations. I'm committed to maintaining a secure environment for innovative research. Outside work, I enjoy rock climbing and teaching first aid courses."
  }
]

// 随机打乱数组的函数
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 响应式的随机排列成员数据
const randomizedMembers = ref([]);
const visibleMembers = ref([]);
const membersPerPage = 6;
const currentPage = ref(1);
const isLoading = ref(false);

// 懒加载更多成员
const loadMoreMembers = () => {
  if (isLoading.value) return;
  
  isLoading.value = true;
  const start = (currentPage.value - 1) * membersPerPage;
  const end = start + membersPerPage;
  const newMembers = randomizedMembers.value.slice(start, end);
  
  // 模拟加载延迟以改善用户体验
  setTimeout(() => {
    if (currentPage.value === 1) {
      visibleMembers.value = newMembers;
    } else {
      visibleMembers.value.push(...newMembers);
    }
    
    currentPage.value++;
    isLoading.value = false;
  }, 300);
};

// 防抖的滚动处理
let scrollTimeout = null;
const handleScroll = () => {
  if (scrollTimeout) return;
  
  scrollTimeout = setTimeout(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollTop + windowHeight >= documentHeight - 1000) {
      if (visibleMembers.value.length < randomizedMembers.value.length) {
        loadMoreMembers();
      }
    }
    
    scrollTimeout = null;
  }, 100);
};

// 组件挂载时随机排列并初始化
onMounted(() => {
  randomizedMembers.value = shuffleArray(teamMembers);
  loadMoreMembers(); // 加载第一批
  
  // 添加滚动监听
  window.addEventListener('scroll', handleScroll, { passive: true });
});

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
});
</script>


<template>

<ExpandableGallery
    :images="images"
    class="p-5"
  />

<div class="member-page">
  <div class="members-grid">
    <div 
      v-for="(member, index) in visibleMembers" 
      :key="`member-${member.name}-${index}`"
      class="member-card-wrapper"
    >
      <ProfileCard
        :name="member.name"
        :title="member.title"
        :handle="member.handle"
        :status="member.status"
        :contact-text="member.contactText"
        :avatar-url="member.avatarUrl"
        :bar-avatar-url="member.barAvatarUrl"
        icon-url="https://static.igem.wiki/teams/5643/img/iconpattern.webp"
        grain-url="https://static.igem.wiki/teams/5643/img/grain.webp"
        :show-user-info="true"
        :show-behind-gradient="true"
        :enable-tilt="true"
        :description="member.description"
        @contact-click="handleContactClick"
      />
    </div>
  </div>
  
  <!-- 加载指示器 -->
  <div v-if="isLoading" class="loading-indicator">
    <div class="loading-spinner"></div>
    <p>Loading more members...</p>
  </div>
</div>

</template>

<style scoped>
.member-page {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
}


.members-grid {
  display: grid;
  gap: 0;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
}

.member-card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 450px;
  padding: 1rem;
}

/* 小屏幕：显示一个 */
@media (max-width: 944px) {
  .member-page {
    padding: 3rem 1rem;
  }
  
  .members-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .member-card-wrapper {
    min-height: 400px;
    padding: 0.75rem;
  }
}

/* 中屏幕：显示两个 */
@media (min-width: 945px) and (max-width: 1339px) {
  .member-page {
    padding: 3.5rem 1.5rem;
  }
  
  .members-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }
  
  .member-card-wrapper {
    min-height: 450px;
    padding: 1rem;
  }
}

/* 大屏幕：显示三个 */
@media (min-width: 1340px) {
  .member-page {
    padding: 4rem 2rem;
  }
  
  .members-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
  
  .member-card-wrapper {
    min-height: 500px;
    padding: 1.25rem;
  }
}

/* 确保图片和内容在所有屏幕上正常显示 */
.member-card-wrapper :deep(.pc-card) {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}

/* 加载指示器样式 */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin-top: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #008794;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-indicator p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

/* 性能优化 */
.member-card-wrapper {
  contain: layout;
  transform: translateZ(0);
}

/* 减少重绘和回流 */
.members-grid {
  contain: layout style paint;
}

/* 优化滚动性能 */
.member-page {
  contain: layout style;
  transform: translateZ(0);
}
</style>
