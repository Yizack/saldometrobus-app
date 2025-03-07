<script setup lang="ts">
defineProps<{
  title: string;
  titleCenter?: boolean;
  p2?: boolean;
}>();
</script>

<template>
  <div class="bg-body-tertiary border rounded mb-2 shadow overflow-hidden">
    <div class="bg-primary text-white px-3 py-2" :class="{ 'text-center': titleCenter }">
      <h4 class="m-0">{{ title }}</h4>
    </div>
    <div :class="p2 ? 'px-2 py-3' : 'p-3'">
      <slot />
    </div>
  </div>
</template>
