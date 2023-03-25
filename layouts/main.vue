<script setup>
if (!AUTH.exists) {
  navigateTo("/");
}
</script>

<template>
  <main>
    <SideBar :title="STRINGS.get('app_name')" />
    <div class="m-2">
      <slot />
    </div>
  </main>
</template>

<script>
export default {
  name: "MainLayout"
};
</script>
