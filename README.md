# Team Fudan 2025 Wiki

We use [Vue.js](https://vuejs.org/) and [Vitepress](https://vitepress.dev/) to build our wiki as an [Progressive Web app](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) on [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/).

This repository contains **all coding assets** to generate our team's wiki (HTML, CSS, JavaScript, 
etc).

### Technology stack
- VitePress 1.x + Vue 3
- Tailwind CSS 4, PostCSS, Autoprefixer
- GSAP, Three.js, ECharts, Motion One (`motion-v`), `clsx`, `tailwind-merge`

Images, photos, icons and fonts are stored on `static.igem.wiki` using [tools.igem.org/uploads](https://tools.igem.org/uploads), and Videos are embedded from [iGEM Video Universe](https://video.igem.org).

We built our wiki following [gitlab guide](https://tools.igem.org/wiki/gitlab-guide) and [competition.igem.org/deliverables/team-wiki](https://competition.igem.org/deliverables/team-wiki). No [external content](https://tools.igem.org/wiki/external-content-check) is used in our wiki.

The content of this repository is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

### Local development
Prerequisites: Node.js and `pnpm` installed.

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Start dev server: `pnpm docs:dev`
4. Build static site: `pnpm docs:build`
5. Preview the build: `pnpm docs:preview`

The static site output is generated in `.vitepress/dist`.

### Credits and license
- Page authorship is tracked in `written-by.md`.
- Unless otherwise noted, the content of this repository is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
- iGEM and iGEM Foundation are trademarks of the iGEM Foundation; all third-party trademarks are the property of their respective owners.

----
`Code by: Yufan Han`
