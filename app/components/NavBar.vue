<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <UHeader :title="title" class="bg-primary sticky-top shadow-sm" :toggle="false">
    <template #left>
      <div class="text-inverted flex items-center gap-4">
        <UButton icon="left" variant="link" class="text-inverted!" size="xl" @click="$router.back()" />
        <h1 class="text-xl">{{ title }}</h1>
      </div>
    </template>
  </UHeader>
</template>
