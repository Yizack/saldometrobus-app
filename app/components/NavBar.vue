<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary sticky-top shadow-sm">
    <div class="container-fluid">
      <a class="text-white pe-4 display-6 d-flex" role="button" @click="$router.back()">
        <Icon name="left" />
      </a>
      <span class="navbar-brand me-auto">{{ title }}</span>
    </div>
  </nav>
</template>
