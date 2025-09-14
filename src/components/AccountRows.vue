<script setup lang="ts">
import { useAccountStore } from "../store/account";
import AccountRow from "./AccountRow.vue";

const store = useAccountStore();
</script>

<template>
  <div>
    <n-flex align="center">
      <h2>Учетные записи</h2>
      <n-button type="primary" ghost @click="store.addAccount">+</n-button>
    </n-flex>
    <n-alert type="info" closable="{false}">
      Для указания нескольких меток используйте разделитель ;
    </n-alert>
    <n-empty
      v-if="store.accounts.length === 0"
      description="Нет учетных записей"
      size="large"
    />
    <n-flex v-else class="header">
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
    <account-row
      v-for="account in store.accounts"
      :account="account"
      :key="account.id"
    />
  </div>
</template>

<style scoped>
.n-button:focus {
  outline: none;
}
.n-empty {
  margin-top: 30px;
}
.header {
  margin-top: 30px;
}
.header div {
  margin: 0 32px;
}
</style>
