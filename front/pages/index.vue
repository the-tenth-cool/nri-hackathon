<template>
  <div class="h-full flex flex-col">
    <div class="h-full grid grid-cols-3 gap-8 p-6">
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-3xl shadow-[8px_8px_16px_#a1a1a1,-8px_-8px_16px_#ffffff]">
        <Map
          :available-cards="availableCards"
          :collection-cards="collectionCards"
        ></Map>
      </div>
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-3xl shadow-[8px_8px_16px_#a1a1a1,-8px_-8px_16px_#ffffff] flex flex-col justify-center items-center space-y-6">
        <div class="text-center">
          <div class="text-xl font-semibold text-gray-700 mb-2">コレクション</div>
          <div class="flex items-baseline justify-center">
            <span class="text-3xl font-bold text-gray-800">{{ collectionCards.length }}</span>
            <span class="text-sm text-gray-500 ml-1">枚</span>
          </div>
        </div>
        <div class="text-center">
          <div class="text-xl font-semibold text-gray-700 mb-2">使用可能カード</div>
          <div class="flex items-baseline justify-center">
            <span class="text-3xl font-bold text-gray-800">{{ availableCards.length }}</span>
            <span class="text-sm text-gray-500 ml-1">枚</span>
          </div>
        </div>
        <div class="text-center">
          <div class="text-xl font-semibold text-gray-700 mb-2">制覇率</div>
          <div class="flex items-baseline justify-center">
            <span class="text-3xl font-bold text-gray-800">{{ ccPrefIds.size }}/47</span>
            <span class="text-sm text-gray-500 ml-1">都道府県</span>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-2 flex flex-wrap gap-2 justify-center content-center rounded-3xl shadow-[8px_8px_16px_#a1a1a1,-8px_-8px_16px_#ffffff]">
        <CardSmall
          v-for="card in collectionCards"
          :card="card"
          @click="(card) => openModal(card)"
        >
        </CardSmall>
      </div>
    </div>
    <div class="bg-gray-200 gap-2 flex flex-row flex-none justify-center items-center h-32 my-4 rounded-full shadow-[inset_-5px_-5px_10px_rgba(255,255,255,0.7),inset_5px_5px_10px_rgba(0,0,0,0.1)] p-6 mx-6">
      <CardSmall
        v-for="card in availableCards"
        :card="card"
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

const ac = useAvailableCard();
const cc = useCollectionCard();
const availableCards = await ac.findAll();
const collectionCards = await cc.findAll();
const ccPrefIds = new Set(collectionCards.map((cc) => Number(cc.prefecture_id)));
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
