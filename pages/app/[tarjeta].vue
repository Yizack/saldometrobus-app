<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <ul id="tabs" class="nav nav-pills" role="tablist">
      <li v-for="(tab, key) in tabs" :key="key" class="nav-item flex-fill" role="presentation">
        <a class="nav-link rounded-0 text-uppercase text-center py-1" :class="{ active: tab.active }" role="button" @click="tabClick(key)">
          <Icon :name="tab.icon" />
          <p class="m-0 small mt-1"><small>{{ t(key) }}</small></p>
        </a>
      </li>
    </ul>
    <div class="pt-5">
      <Transition name="tab" mode="out-in">
        <CardInfo v-if="tabs.informacion.active" :tarjeta="tarjeta" />
        <CardMov v-else-if="tabs.movimientos.active" :tarjeta="tarjeta" />
        <CardGraphs v-else-if="tabs.graficas.active" :tarjeta="tarjeta" />
      </Transition>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      tarjeta: {},
      tabs: {
        informacion: {
          active: false,
          icon: "card"
        },
        movimientos: {
          active: false,
          icon: "list"
        },
        graficas: {
          active: false,
          icon: "graph"
        }
      }
    };
  },
  async mounted () {
    const numero = this.$route.params.tarjeta;
    this.tarjeta = await DB.getTarjeta(numero);
    this.tarjeta.movimientos = await DB.getMovimientos(numero);
    this.tabs.informacion.active = true;
  },
  methods: {
    tabClick (tab) {
      this.tabs.informacion.active = false;
      this.tabs.movimientos.active = false;
      this.tabs.graficas.active = false;
      this.tabs[tab].active = true;
    }
  }
};
</script>

<style>
.tab-enter-active,
.tab-leave-active {
  transition: all 0.2s;
}
.tab-enter-from,
.tab-leave-to {
  opacity: 0;
  transform: translate(0, -10px);
}
</style>
