<script setup>
definePageMeta({ layout: "back", nav_title: "creditos" });
</script>

<template>
  <section>
    <div class="my-2 text-center">
      <p class="m-0"><strong>{{ t("opensrc_credits") }}</strong></p>
    </div>
    <div v-for="(credito, i) in CREDITS" :key="i" class="bg-body-tertiary border rounded p-2 mb-2 shadow hover" role="button" @click="openInNewTab(credito.link)">
      <h4 class="text-primary-emphasis m-0"><strong>{{ credito.name }}</strong></h4>
      <div class="small mx-2">
        <p v-if="credito.version" class="text-muted m-0">{{ t("version") }}: {{ String(credito.version).replace("^", "") }}</p>
        <p class="m-0">{{ credito.description[t("lang_code")] }}.</p>
      </div>
    </div>
  </section>
</template>
