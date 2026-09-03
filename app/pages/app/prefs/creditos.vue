<script setup>
definePageMeta({ layout: "back", nav_title: "creditos" });
</script>

<template>
  <UMain>
    <div class="mb-2 text-center">
      <p><strong>{{ t("opensrc_credits") }}</strong></p>
    </div>
    <div
      v-for="(credito, i) in CREDITS"
      :key="i"
      class="border border-default rounded-lg p-2 mb-2 shadow hover:bg-elevated hover:border-primary"
      @click="openInNewTab(credito.link)"
    >
      <h4 class="text-primary text-lg"><strong>{{ credito.name }}</strong></h4>
      <div class="text-sm mx-2">
        <p v-if="credito.version" class="text-muted">{{ t("version") }}: {{ String(credito.version).replace("^", "") }}</p>
        <p>{{ credito.description[t("lang_code")] }}.</p>
      </div>
    </div>
  </UMain>
</template>
