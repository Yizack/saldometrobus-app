<script setup lang="ts">
const meta = useRouter().currentRoute.value.meta as { nav_title: string };
</script>

<template>
  <div>
    <NavBar :title="t(meta.nav_title)" />
    <UContainer class="py-2">
      <slot />
    </UContainer>
  </div>
</template>
