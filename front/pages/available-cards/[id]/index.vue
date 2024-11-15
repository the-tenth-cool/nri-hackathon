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
    <button
      type="button"
      class="button"
      @click="registerCard"
    >カードを登録</button>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute();
const toast = useToast()
const { findOneById, cssClassOfFrameColor } = useAvailableCard()
const { register } = useCollectionCard();

const id = String(params["id"]);
const card = await findOneById(id);
const registerCard = () => {
  register(id);
  toast.add({
    title: "登録しました！"
  })
}
</script>

<style scoped>
.button {
  @apply size-32 border-4 border-gray-500 m-4 shadow-xl rounded-lg;
}
</style>
