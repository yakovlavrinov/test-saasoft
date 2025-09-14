<script setup lang="ts">
import { ref } from "vue";
import { useAccountStore } from "../store/account";
import type { Account, AccountType, Errors } from "../types/account";

const props = defineProps<{ account: Account }>();
const store = useAccountStore();

const local = ref({ ...props.account });
const localLabels = ref(local.value.labels.map((l) => l.text).join("; "));

const errors = ref<Errors>({});

const validate = (): boolean => {
  errors.value = {};

  const labels = localLabels.value
    .split(";")
    .map((l) => l.trim())
    .filter(Boolean);
  const invalidLabel = labels.find((l) => l.length > 50);
  if (invalidLabel) {
    errors.value.labels = `Метка "${invalidLabel}" превышает 50 символов`;
  }

  if (!local.value.type) {
    errors.value.type = "Выберите тип учетной записи";
  }

  if (!local.value.login.trim()) {
    errors.value.login = "Поле Логин обязательно";
  } else if (local.value.login.length > 100) {
    errors.value.login = "Логин не может превышать 100 символов";
  }

  if (local.value.type === "Локальная") {
    if (!local.value.password?.trim()) {
      errors.value.password = "Поле Пароль обязательно";
    } else if (local.value.password.length > 100) {
      errors.value.password = "Пароль не может превышать 100 символов";
    }
  } else {
    local.value.password = null;
  }

  return Object.keys(errors.value).length === 0;
};

const trySave = () => {
  if (validate()) {
    local.value.labels = localLabels.value
      .split(";")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((text) => ({ text }));
    store.updateAccount(local.value);
  }
};

const onChangeLabels = (value: string) => {
  localLabels.value = value;
};

const onChangeType = (value: AccountType) => {
  local.value.type = value;
  trySave();
};

const onChangeLogin = (value: string) => {
  local.value.login = value;
};

const onChangePassword = (value: string) => {
  local.value.password = value;
};

const onRemove = () => {
  store.removeAccount(props.account.id);
};
</script>

<template>
  <n-card>
    <n-form inline :show-label="false" :show-feedback="true">
      <n-form-item
        :feedback="errors.labels"
        :validation-status="errors.labels ? 'error' : undefined"
      >
        <n-input
          placeholder="Метки через ;"
          :value="localLabels"
          @update:value="onChangeLabels"
          @blur="trySave"
        />
      </n-form-item>

      <n-form-item
        :feedback="errors.type"
        :validation-status="errors.type ? 'error' : undefined"
      >
        <n-select
          :options="[
            { label: 'Локальная', value: 'Локальная' },
            { label: 'LDAP', value: 'LDAP' },
          ]"
          :value="local.type"
          @update:value="onChangeType"
        />
      </n-form-item>

      <n-form-item
        :feedback="errors.login"
        :validation-status="errors.login ? 'error' : undefined"
      >
        <n-input
          :value="local.login"
          @update:value="onChangeLogin"
          placeholder="Логин"
          @blur="trySave"
          :class="{ 'full-width': local.type !== 'Локальная' }"
        />
      </n-form-item>

      <n-form-item
        v-if="local.type === 'Локальная'"
        :feedback="errors.password"
        :validation-status="errors.password ? 'error' : undefined"
      >
        <n-input
          type="password"
          :value="local.password || ''"
          @update:value="onChangePassword"
          placeholder="Пароль"
          @blur="trySave"
        />
      </n-form-item>

      <n-form-item>
        <n-button type="error" ghost @click="onRemove">Удалить</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<style scoped>
.n-card {
  display: flex;
}
.full-width {
  width: 420px;
}
</style>
