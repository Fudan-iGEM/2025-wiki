// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import HomePage from '../components/HomePage.vue';
import Custom404 from '../components/Custom404.vue';
import CustomLayout from '../components/CustomLayout.vue';
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'



export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'not-found': () => h(Custom404)
    })
  },
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    // Register Custom404 component if needed elsewhere
    app.component('Custom404', Custom404)
    app.component('igem', CustomLayout)
    

  },

} satisfies Theme