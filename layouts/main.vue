<template>
  <main>
    <MenuBar :title="STRINGS.get('app_name')" />
    <div class="m-2">
      <slot />
    </div>
  </main>
</template>

<script>
export default {
  name: "MainLayout",
  mounted () {
    if (!AUTH.exists) {
      this.$router.push("/");
    }
  }
};
</script>
