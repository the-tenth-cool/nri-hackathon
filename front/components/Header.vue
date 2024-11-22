<template>
  <div class="flex justify-between">
    <NuxtLink 
      to="/" 
      class="flex-none flex items-center text-2xl font-bold text-primary cursor-pointer logo-link"
    >
      どこかのご当地フードコレクター
    </NuxtLink>
    <UHorizontalNavigation
      class="grow"
      :links="horizonLinks"
    >
      <template #avatar="{ link }">
        <UAvatar
          v-if="link.avatar"
          v-bind="link.avatar"
          size="md"
          loading="lazy"
          chip-color="primary"
          class="border-2 border-gray-200 dark:border-gray-800"
        />
      </template>
      <template #default="{ link }">
        <span class="group-hover:text-primary text-xl relative">{{ link.label }}</span>
      </template>
    </UHorizontalNavigation>
  </div>
    <USlideover v-model="isOpen" class="z-[2000]">
      <div class="flex flex-col items-center m-6">
        <UAvatar
          src="/img/onepiece05_sanji.png"
          loading="lazy"
          img-class="size-full"
          class="shadow-2xl size-48"
        />
        <p class="text-3xl font-bold mt-6">サンジ</p>
        <p class="text-lg m-2">くそお世話になりました!!!</p>
      </div>
      <div class="flex flex-col">
        <UVerticalNavigation :links="verticalLinks" class="px-6 ">
          <template #default="{ link }">
            <span class="group-hover:text-primary text-xl relative p-2">{{ link.label }}</span>
          </template>
        </UVerticalNavigation>
      </div>
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="flex sm:hidden absolute end-5 top-5 z-10"
        square
        padded
        @click="isOpen = false"
      />
    </USlideover>
</template>

<script setup>
const emit = defineEmits(["click-account"]);
const isOpen = ref(false);
const horizonLinks = [[], [
    {
      label: 'ホーム',
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: '新しいカードをひく',
      icon: 'mdi:cards-outline',
      to: '/drawing',
    },
    {
      label: 'フレンド',
      icon: 'uil:users-alt',
      to: '/friends',
      badge: 3,
    },
    {
      avatar: {
        src: '/img/onepiece05_sanji.png'
      },
      click: () => isOpen.value = true,
    },
  ],
]
const verticalLinks = [[
  {
    label: '設定',
    icon: 'material-symbols:settings',
  },
  {
    label: 'お知らせ',
    icon: 'i-heroicons-inbox',
  },
  {
    label: 'ヘルプ',
    icon: 'i-heroicons-question-mark-circle',
  },
]];
</script>
