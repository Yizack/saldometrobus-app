<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary sticky-top shadow-sm">
    <div class="container-fluid">
      <a class="text-white pe-4 display-6" role="button" @click="$router.back()"><Icon class="d-flex" name="material-symbols:arrow-back-sharp" /></a>
      <span class="navbar-brand me-auto">{{ title }}</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
