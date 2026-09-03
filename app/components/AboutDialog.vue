<script setup lang="ts">
const model = defineModel<boolean>({ required: true });
</script>

<template>
  <UModal v-model:open="model" :title="t('acerca')">
    <template #content="{ close }">
      <UButton icon="x" class="absolute top-4 right-4" variant="ghost" color="neutral" @click="close" />
      <div class="text-center p-6">
        <div class="flex justify-center">
          <img class="shadow mb-3 p-2 rounded-lg" width="90" height="90" src="/images/logo.webp">
        </div>
        <div class="text-sm whitespace-pre-wrap">{{ t("about_message") }}</div>
      </div>
    </template>
  </UModal>
</template>
