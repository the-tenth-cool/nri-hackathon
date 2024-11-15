<template>
  カード詳細
  <div v-if="card === null">
    <p>ID {{ id }} の仮取得中カードはありません・・・</p>
  </div>
  <div v-else>
    <CardLarge
      :card="card"
      :frame-color="cssClassOfFrameColor"
    ></CardLarge>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute();
const { findOneById, cssClassOfFrameColor } = useCollectionCard()

const id = String(params["id"]);
const card = await findOneById(id);
</script>

<style scoped>
.button {
  @apply size-32 border-4 border-gray-500 m-4 shadow-xl rounded-lg;
}
</style>
