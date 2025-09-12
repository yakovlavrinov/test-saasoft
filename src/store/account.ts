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

  return { accounts, addAccount, removeAccount }
});
