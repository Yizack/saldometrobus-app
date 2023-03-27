<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <ul id="tabs" class="nav nav-pills mb-2 sticky-top" role="tablist">
      <li v-for="(tab, key) in tabs" :key="key" class="nav-item flex-fill" role="presentation">
        <div class="d-grid gap-2">
          <a class="nav-link rounded-0 text-uppercase text-center" :class="{ active: tab }" role="button" @click="tabClick(key)">{{ STRINGS.get(key) }}</a>
        </div>
      </li>
    </ul>
    <div>
      <CardInfo v-if="tabs.informacion" :tarjeta="tarjeta" />
      <CardMov v-else-if="tabs.movimientos" :tarjeta="tarjeta" />
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      tarjeta: {},
      tabs: {
        informacion: false,
        movimientos: false,
        graficas: false
      }
    };
  },
  async mounted () {
    const numero = this.$route.params.tarjeta;
    this.tarjeta = await DB.getTarjeta(numero);
    this.tarjeta.movimientos = await DB.getMovimientos(numero);
    this.tabs.informacion = true;
  },
  methods: {
    tabClick (tab) {
      this.tabs = {
        informacion: false,
        movimientos: false,
        graficas: false
      };
      this.tabs[tab] = true;
    }
  }
};
</script>
