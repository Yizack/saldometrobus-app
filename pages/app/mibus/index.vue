<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <div id="accordionFlushRutas" class="accordion accordion-flush bg-body-tertiary border rounded mb-2 shadow">
      <div v-for="(tipo, i) in tipos" :key="i" class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapse${i}`" aria-expanded="false" :aria-controls="`flush-collapse${i}`">
            <b>{{ tipo.nombre }}</b>
          </button>
        </h2>
        <div :id="`flush-collapse${i}`" class="accordion-collapse collapse" data-bs-parent="#accordionFlushRutas">
          <div v-for="ruta in tipo.rutas" :key="ruta.route_id">
            <div class="d-flex align-items-center p-2 rutas-mibus" role="button" @click="openRoute(ruta.route_id)">
              <p class="p-2 m-0 text-white rounded small text-center" :style="{ backgroundColor: `#${ruta.route_color}`, minWidth: '3.7rem'} ">{{ ruta.route_short_name }}</p>
              <p class="p-2 m-0">{{ ruta.route_long_name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      tipos: [
        { nombre: t("rutas_corredores"), rutas: MIBUS.getRutas("Corredor") },
        { nombre: t("rutas_troncales"), rutas: MIBUS.getRutas("Troncal") },
        { nombre: t("rutas_complementarias"), rutas: MIBUS.getRutas("Complementaria") }
      ]
    };
  },
  methods: {
    openRoute (route_id) {
      if (CAPACITOR.isOnline()) {
        this.$router.push(`/app/mibus/${route_id}`);
      }
      else {
        this.$toast.show(t("error_conexion"));
      }
    }
  }
};
</script>
