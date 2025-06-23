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
          { text: 'Contribution', link: '/fudan/contribution' },
          { text: 'Description', link: '/fudan/description' },
          { text: 'Design', link: '/fudan/design' },
          { text: 'Engineering', link: '/fudan/engineering' },
          { text: 'Implementation', link: '/fudan/implementation' },
          { text: 'Notebook', link: '/fudan/notebook' },
          { text: 'Results', link: '/fudan/results' },
        ]
      },
      {
        text: 'Technology',
        items: [
          { text: 'Experiments', link: '/fudan/experiments' },
          { text: 'Measurement', link: '/fudan/measurement' },
          { text: 'Improved Parts', link: '/fudan/improve' },
          { text: 'Part Collection', link: '/fudan/part-collection' },
          { text: 'Parts List', link: '/fudan/parts' },
          { text: 'Safety', link: '/fudan/safety' },
          { text: 'Software', link: '/fudan/software' },
          { text: 'Hardware', link: '/fudan/hardware' },
        ]
      },
      {
        text: 'Community',
        items: [
          { text: 'Education', link: '/fudan/education' },
          { text: 'Entrepreneurship', link: '/fudan/entrepreneurship' },
          { text: 'Inclusivity', link: '/fudan/inclusivity' },
          { text: 'Integrated HP', link: '/fudan/human-practices' },
          { text: 'Presentation', link: '/fudan/pv' },
          { text: 'Promotion video', link: '/fudan/promotion-video' },
          { text: 'Sustainable', link: '/fudan/sustainable' },
          { text: 'Wiki @gitlab', link: '/fudan/hardware' },
        ]
      },
      {
        text: 'Team',
        items: [
          { text: 'Attributions', link: '/fudan/attributions' },
          { text: 'Collaborations', link: '/fudan/collaborations' },
          { text: 'Heritage', link: '/fudan/heritage' },
          { text: 'Members', link: '/fudan/team' },
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
