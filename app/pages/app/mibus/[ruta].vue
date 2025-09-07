<script setup lang="ts">
definePageMeta({ layout: "main" });

const ruta = computed(() => {
  const { params } = useRoute("app-mibus-ruta");
  return MIBUS.getRuta(params.ruta)!;
});
</script>

<template>
  <section>
    <h4 class="text-center p-2 text-white rounded shadow" :style="{ backgroundColor: `#${ruta.route_color}` }"><b>{{ ruta.route_short_name }}</b></h4>
    <BoxComponent :title="t('info_ruta')">
      <div class="row row-gap-3">
        <div class="col-12">
          <p class="m-0"><b>{{ t("nombre") }}</b></p>
          <p class="m-0">{{ ruta.route_long_name }}</p>
        </div>
        <div class="col-6">
          <p class="m-0"><b>{{ t("id") }}</b></p>
          <p class="m-0">{{ ruta.route_id }}</p>
        </div>
        <div class="col-6">
          <p class="m-0"><b>{{ t("direccion") }}</b></p>
          <p class="m-0">{{ ruta.route_type }}</p>
        </div>
        <div class="col-6">
          <p class="m-0"><b>{{ t("tipo") }}</b></p>
          <p class="m-0">{{ ruta.type }}</p>
        </div>
        <div class="col-6">
          <p class="m-0"><b>{{ t("axis") }}</b></p>
          <p class="m-0">{{ ruta.axis }}</p>
        </div>
      </div>
    </BoxComponent>
    <iframe class="rounded border-0 shadow" :src="`https://saldometrobus-app.yizack.com/_mibus/maps/${ruta.route_id}.html`" width="100%" height="500px" loading="lazy" allowfullscreen />
  </section>
</template>
