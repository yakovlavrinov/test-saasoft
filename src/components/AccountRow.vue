<script setup lang="ts">
import { ref } from "vue";
import { useAccountStore } from "../store/account";
import type { Account, AccountType } from "../types/account";
const props = defineProps<{ account: Account }>();
const store = useAccountStore();

const localLabels = ref(props.account.labels.map((l) => l.text).join("; "));

const onChangeLabels = (value: string) => {
  localLabels.value = value;
  props.account.labels = localLabels.value
    .split(";")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((text) => ({ text }));
};
const onTypeChange = (value: AccountType) => {
  props.account.type = value;
};

const onChangeLogin = (value: string) => {
  console.log(value);
  props.account.login = value;
};

const onChangePassword = (value: string) => {
  props.account.password = value;
};

const onRemove = () => {
  store.removeAccount(props.account.id);
};
</script>

<template>
  <n-card>
    <div>
      <n-input
        placeholder="Метки"
        :value="localLabels"
        @update:value="onChangeLabels"
      />
      <n-select
        :options="[
          { label: 'Локальная', value: 'Локальная' },
          { label: 'LDAP', value: 'LDAP' },
        ]"
        :value="props.account.type"
        @update:value="onTypeChange"
      />
      <n-input
        :value="props.account.login"
        placeholder="Логин"
        @update:value="onChangeLogin"
      />
      <n-input
        v-if="props.account.type === 'Локальная'"
        type="password"
        :value="props.account.password"
        placeholder="Пароль"
        @update:value="onChangePassword"
      />
      <n-button type="error" ghost @click="onRemove">Удалить</n-button>
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
