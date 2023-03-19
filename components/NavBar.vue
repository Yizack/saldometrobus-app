<template>
  <nav class="navbar navbar-dark navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <NuxtLink class="text-white pe-4 display-6" :to="back"><Icon class="d-flex" name="material-symbols:arrow-back-sharp" /></NuxtLink>
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
    },
    back: {
      type: String,
      required: true
    }
  }
};
</script>
