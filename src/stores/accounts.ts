import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Account, LSAccount } from '@/types/account';

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([]);

  function getAccounts() {
    const LSAccData = localStorage.getItem('accData');
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

      return accounts;
    } else {
      localStorage.setItem(
        'accData',
        JSON.stringify({
          accData: [],
        }),
      );
    }
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
    const validatedAccs: Account[] = [];

    accounts.forEach((acc) => {
      if (acc.type === 'ldap' && acc.login.length > 0) {
        validatedAccs.push(acc);
      }
      if (acc.type === 'local' && acc.login.length > 0 && acc.password.length > 0) {
        validatedAccs.push(acc);
      }
    });

    const LSAcc = validatedAccs.map((acc) => {
      const labels = new Set<string>();

      acc.labels.split(';').forEach((label: string) => {
        const formatLabel = label.trim();
        if (formatLabel !== '') {
          labels.add(formatLabel);
        }
      });

      return {
        ...acc,
        labels: Array.from(labels).map((label) => {
          return {
            text: label,
          };
        }),
      };
    });

    localStorage.setItem(
      'accData',
      JSON.stringify({
        accData: LSAcc,
      }),
    );
  }

  function deleteAccount(index: number) {
    accounts.value = accounts.value.filter((acc, accIndex) => accIndex !== index);
    return saveAccounts(accounts.value);
  }

  return { getAccounts, addAccount, saveAccounts, deleteAccount } as const;
});
