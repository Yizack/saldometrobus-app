<template>
  <main>
    <MenuBar :title="t('app_name')" />
    <div class="m-2">
      <slot />
    </div>
  </main>
</template>

<script>
export default {
  name: "MainLayout",
  mounted () {
    if (!Auth().exists) {
      this.$router.push("/");
    }
  }
};
</script>
