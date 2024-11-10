// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
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
