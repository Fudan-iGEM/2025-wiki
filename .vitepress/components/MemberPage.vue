<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import ProfileCard from './ProfileCard/ProfileCard.vue'

const outfits = [
  {
    id: 'hat',
    label: 'Hats On',
    image: 'https://static.igem.wiki/teams/5643/pageimage/team/team/team3.avif'
  },
  {
    id: 'no-hat',
    label: 'Hats Off',
    image: 'https://static.igem.wiki/teams/5643/pageimage/team/team/team2.avif'
  }
]

const activeOutfit = ref(outfits[0].id)
const activeOutfitImage = computed(() => {
  const selected = outfits.find(option => option.id === activeOutfit.value)
  return selected ? selected.image : outfits[0].image
})

const setOutfit = (id) => {
  activeOutfit.value = id
}

const teamMembers = [
  {
    name: "Zhiqin Wang",
    title: "Team Leader",
    handle: "Zhiqin",
    status: "INTP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wzq.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wzq-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/parts-design-safety.webp",
    description: "I'm honored to be the captain of this fantastic team, responsible for design and experiments. I'm a bit of a nerd who enjoys watching anime, reading comics, and listening to music. I love exploring the unknown and look forward to facing challenges together with everyone at iGEM to create a new kind of synthetic biology!"
  },
  {
    name: "Yue Yue",
    title: "Team Member",
    handle: "Yue",
    status: "INTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/yy.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/yy-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/parts-design-safety.webp",
    description: "I take part in experiment design and safety, always on the lookout for inspiration in the everyday moments around me. My heart beats for music and books, with an endless curiosity not only for knowledge but also for the joy of sport."
  },
  {
    name: "Huizhen Du",
    title: "Team Member",
    handle: "Huizhen",
    status: "ESFP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/dhz.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/dhz-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/inclusive-education.webp",
    description: "Hello everyone, I'm Huizhen. As a free-spirited thinker, I'm excited to channel my creativity into our iGEM project, where I focus on education. I look forward to collaborating with everyone to bring fun, imaginative science communication to life!"
  },
  {
    name: "Peining Wu",
    title: "Team Member",
    handle: "Peining",
    status: "INTJ",
    contactText: "Detail", 
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wpn.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wpn-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/wetlab-experiment.webp",
    description: "Hello everyone! I'm from the School of Stomatology. It's a pleasure to be part of Fudan iGEM 2025, where I contributed to the Part-related work. In my daily life, I'm a big fan of movies, comics, and novels. I'm always excited to meet new friends — let's explore the wonders of both biology and life together!"
  },
  {
    name: "Yufan Han",
    title: "Team Member",
    handle: "Yufan",
    status: "INTP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/hyf.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/hyf-a.webp",
    description: "I contribute to our project's success by involving the wiki and software development, and actively participating in wet lab and Human Practices initiatives. I am motivated by the challenge of complex problems and am always eager to debate and refine concepts to push our team's vision forward."
  },
  {
    name: "Zhongyi Huang",
    title: "Team Member",
    handle: "Zhongyi",
    status: "INFP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/hzy.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/hzy-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/inclusive-education.webp",
    description: "Coming from a Literature background,I help our team build a bridge between science and the broader community through Inclusivity and visual design. I stay curious about both the elevated and the everyday aspects of culture. I've been on a bit of a nostalgia kick recently."
  },
  {
    name: "Yining Zhao",
    title: "Team Member",
    handle: "Yining",
    status: "INTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/zyn.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/zyn-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/wetlab-experiment.webp",
    description: "In our team, I participated in the Design and Experimental work, helping to build the logic behind our synthetic biology tools — decoding life, and exploring what comes next."
  },
  {
    name: "Xiuqi Tian",
    title: "Team Member",
    handle: "Xiuqi",
    status: "ISFP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/txq.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/txq-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/ihp-business.webp",
    description: "I'm an art enthusiast who's passionate about musicals and mystery novels. On this project, I am responsible for entrepreneurship. I'm absolutely thrilled to dive into iGEM and excited to explore new fields with the team."
  },
  {
    name: "Yixuan Lu",
    title: "Team Member",
    handle: "Yixuan",
    status: "ENFP",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/lyx.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/lyx-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/parts-design-safety.webp",
    description: "A light chaser: always moving forward and enbracing all possibilities. I pretty enjoy communication and collaboration during the journey of iGEM. For me, life is like a game called Earth Online and there's always something to explore!"
  },
  {
    name: "Zuyao Wu",
    title: "Team Member",
    handle: "Zuyao",
    status: "ENTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wzy.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/wzy-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/wetlab-experiment.webp",
    description: "Hi everyone! My name is Zuyao, you can also call me Sophie. I'm studying clinical medicine and I’m really interested in the topic of life on earth. In our team, I’m mainly responsible for design and experiments. I love to explore new things, reach out to new areas and try to put ideas into practice. Let us find the treasures in life and be the first to stand in line!"
  },
  {
    name: "Jihua Tang",
    title: "Team Member",
    handle: "Jihua",
    status: "INFJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/tjh.webp",
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/tjh-a.webp",
    description: "Hi! I'm Jihua, a junior majoring in Integrated Circuits. In our team, I focus on dry-lab modeling, helping to understand and predict the behavior of our multicellular yeasts. My engineering background enables me to tackle computational challenges efficiently. For me, Fudan iGEM 2025 is where silicon meets cells — and curiosity grows into collaboration!"
  },
  {
    name: "Yuxin Duan",
    title: "Team Member",
    handle: "Yuxin",
    status: "INTJ",
    contactText: "Detail",
    avatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/dyx.webp", 
    barAvatarUrl: "https://static.igem.wiki/teams/5643/pageimage/team/dyx-a.webp",
    iconUrl: "https://static.igem.wiki/teams/5643/img/wetlab-experiment.webp",
    description: "Hello, everyone! I am Yuxin, from Shanghai Medical College, Fudan University, major in Clinical Medicine. Participating in iGEM has taught me a lot of new knowledge and skills; it is not only full of the challenges and fun of doing experiments, but also provides wonderful memories of our joint efforts. Let us explore the mysteries of synthetic biology together!"
  }
]

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const randomizedMembers = ref([]);
const visibleMembers = ref([]);
const membersPerPage = 6;
const currentPage = ref(1);
const isLoading = ref(false);
const highlightedMember = ref('');

onMounted(() => {
  randomizedMembers.value = shuffleArray(teamMembers);
  loadMoreMembers();
  
  handleHashNavigation();
  
  window.addEventListener('hashchange', handleHashNavigation);
});

const handleHashNavigation = () => {
  const hash = window.location.hash.substring(1); 
  if (hash) {
    const targetMember = teamMembers.find(member => member.handle === hash);
    if (targetMember) {
      ensureMemberVisible(hash);
    }
  }
};

// 确保指定成员可见并滚动到该成员
const ensureMemberVisible = async (handle) => {
  const targetMember = teamMembers.find(member => member.handle === handle);
  if (!targetMember) return;
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
    <section class="team-outfit-switcher">
      <div class="switcher-content">
        <div class="outfit-info">
          <h2 class="switcher-title">Team Outfit Switch</h2>
          <p class="switcher-subtitle">Tap to swap between our hat-on and hat-off group photos.</p>
          <div class="switcher-buttons">
            <button
              v-for="option in outfits"
              :key="option.id"
              type="button"
              class="outfit-button"
              :class="{ 'outfit-button--active': option.id === activeOutfit }"
              :aria-pressed="option.id === activeOutfit"
              @click="setOutfit(option.id)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
        <div class="outfit-preview">
          <img :src="activeOutfitImage" :alt="`Team photo ${activeOutfit === 'hat' ? 'wearing hats' : 'without hats'}`" />
        </div>
      </div>
    </section>

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
          :icon-url="member.iconUrl"
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

.team-outfit-switcher {
  margin-bottom: 50px;
  padding: 28px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(0, 136, 201, 0.08), rgba(0, 188, 212, 0.12));
  border: 1px solid rgba(0, 136, 201, 0.12);
  box-shadow: 0 12px 40px rgba(0, 64, 128, 0.08);
}

.switcher-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
  gap: 24px;
  align-items: center;
}

.outfit-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.switcher-title {
  margin: 0;
  font-size: 2rem;
  letter-spacing: 0.02em;
  font-family: 'Josefin Sans', sans-serif;
  color: #07255a;
}

.switcher-subtitle {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(7, 37, 90, 0.72);
}

.switcher-buttons {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.outfit-button {
  border: none;
  border-radius: 999px;
  padding: 0.65rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.75);
  color: #0f3c7f;
  box-shadow: 0 8px 20px rgba(15, 60, 127, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.outfit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(15, 60, 127, 0.2);
}

.outfit-button--active {
  background: linear-gradient(135deg, #0088c9, #00bcd4);
  color: #ffffff;
  box-shadow: 0 10px 28px rgba(0, 136, 201, 0.35);
}

.outfit-preview {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 16px 50px rgba(7, 37, 90, 0.18);
}

.outfit-preview::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7, 37, 90, 0.14), transparent 50%, rgba(0, 188, 212, 0.12));
  mix-blend-mode: multiply;
  pointer-events: none;
}

.outfit-preview img {
  display: block;
  width: 100%;
  height: auto;
}

.member-grid {
  display: grid;
  gap: 40px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
}

@media (max-width: 1024px) {
  .team-outfit-switcher {
    padding: 24px;
  }

  .switcher-content {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .outfit-info {
    text-align: center;
    align-items: center;
  }

  .switcher-buttons {
    justify-content: center;
  }

  .outfit-preview {
    max-width: 640px;
    margin: 0 auto;
  }
}

@media (max-width: 1379px) and (min-width: 851px) {
  .member-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
  }
}

@media (max-width: 850px) and (min-width: 721px) {
  .member-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  .member-page {
    padding: 30px 15px;
  }

  .team-outfit-switcher {
    margin-bottom: 40px;
    padding: 22px;
  }
}

@media (max-width: 720px) {
  .member-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .member-page {
    padding: 20px 10px;
  }

  .team-outfit-switcher {
    padding: 20px 16px;
    margin-bottom: 30px;
  }

  .switcher-title {
    font-size: 1.6rem;
  }

  .switcher-subtitle {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .member-grid {
    gap: 20px;
  }

  .member-page {
    padding: 15px 8px;
  }

  .team-outfit-switcher {
    padding: 18px 12px;
    margin-bottom: 32px;
  }

  .switcher-buttons {
    gap: 8px;
  }

  .outfit-button {
    padding: 0.55rem 1.1rem;
    font-size: 0.9rem;
  }
}
</style>
