<template>
  <div>
    <button
      @click="openModal"
      class="bg-white w-24 h-32 flex-none rounded shadow-lg border-4 transform duration-75 scale-100 hover:scale-105 hover:-translate-y-3 focus:outline-none"
      :class="[frameColor]"
    >
      <div class="p-1">
        <img
          src="/img/noimage.png"
          alt="カード画像"
          class="border-2"
          :class="[frameColor]"
        />
      </div>
      <p class="text-center">{{ card.prefecture_name }}</p>
    </button>

  </div>
</template>

<script setup lang="ts">
import { type Card } from '~/interfaces/card';
interface Props {
  card: Card,
  frameColor: string,
}
const emit = defineEmits(["click"]);

const { cssClassOfFrameColor } = useCollectionCard()
const { card, frameColor } = defineProps<Props>();
const url = frameColor === cssClassOfFrameColor ? `/collection-cards/${card.card_id}` : `/available-cards/${card.card_id}`

const openModal = () => {
  emit("click", card);
};
</script>
