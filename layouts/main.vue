<template>
  <main>
    <MenuBar :title="t('app_name')" />
    <slot />
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
