<template>
  <div
    class="bg-white w-24 h-32 rounded shadow-lg border-4 transform duration-75 scale-100 hover:scale-105 hover:-translate-y-3"
    :class="[frameColor]"
  >
    <div
      class="p-1"
    >
      <img
        src="/img/noimage.png"
        alt="カード画像"
        class="border-2"
        :class="[frameColor]"
      />
    </div>
    <p class="text-center">{{ card.prefecture_name }}</p>
  </div>
</template>

<script setup lang="ts">
import { type Card } from '~/interfaces/card';
interface Props {
  card: Card,
  frameColor: string,
}
defineProps<Props>();
</script>
