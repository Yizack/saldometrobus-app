<script setup lang="ts">
const model = defineModel<boolean>({ required: true });
</script>

<template>
  <!-- Limit Dialog -->
  <UModal v-model:open="model" :title="t('limit_title')">
    <template #body>
      <p>{{ t("limit_message") }}</p>
    </template>
    <template #footer>
      <UButton type="button" :label="t('entendido')" block @click="model = false" />
    </template>
  </UModal>
</template>
