<template>
  <div class="bg-white h-[34rem] aspect-[3/4] flex-none rounded shadow-xl border-8" :class="[frameColor]" @click="emit('click')">
    <div class="h-full w-full flex flex-col justify-between p-3">
      <div class="h-2/3 w-full content-center">
        <img :src="getImage(card)" alt="カード画像"
          class="object-cover hover:object-scale-down w-full h-full justify-self-center border-4 "
          :class="[frameColor]" />
      </div>
      <div class="flex-grow grid grid-cols-1 content-start">
        <p class="text-center font-bold mt-3">No. {{ card.card_id }}</p>
        <p class="text-center text-3xl font-bold mt-1">{{ card.prefecture_name }}</p>
        <p class="text-center text-xl font-semibold text-gray-500">{{ card.region_name }}</p>
        <p class="text-center text-2xl font-bold mt-1">{{ card.food_genre_name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '~/interfaces/card';

interface Props {
  card: Card;
}
const { card } = defineProps<Props>();
const frameColor = useColor().getFrameColorByCard(card);
const { getImage } = useImage();
const emit = defineEmits(['click']);
</script>
