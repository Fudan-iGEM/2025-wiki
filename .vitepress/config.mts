import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fudan",
  description: "The iGEM wiki website for Team Fudan 2025.",
  base: '/fudan/',
  srcDir: './pages',
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // The nav config has been deprecated, please use the CustomNavbar.vue instead.
    // The nav config has been deprecated, please use the CustomNavbar.vue instead.
    // The nav config has been deprecated, please use the CustomNavbar.vue instead.
    search: {
      provider: 'local'
    }
  },

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/CustomNavbar.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/CustomFooter.vue', import.meta.url)
          )
        }
      ]
    },
    ssr: {
      noExternal: ['gsap']
    }
  }
})
