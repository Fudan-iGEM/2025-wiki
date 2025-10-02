<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import ProfileCard from './ProfileCard/ProfileCard.vue'


// 团队成员数据
const teamMembers = [
  {
    name: "Zhiqin Wang",
    title: "Team Leader",
    handle: "Zhiqin",
    status: "INTP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wzq.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wzq-a.webp",
    description: "I'm honored to be the captain of this igem team, responsible for design and experiments. I'm a bit of a nerd who enjoys watching anime, reading comics, and listening to music. I love exploring the unknown and look forward to facing challenges together with everyone at iGEM to create a new kind of synthetic biology!"
  },
  {
    name: "Yue Yue",
    title: "Team Member",
    handle: "yue-yue",
    status: "INTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/yy.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/yy-a.webp",
    description: "Passionate about synthetic biology and project coordination. I love organizing complex workflows and ensuring our team achieves its goals efficiently. In my free time, I enjoy hiking and reading science fiction novels."
  },
  {
    name: "Huizhen Du",
    title: "Team Member",
    handle: "du-huizhen",
    status: "ESFP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/dhz.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/dhz-a.webp",
    description: "Dedicated researcher with expertise in molecular biology and protein engineering. I'm fascinated by the potential of engineered biological systems to solve real-world problems. When not in the lab, I enjoy cooking and photography."
  },
  {
    name: "Peining Wu",
    title: "Team Member",
    handle: "wu-peining",
    status: "INTJ",
    contactText: "Detail", 
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wpn.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wpn-a.webp",
    description: "In our iGEM team, I'm mainly responsible for design and experiments. I love to explore new things, reach out to new areas and try to put ideas into practice. Let us find the dopamine in life and be the first to stand in line!"
  },
  {
    name: "Yufan Han",
    title: "Team Member",
    handle: "han-yufan",
    status: "INTP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/hyf.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/hyf-a.webp",
    description: "I contribute to our project's success by involving the wiki and software development, and actively participating in wet lab and Human Practices initiatives. I am motivated by the challenge of complex problems and am always eager to debate and refine concepts to push our team's vision forward."
  },
  {
    name: "Zhongyi Huang",
    title: "Team Member",
    handle: "huang-zhongyi",
    status: "...",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/hzy.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/hzy-a.webp",
    description: "Creative engineer focused on designing innovative biological systems. I bridge the gap between theoretical concepts and practical implementations. I'm also passionate about 3D printing and sustainable design."
  },
  {
    name: "Yining Zhao",
    title: "Team Member",
    handle: "zhao-yining",
    status: "INTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/zyn.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/zyn-a.webp",
    description: "Responsible for outreach and science communication. I love making complex scientific concepts accessible to diverse audiences. In my spare time, I volunteer at local science museums and write science blogs."
  },
  {
    name: "Xiuqi Tian",
    title: "Team Member",
    handle: "tian-xiuqi",
    status: "ISFP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/txq.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/txq-a.webp",
    description: "I'm an art enthusiast who's passionate about musicals and mystery novels. On this project, I am responsible for entrepreneurship. I'm absolutely thrilled to dive into iGEM and excited to explore new fields with the team."
  },
  {
    name: "Yixuan Lu",
    title: "Team Member",
    handle: "lu-yixuan",
    status: "ENFP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/lyx.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/lyx-a.webp",
    description: "Guides our team on ethical considerations in synthetic biology research. I'm passionate about ensuring our work benefits society while addressing potential risks. I love reading philosophy and practicing meditation."
  },
  {
    name: "Zuyao Wu",
    title: "Team Member",
    handle: "wu-zuyao",
    status: "ENTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wzy.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wzy-a.webp",
    description: "Develops and maintains our custom laboratory equipment and automation systems. I love building things and solving practical engineering challenges. In my free time, I race remote-controlled cars and tinker with electronics."
  },
  {
    name: "Jihua Tang",
    title: "Team Member",
    handle: "tang-jihua",
    status: "INFJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/tjh.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/tjh-a.webp",
    description: "Hi! I'm Jihua, a junior majoring in Integrated Circuits. In our team, I focus on dry-lab modeling, helping to understand and predict the behavior of our multicellular yeast system. My engineering background enables me to tackle computational challenges efficiently. For me, Fudan iGEM 2025 is where silicon meets cells—and curiosity grows into collaboration!"
  },
  {
    name: "Yuxin Duan",
    title: "Team Member",
    handle: "duan-yuxin",
    status: "INTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/dyx.webp", 
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/dyx-a.webp",
    description: "Hello, everyone! I am Duan Yuxin, from Shanghai Medical College, Fudan University, a student of the five-year clinical medicine. Participating in iGEM has taught me a lot of new knowledge and skills; it is not only full of the challenges and fun of doing experiments, but also provides wonderful memories of our joint efforts. Let us explore the mysteries of synthetic biology together!"
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
const highlightedMember = ref('');

// 初始化随机成员列表
onMounted(() => {
  randomizedMembers.value = shuffleArray(teamMembers);
  loadMoreMembers();
  
  // 检查URL hash并处理跳转
  handleHashNavigation();
  
  // 监听hash变化
  window.addEventListener('hashchange', handleHashNavigation);
});

// 处理hash导航
const handleHashNavigation = () => {
  const hash = window.location.hash.substring(1); // 移除#号
  if (hash) {
    const targetMember = teamMembers.find(member => member.handle === hash);
    if (targetMember) {
      // 确保目标成员在可见列表中
      ensureMemberVisible(hash);
    }
  }
};

// 确保指定成员可见并滚动到该成员
const ensureMemberVisible = async (handle) => {
  const targetMember = teamMembers.find(member => member.handle === handle);
  if (!targetMember) return;
  
  // 如果成员不在当前可见列表中，加载更多直到找到
  while (!visibleMembers.value.find(member => member.handle === handle) && 
         visibleMembers.value.length < randomizedMembers.value.length) {
    loadMoreMembers();
  }
  
  // 等待DOM更新
  await nextTick();
  
  // 高光显示目标成员
  highlightedMember.value = handle;
  
  // 滚动到目标成员
  const memberElement = document.querySelector(`[data-member-handle="${handle}"]`);
  if (memberElement) {
    memberElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
    
    // 2秒后移除高光效果
    setTimeout(() => {
      highlightedMember.value = '';
    }, 2000);
  }
};

// 加载更多成员
const loadMoreMembers = () => {
  const startIndex = (currentPage.value - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const newMembers = randomizedMembers.value.slice(startIndex, endIndex);
  visibleMembers.value.push(...newMembers);
  currentPage.value++;
};

// 无限滚动监听
const handleScroll = () => {
  if (isLoading.value) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight - 200 && visibleMembers.value.length < randomizedMembers.value.length) {
    isLoading.value = true;
    setTimeout(() => {
      loadMoreMembers();
      isLoading.value = false;
    }, 300);
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('hashchange', handleHashNavigation);
});
</script>

<template>
  <div class="member-page">
    <div class="member-grid">
      <div
        v-for="(member, index) in visibleMembers"
        :key="index"
        :data-member-handle="member.handle"
      >
        <ProfileCard
          :name="member.name"
          :title="member.title"
          :handle="member.handle"
          :status="member.status"
          :contact-text="member.contactText"
          :avatar-url="member.avatarUrl"
          :bar-avatar-url="member.barAvatarUrl"
          :description="member.description"
          :show-user-info="true"
          :enable-tilt="true"
          :is-highlighted="highlightedMember === member.handle"
        />
      </div>
    </div>
    <div v-if="isLoading" class="loading">Loading more members...</div>
  </div>
</template>

<style scoped>
.member-page {
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.member-grid {
  display: grid;
  gap: 40px;
  justify-items: center;
  /* 默认：1380px以上一行三个 */
  grid-template-columns: repeat(3, 1fr);
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
}

/* 1380px以下850px以上：一行两个 */
@media (max-width: 1379px) and (min-width: 851px) {
  .member-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
  }
}

/* 850px以下720px以上：小尺寸的两个 */
@media (max-width: 850px) and (min-width: 721px) {
  .member-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  .member-page {
    padding: 30px 15px;
  }
}

/* 720px以下：一个 */
@media (max-width: 720px) {
  .member-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .member-page {
    padding: 20px 10px;
  }
}

/* 移动端优化 */
@media (max-width: 480px) {
  .member-grid {
    gap: 20px;
  }

  .member-page {
    padding: 15px 8px;
  }
}
</style>