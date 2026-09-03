<script setup lang="ts">
defineProps<{
  message: string;
}>();

const model = defineModel<boolean>({ required: true });
</script>

<template>
  <!-- Progress Dialog -->
  <UModal v-model:open="model" :title="message" :close="false" :dismissible="false">
    <template #body>
      <div class="flex justify-center items-center py-4">
        <Icon name="spinner" class="animate-spin text-primary" size="2.5rem" />
        <span class="hidden">Loading...</span>
      </div>
    </template>
  </UModal>
</template>
