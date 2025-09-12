<script setup lang="ts">
import AccountRow from "./AccountRow.vue";
const arr = [1, 2, 3, 4, 5];
</script>

<template>
  <div>
    <n-flex align="center" >
      <h2>Учетные записи</h2>
      <n-button type="primary" ghost>+</n-button>
    </n-flex>
    <n-alert type="info" closable="{false}">
      Для указания нескольких меток используйте разделитель ;
    </n-alert>
    <n-flex class="header">
      <div>
        <n-statistic label="Метки" />
      </div>
      <div>
        <n-statistic label="Тип записи" />
      </div>
      <div>
        <n-statistic label="Логин" />
      </div>
      <div>
        <n-statistic label="Пароль" />
      </div>
    </n-flex>
    <account-row v-for="el in arr" :key="el" />
  </div>
</template>

<style scoped>
.header {
    margin-top: 30px;
}
.header div {
  margin: 0 24px;
}
</style>
