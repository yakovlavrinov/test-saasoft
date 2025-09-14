import { defineStore } from "pinia";
import { ref } from "vue";
import type { Account } from "../types/account";

export const useAccountStore = defineStore("accounts", () => {
  const accounts = ref<Account[]>([]);

  const addAccount = () => {
    accounts.value.push({
      id: crypto.randomUUID(),
      labels: [],
      type: "Локальная",
      login: "",
      password: "",
    });
  };

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter((acc) => acc.id !== id);
  };

  function updateAccount(updated: Account) {
    const idx = accounts.value.findIndex(acc => acc.id === updated.id);
    if (idx !== -1) {
      accounts.value[idx] = updated;
    }
  }

  return { accounts, addAccount, removeAccount, updateAccount  }
});
