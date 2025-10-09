import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Open from '../views/Open.vue'
import MentalHealth from '../views/MentalHealth.vue'
import Documentation from '../views/Documentation.vue'
import Settings from '../views/Settings.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/create', name: 'Create', component: Create },
  { path: '/open', name: 'Open', component: Open },
  { path: '/mental-health', name: 'MentalHealth', component: MentalHealth },
  { path: '/docs', name: 'Documentation', component: Documentation },
  { path: '/settings', name: 'Settings', component: Settings }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
export { routes }
