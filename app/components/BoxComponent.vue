<script setup lang="ts">
defineProps<{
  title: string;
  titleCenter?: boolean;
}>();
</script>

<template>
  <div class="mb-3">
    <div class="bg-primary text-inverted px-3 py-2 rounded-t-lg" :class="{ 'text-center': titleCenter }">
      <h4 class="m-0 text-xl">{{ title }}</h4>
    </div>
    <div class="bg-default border border-default rounded-b-lg p-4 shadow">
      <slot />
    </div>
  </div>
</template>
