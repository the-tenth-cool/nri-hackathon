<template>
  <nav class="flex items-center justify-between">
    <!-- ロゴ部分 -->
    <NuxtLink 
      to="/" 
      class="text-2xl font-bold text-primary cursor-pointer logo-link"
    >
      どこかのご当地フードコレクター
    </NuxtLink>

    <!-- ナビゲーションメニュー -->
    <div class="flex space-x-4">
      <NuxtLink 
        v-for="(item, index) in navItems" 
        :key="index" 
        :to="item.route" 
        class="nav-link"
        :class="{ active: $route.path === item.route }"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
// ナビゲーションアイテムのリスト
const navItems = [
  { label: '新しいカードをひく', route: '/drawing' },
]
</script>

<style scoped>
/* ロゴ部分のスタイル */
.logo-link {
  transition: transform 0.2s ease, color 0.2s ease;
}

/* ロゴ部分のホバー効果 */
.logo-link:hover {
  transform: scale(1.1);
  color: #1d4ed8; /* 任意の強調色 */
}

/* ナビゲーションリンクの基本スタイル */
.nav-link {
  @apply text-gray-600 hover:text-primary transition-colors duration-200 font-medium;
  padding-bottom: 0.25rem;
  border-bottom-width: 2px;
  border-color: transparent;
}

/* アクティブなページを示すスタイル */
.nav-link.active {
  @apply text-primary border-primary;
}
</style>
