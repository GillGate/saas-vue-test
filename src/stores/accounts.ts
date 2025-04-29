import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Account, LSAccount } from '@/types/account';
import { convertToLSAccount, getLSAccData, setLSAccounts } from '@/utils/ls';

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([]);

  function getAccounts() {
    const LSAccData = getLSAccData();
    if (LSAccData !== null) {
      const { accData } = JSON.parse(LSAccData);

      accData.forEach((acc: LSAccount) => {
        const labels = acc.labels.reduce((labels, label) => {
          return labels + label.text + '; ';
        }, '');

        accounts.value.push({
          ...acc,
          labels,
        });
      });
    }

    return accounts;
  }

  function addAccount() {
    accounts.value.push({
      labels: '',
      type: 'ldap',
      login: '',
      password: null,
    });
  }

  function saveAccounts(accounts) {
    const validatedAccs: LSAccount[] = [];

    accounts.forEach((acc: Account) => {
      if (
        (acc.type === 'ldap' && acc.login.length > 0) ||
        (acc.type === 'local' && acc.login.length > 0 && acc.password.length > 0)
      ) {
        validatedAccs.push(convertToLSAccount(acc));
      }
    });

    setLSAccounts(validatedAccs);
  }

  function deleteAccount(index: number) {
    accounts.value = accounts.value.filter((acc, accIndex) => accIndex !== index);
    return saveAccounts(accounts.value);
  }

  return { getAccounts, addAccount, saveAccounts, deleteAccount } as const;
});
