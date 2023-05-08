<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <div class="input-group mb-2 rounded shadow-sm">
      <span class="text-primary-emphasis input-group-text border border-end-0">
        <Icon name="search" width="1rem" height="1rem" />
      </span>
      <div class="form-floating mb">
        <input class="form-control bg-body-tertiary rounded-end border border-start-0 shadow-none" type="text" :placeholder="t('buscar')" @keyup="buscar.input = $event.target.value">
        <label>{{ t("buscar") }}</label>
      </div>
    </div>
    <div id="accordionFlushRutas" class="accordion accordion-flush bg-body-tertiary border rounded shadow">
      <div v-for="(tipo, i) in tiposFiltered" :key="i" class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" :class="{'collapsed': !buscar.input}" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapse${i}`" :aria-expanded="Boolean(buscar.input)" :aria-controls="`flush-collapse${i}`">
            <b>{{ tipo.nombre }}</b>
          </button>
        </h2>
        <div :id="`flush-collapse${i}`" class="accordion-collapse collapse" :class="{'show': buscar.input}">
          <div v-if="tipo.rutas.length === 0" class="text-center p-2 border-top">
            <p class="m-0">{{ t("results_notfound") }}</p>
          </div>
          <div v-for="ruta in tipo.rutas" :key="ruta.route_id" class="border-top">
            <div class="d-flex align-items-center p-2 rutas-mibus" role="button" @click="openRoute(ruta.route_id)">
              <p class="p-2 m-0 text-white rounded small text-center fw-bold shadow-sm" :style="{ backgroundColor: `#${ruta.route_color}`, minWidth: '3.7rem'} ">{{ ruta.route_short_name }}</p>
              <div class="p-2">
                <p class="text-muted mb-0"><small>{{ ruta.route_type }}</small></p>
                <p class="mb-0 fw-bold">{{ ruta.route_long_name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <p class="small m-0"><small>{{ t("mibus_info") }}: <a class="text-primary fw-bold" href="https://www.mibus.com.pa/red-de-rutas/" target="_blank">mibus.com.pa/red-de-rutas/</a></small></p>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      buscar: {
        input: "",
        results: []
      },
      tipos: [
        { nombre: t("rutas_corredores"), rutas: MIBUS.getRutas("Corredor") },
        { nombre: t("rutas_troncales"), rutas: MIBUS.getRutas("Troncal") },
        { nombre: t("rutas_complementarias"), rutas: MIBUS.getRutas("Complementaria") }
      ]
    };
  },
  computed: {
    tiposFiltered () {
      if (!this.buscar.input) {
        return this.tipos;
      }

      const filterRuta = (rutas) => {
        const busqueda = String(this.buscar.input).trim().toLowerCase();
        return rutas.filter((ruta) => {
          const wordsMatch = busqueda.split(" ").map(str => String(ruta.route_long_name.toLowerCase()).includes(str)).every(Boolean);
          const idMatch = String(ruta.route_short_name.toLowerCase()).includes(busqueda);
          return wordsMatch || idMatch;
        });
      };

      const tipos = this.tipos.map((tipo) => {
        const rutas = filterRuta(tipo.rutas);
        return { ...tipo, rutas };
      });
      return tipos;
    }
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
