import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fudan",
  description: "The iGEM wiki website for Team Fudan 2025.",
  base: '/fudan/',
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Project',
        items: [
          { text: 'Contribution', link: '/contribution' },
          { text: 'Description', link: '/description' },
          { text: 'Design', link: '/design' },
          { text: 'Engineering', link: '/engineering' },
          { text: 'Implementation', link: '/implementation' },
          { text: 'Notebook', link: '/notebook' },
          { text: 'Results', link: '/results' },
        ]
      },
      {
        text: 'Technology',
        items: [
          { text: 'Experiments', link: '/experiments' },
          { text: 'Measurement', link: '/measurement' },
          { text: 'Improved Parts', link: '/improve' },
          { text: 'Part Collection', link: '/part-collection' },
          { text: 'Parts List', link: '/parts' },
          { text: 'Safety', link: '/safety' },
          { text: 'Software', link: '/software' },
          { text: 'Hardware', link: '/hardware' },
        ]
      },
      {
        text: 'Community',
        items: [
          { text: 'Education', link: '/education' },
          { text: 'Entrepreneurship', link: '/entrepreneurship' },
          { text: 'Inclusivity', link: '/inclusivity' },
          { text: 'Integrated HP', link: '/human-practices' },
          { text: 'Presentation', link: '/pv' },
          { text: 'Promotion video', link: '/promotion-video' },
          { text: 'Sustainable', link: '/sustainable' },
          { text: 'Wiki @gitlab', link: '/hardware' },
        ]
      },
      {
        text: 'Team',
        items: [
          { text: 'Attributions', link: '/attributions' },
          { text: 'Collaborations', link: '/collaborations' },
          { text: 'Heritage', link: '/heritage' },
          { text: 'Members', link: '/team' },
        ]
      }

    ],

    socialLinks: [
      { icon: 'gitlab', link: 'https://github.com/vuejs/vitepress' }
    ]
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
    }
  }
})
