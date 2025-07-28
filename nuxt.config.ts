// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ambient Sounds – Relax, Focus, and Sleep Better',
      meta: [
        { name: 'description', content: 'Immerse yourself in a world of calming audio designed to help you relax, concentrate, or drift into deep sleep. Our curated collection of ambient soundscapes—ranging from gentle rain, ocean waves, and forest birdsong to cozy fireplace crackles and soft white noise—creates the perfect atmosphere for any mood or activity.Whether you need a peaceful background while working, soothing sounds for meditation, or a calming playlist to unwind at night, Ambient Sounds offers a distraction-free, minimalist interface for an effortless listening experience.' },
        { name: 'msvalidate.01', content: '117B61D4E7E7A87A13B92E63097EFA1F'}
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }},
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  
  sitemap: {
    siteUrl: 'https://ambientsounds.org',
    gzip: true,
    routes: [
      '/'
    ]
  }
})