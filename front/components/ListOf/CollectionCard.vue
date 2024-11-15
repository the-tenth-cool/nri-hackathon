<template>
  <CardSmall
    v-for="card in cards"
    :card="card"
    :frame-color="cssClassOfFrameColor"
  >
  </CardSmall>
</template>

<script setup lang="ts">
const { findAll, cssClassOfFrameColor } = useCollectionCard();
const cards = await findAll();
</script>
