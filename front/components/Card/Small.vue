<template>
  <button
    @click="openModal"
    class="bg-white h-32 aspect-[3/4] z-[1000] flex-none rounded shadow-lg border-4 transform duration-75 scale-100 hover:scale-105 hover:-translate-y-3 focus:outline-none"
    :class="[frameColor]"
  >
    <div
      class="h-full flex flex-col justify-end p-1"
    >
      <div class="border-2 w-full flex-grow content-center" :class="[frameColor]">
        <img
          src="/img/noimage.png"
          alt="カード画像"
        />
      </div>
      <p class="text-center text-xs font-semibold mt-1">{{ card.prefecture_name }}</p>
      <p class="text-center text-sm font-bold">{{ card.food_genre_name }}</p>
    </div>
  </button>
</template>

<script setup lang="ts">
import { type Card } from '~/interfaces/card';
interface Props {
  card: Card,
}
const { card } = defineProps<Props>();
const emit = defineEmits(["click"]);

const frameColor = useColor().getFrameColorByCard(card);

const openModal = () => {
  emit("click", card);
};
</script>
