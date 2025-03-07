<script setup>
definePageMeta({ layout: "back", nav_title: "config" });
</script>

<template>
  <section>
    <div :key="lang">
      <BoxComponent :title="t('idioma')">
        <select v-model="lang" class="form-select py-2">
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </BoxComponent>
      <BoxComponent :title="t('modo_oscuro')">
        <div class="form-switch text-start p-0 d-flex justify-content-between align-items-center">
          <div class="col-8">
            <label for="theme">{{ t("dark_mode_desc") }}</label>
          </div>
          <input id="theme" v-model="dark" class="form-check-input" type="checkbox" role="switch">
        </div>
      </BoxComponent>
    </div>
  </section>
</template>

<script>
export default {
  name: "Config",
  data () {
    return {
      lang: "es",
      dark: false
    };
  },
  watch: {
    lang (val) {
      CONFIG.setLang(val);
      this.$route.meta.nav_title = "";
      this.$route.meta.nav_title = "config";
    },
    dark (bool) {
      CONFIG.setDark(bool);
    }
  },
  mounted () {
    CONFIG.load();
    this.lang = CONFIG.lang;
    this.dark = CONFIG.dark;
  }
};
</script>
