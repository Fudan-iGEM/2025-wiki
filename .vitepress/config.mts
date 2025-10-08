import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { fileURLToPath, URL } from 'node:url'
import mathjax3 from 'markdown-it-mathjax3'
import footnote from 'markdown-it-footnote'

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  title: "Fudan",
  description: "The iGEM wiki website for Team Fudan 2025.",
  base: '/fudan/',
  srcDir: './pages',
  ignoreDeadLinks: true,
  appearance: false,
  markdown: {
    config: (md) => {
      md.use(mathjax3)
      md.use(footnote)
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://static.igem.wiki/teams/5643/img/logo-icon.svg' }],
    ['link', { rel: 'shortcut icon', href: 'https://static.igem.wiki/teams/5643/img/logo-icon.svg' }],
    ['link', { rel: 'apple-touch-icon', href: 'https://static.igem.wiki/teams/5643/img/logo-icon.svg' }],
    ['link', { rel: 'manifest', href: '/fudan/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#008794' }],

  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // The nav config has been deprecated, please use the CustomNavbar.vue instead.
    // The nav config has been deprecated, please use the CustomNavbar.vue instead.
    // The nav config has been deprecated, please use the CustomNavbar.vue instead.
    search: {
      provider: 'local'
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    outDir: '.vitepress/dist',
    includeAssets: [],
    minify: false,
    manifest: {
      id: '/fudan/',
      scope: '/fudan/',
      start_url: '/fudan/',
      name: 'Fudan iGEM 2025 Wiki',
      short_name: 'Fudan iGEM',
      description: 'The iGEM wiki website for Team Fudan 2025.',
      theme_color: '#008794',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: 'https://static.igem.wiki/teams/5643/img/logo-icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any'
        },
        {
          src: 'https://static.igem.wiki/teams/5643/img/logo-icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
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
}))
