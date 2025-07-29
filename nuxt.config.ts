// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ambient Sounds – Relax, Focus, and Sleep Better',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
        hid: 'description', 
        name: 'description', 
        content: 'Ambientsounds.org offers high-quality ambient sounds, white noise, and nature soundscapes to help you relax, improve focus, achieve deeper sleep, and reduce stress. Explore free, ad-free sound experiences for meditation and productivity.' 
      },
      { 
        hid: 'keywords', 
        name: 'keywords', 
        content: 'ambient sounds, white noise, sleep aid, relaxation, focus, meditation, nature sounds, soothing music, background music, noise cancellation, cafe sounds, rain sounds, forest sounds, free ambient sounds, ad-free' 
      },
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