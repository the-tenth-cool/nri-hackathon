// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true,
  },

  modules: ["@nuxt/ui", "@nuxtjs/leaflet"],

  ui: {
    global: true
  },

  // /**
  //  * Tailwindのコンフィグ
  //  */
  // tailwindcss: {
  //   /**
  //    * パス
  //    */
  //   configPath: '~/tailwind.config.ts'
  // },

  /**
   * Nuxtアプリで使用するコンフィグ
   */
  runtimeConfig: {
    /**
     * 全コンポーネントから使えるもの
     */
    public: {
      /**
       * APIサーバのオリジン
       */
      apiOrigin: "http://localhost:8000",
    }
  }
})