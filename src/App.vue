<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts';
import AccountForm from '@/components/AccountForm.vue';
import type { Account } from '@/types/account';

const accStore = useAccountsStore();
const accounts = accStore.getAccounts();
</script>

<template>
  <div class="accounts">
    <header class="accounts__header">
      <h1>Учётные записи</h1>
      <el-button @click="accStore.addAccount">+</el-button>
    </header>
    <main>
      <AccountForm
        class="accounts__form"
        :accounts="accounts as Account[]"
        @saveData="accStore.saveAccounts"
        @delete="accStore.deleteAccount"
      />
    </main>
  </div>
</template>

<style scoped></style>
