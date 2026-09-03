<script setup lang="ts">
import type { SelectItem } from "@nuxt/ui";

definePageMeta({ layout: "back", nav_title: "config" });

const lang = ref<Locale>("es");
const dark = ref(false);

CONFIG.load();
lang.value = CONFIG.lang;
dark.value = CONFIG.dark;

watch(lang, (val) => {
  CONFIG.setLang(val);
  useRoute().meta.nav_title = "";
  useRoute().meta.nav_title = "config";
});

watch(dark, (bool) => {
  CONFIG.setDark(bool);
});

const languages = ref<SelectItem[]>([
  {
    label: "Español",
    value: "es"
  },
  {
    label: "English",
    value: "en"
  }
]);
</script>

<template>
  <section>
    <div :key="lang">
      <BoxComponent :title="t('idioma')">
        <USelect v-model="lang" :items="languages" class="w-full" />
      </BoxComponent>
      <BoxComponent :title="t('modo_oscuro')">
        <USwitch
          v-model="dark"
          :label="t('dark_mode_desc')"
          size="xl"
          color="secondary"
          :ui="{ root: 'flex-row-reverse justify-between' }"
        />
      </BoxComponent>
    </div>
  </section>
</template>
