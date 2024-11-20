<template>
  <div class="h-full flex flex-col">
    <div class="h-full grid grid-cols-2 gap-4">
      <div class="bg-gray-100 p-4">
        <Map></Map>
      </div>
      <div class="bg-green-100 p-6 flex flex-wrap gap-2 justify-center">
        <ListOfCollectionCard></ListOfCollectionCard>
      </div>
    </div>
    <div class="bg-gray-300 gap-2 flex flex-row justify-center items-end h-1/5 mt-4">
      <CardSmall
        v-for="card in availableCards"
        :card="card"
        :frame-color="cssClassOfFrameColor"
        @click="(card) => openModal(card)"
      >
      </CardSmall>
    </div>
  </div>
  <div v-if="isOpenModal">
    <CardModal
      :selected-card="selectedCard!" @close="closeModal"
    ></CardModal>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '~/interfaces/card';

const { findAll, cssClassOfFrameColor } = useAvailableCard();
const availableCards = await findAll();
const selectedCard = ref<Card | null>(null);
const isOpenModal = computed(() => selectedCard.value !== null);

const openModal = (card: Card) => {
  selectedCard.value = card;
  document.body.style.overflow = 'hidden'; // モーダル表示時にスクロールを無効化
};

const closeModal = () => {
  selectedCard.value = null;
  document.body.style.overflow = ''; // モーダル非表示時にスクロールを有効化
};
</script>
