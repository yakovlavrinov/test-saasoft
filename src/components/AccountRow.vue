<script setup lang="ts">

</script>

<template>
  <n-card>
    <div>
      <n-input />
      <n-select />
      <n-input />
      <n-input />
      <n-button type="error" >Удалить</n-button>
    </div>
  </n-card>
</template>

<style scoped>
div {
  display: flex;
  gap: 10px;
}

.n-card {
  display: flex;
}
</style>
