<template>
  <div class="container mx-auto p-6">
    <div class="space-y-6">
      <div v-for="friend in friends" :key="friend.id" class="bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-2 rounded-3xl shadow-[8px_8px_16px_#a1a1a1,-8px_-8px_16px_#ffffff]">
        <div class="flex">
          <div class="flex items-center mr-6 w-2/5">
            <UAvatar
              :src="friend.avatar"
              loading="lazy"
              img-class="size-full"
              class="shadow-xl size-24 mr-6"
            />
            <div>
              <p class="text-2xl font-bold">{{ friend.name }}</p>
              <p class="text-lg mt-2 text-wrap">{{ friend.comment }}</p>
            </div>
          </div>
          <div class="w-1/2">
            <div class="flex flex-wrap gap-4">
              <CardSmall
                v-for="card in friend.cards"
                :key="card.card_id"
                :card="card"
                @click="(card) => openModal(card)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isOpenModal">
    <CardModal
      :selected-card="selectedCard!" @close="closeModal"
    ></CardModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Card, CollectionCard } from '~/interfaces/card';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  comment: string;
  cards: CollectionCard[];
}

const cards = getCards() as Card[];
cards.forEach((card) => {
  card.type = "collection";
});

// フレンドのデータ（実際にはAPIから取得するなど）
const friends = ref<Friend[]>([
  {
    id: 1,
    name: 'ルフィ',
    avatar: '/img/onepiece01_luffy.png',
    comment: '”海賊王”に!!! おれはなるっ!!!!',
    cards: [cards[0], cards[1], cards[2]]
  },
  {
    id: 2,
    name: 'ゾロ',
    avatar: '/img/onepiece02_zoro_bandana.png',
    comment: '背中の傷は剣士の恥だ',
    cards: [cards[3]]
  },
  {
    id: 3,
    name: 'ナミ',
    avatar: '/img/onepiece03_nami.png',
    comment: '子供に泣いて助けてって言われたら!!!もう背中向けられないじゃない!!!!',
    cards: [cards[4], cards[5], cards[6], cards[7], cards[8]]
  },
]);

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