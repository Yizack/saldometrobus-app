<script setup lang="ts">
const meta = useRouter().currentRoute.value.meta as { nav_title: string };
</script>

<template>
  <main>
    <NavBar :title="t(meta.nav_title)" />
    <slot />
  </main>
</template>
