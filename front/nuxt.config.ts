// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  vite: {
    server: {
    },
  },
})

module.exports = {
  devServer: {
    proxy: {
      '/available_cards': {
        target: 'http://localhost:8000',  // バックエンドのURL
        changeOrigin: true,  // オリジンをバックエンドに一致させる
        pathRewrite: { '^/available_cards': '/available_cards' },  // 必要に応じてパスを書き換える
      },
    },
  },
};
