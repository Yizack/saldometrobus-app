
<template>
  <section>
    <NavBar back="/tarjetas/" :title="STRINGS.get('config')" />
    <div class="m-2">
      <div class="bg-white border rounded p-2 mb-2 shadow">
        <h4 class="text-primary m-0"><b>{{ STRINGS.get("idioma") }}</b></h4>
        <div class="m-2">
          <select v-model="lang" class="form-select">
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      <div class="bg-white border rounded p-2 mb-2 shadow">
        <h4 class="text-primary m-0"><b>{{ STRINGS.get("modo_oscuro") }}</b></h4>
        <div class="m-2">
          <div class="form-check form-switch form-check-reverse">
            <label class="form-check-label" for="theme">{{ STRINGS.get("dark_mode_desc") }}</label>
            <input id="theme" v-model="dark" class="form-check-input" type="checkbox" role="switch">
          </div>
        </div>
      </div>
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
