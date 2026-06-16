// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@aero-cms/vue-sdk/nuxt'],
  aeroCms: {
    baseUrl: process.env.NUXT_PUBLIC_CMS_API_URL || 'http://localhost:5047',
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      adminOrigin: process.env.NUXT_PUBLIC_ADMIN_ORIGIN || 'http://localhost:5173',
    },
  },
});
