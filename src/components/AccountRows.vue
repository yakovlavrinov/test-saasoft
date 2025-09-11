<script setup lang="ts">
import AccountRow from './AccountRow.vue';
const arr = [1, 2, 3, 4, 5];
</script>

<template>
  <div>
    <account-row v-for="el in arr" :key="el"  />
  </div>
</template>

<style scoped></style>
