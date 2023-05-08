<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <h4 class="text-center p-2 text-white rounded shadow" :style="{ backgroundColor: `#${ruta.route_color}` }"><b>{{ ruta.route_short_name }}</b></h4>
    <div class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ t("info_ruta") }}</b></h4>
      <div class="p-2">
        <div class="row">
          <div class="col-12">
            <p class="m-0"><b>{{ t("nombre") }}</b></p>
            <p>{{ ruta.route_long_name }}</p>
          </div>
          <div class="col-6">
            <p class="m-0"><b>{{ t("id") }}</b></p>
            <p>{{ ruta.route_id }}</p>
          </div>
          <div class="col-6">
            <p class="m-0"><b>{{ t("direccion") }}</b></p>
            <p>{{ ruta.route_type }}</p>
          </div>
          <div class="col-6">
            <p class="m-0"><b>{{ t("tipo") }}</b></p>
            <p>{{ ruta.type }}</p>
          </div>
          <div class="col-6">
            <p class="m-0"><b>{{ t("axis") }}</b></p>
            <p>{{ ruta.axis }}</p>
          </div>
        </div>
      </div>
    </div>
    <iframe class="rounded border-0 shadow" :src="`https://saldometrobus-app.yizack.com/_mibus/maps/${ruta.route_id}.html`" width="100%" height="500px" loading="lazy" allowfullscreen />
  </section>
</template>

<script>
export default {
  data () {
    return {
      ruta: MIBUS.getRuta(this.$route.params.ruta)
    };
  }
};
</script>
