<script setup lang="ts">
defineProps<{
  invalid: boolean;
  text: string;
}>();
</script>

<template>
  <UTooltip
    :open="invalid"
    :text="text"
    :ui="{ content: 'bg-error/85 text-inverted ring-0 shadow rounded-lg' }"
    :content="{ align: 'end', side: 'top', sideOffset: -32, alignOffset: 5 }"
  >
    <slot />
  </UTooltip>
</template>
