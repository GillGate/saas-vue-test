export {};

/* prettier-ignore */
declare module 'vue' {
  export interface GlobalComponents {
    AccountForm: typeof import('./src/components/AccountForm.vue')['default']
    ElButton: typeof import('element-plus/es')['ElButton']
    ElInput: typeof import('element-plus/es')['ElInput']
    ElOption: typeof import('element-plus/es')['ElOption']
    ElSelect: typeof import('element-plus/es')['ElSelect']
    ElTable: typeof import('element-plus/es')['ElTable']
    ElTableColumn: typeof import('element-plus/es')['ElTableColumn']
  }
}
