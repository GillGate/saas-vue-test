<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
import type { Account } from '@/types/account';

defineProps<{
  accounts: Account[];
}>();

const typeOptions = [
  {
    value: 'local',
    label: 'Локальная',
  },
  {
    value: 'ldap',
    label: 'LDAP',
  },
];

const handleType = (row: Account) => {
  if (row.type === 'ldap') {
    row.password = null;
  } else {
    row.password = '';
  }
};

const arraySpanMethod = ({ row, columnIndex }) => {
  if (columnIndex === 2) {
    if (row.password == null) {
      return {
        rowspan: 1,
        colspan: 2,
      };
    } else {
      return {
        rowspan: 1,
        colspan: 1,
      };
    }
  }
  if (columnIndex === 3) {
    if (row.password == null) {
      return {
        rowspan: 0,
        colspan: 0,
      };
    }
  }
};
</script>

<template>
  <el-table :data="accounts" :span-method="arraySpanMethod" empty-text="Нет записей">
    <el-table-column prop="labels" label="Метки" min-width="160">
      <template #default="scope">
        <el-input
          v-model="scope.row.labels"
          placeholder="Укажите метку"
          maxlength="50"
          @change="$emit('saveData', accounts)"
        />
      </template>
    </el-table-column>
    <el-table-column prop="type" label="Тип записи" min-width="160">
      <template #default="scope">
        <el-select v-model="scope.row.type" @change="handleType(scope.row)">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="login" label="Логин" min-width="160">
      <template #default="scope">
        <el-input
          :class="{ 'el-input--error': scope.row.login.length === 0 }"
          v-model="scope.row.login"
          placeholder="Укажите логин"
          maxlength="100"
          @change="$emit('saveData', accounts)"
        />
      </template>
    </el-table-column>
    <el-table-column prop="password" label="Пароль" min-width="160">
      <template #default="scope">
        <el-input
          v-if="scope.row.password !== null"
          :class="{ 'el-input--error': scope.row.password.length === 0 }"
          v-model="scope.row.password"
          type="password"
          show-password
          placeholder="Укажите пароль"
          maxlength="100"
          @change="$emit('saveData', accounts)"
        />
      </template>
    </el-table-column>
    <el-table-column fixed="right" min-width="30">
      <template #default="scope">
        <el-button link :icon="Delete" @click="$emit('delete', scope.$index)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.el-input--error {
  --el-input-border-color: red;
}
</style>
