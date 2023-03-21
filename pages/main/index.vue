<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <div v-for="tarjeta in tarjetas" :key="tarjeta.numero" class="bg-white border rounded d-flex p-2 mb-2">
      <div class="flex-grow-1">
        <h4 class="text-primary m-0"><b>{{ tarjeta.nombre }}</b></h4>
        <div class="info mx-2 small">
          <p class="m-0">{{ STRINGS.get("numero") }}: {{ tarjeta.numero }}</p>
          <p class="m-0">{{ STRINGS.get("estado") }}: {{ tarjeta.estado }}</p>
          <p class="m-0">{{ STRINGS.get("tipo") }}: {{ tarjeta.tipo }}</p>
          <p class="m-0">{{ STRINGS.get("fecha") }}: {{ tarjeta.fecha_uso }}</p>
          <h3><b>{{ STRINGS.get("saldo") }}: B/. {{ tarjeta.saldo }}</b></h3>
        </div>
      </div>
      <div class="actions">
        <div class="image">
          <img v-if="tarjeta.tipo === 'Tarjeta Rapipass'" class="img-fluid" src="/images/rapipass.webp" :width="size" :height="size">
          <img v-else-if="tarjeta.tipo === 'Tarjeta Normal al Portador b'" class="img-fluid" src="/images/metro_metrobus.webp" :width="size" :height="size">
          <img v-else src="/images/metrobus.webp" class="img-fluid" :width="size" :height="size">
        </div>
        <div class="d-grid gap-2">
          <a class="btn btn-primary"><Icon name="material-symbols:refresh" /></a>
        </div>
      </div>
    </div>
    {{ db }}
  </section>
</template>

<script>
export default {
  name: "MainPage",
  data () {
    return {
      tarjetas: {},
      size: 100,
      db: []
    };
  },
  async mounted () {
    const { email, token } = AUTH.user;
    this.tarjetas = await API.getDetallesTarjetas({ email, token });
    this.db = await DB.getTarjetas();
  }
};
</script>
