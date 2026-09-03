<script setup lang="ts">
definePageMeta({ layout: "main" });

const { params } = useRoute("app-mibus-ruta");

const ruta = computed(() => {
  return MIBUS.getRuta(params.ruta)!;
});
</script>

<template>
  <UContainer class="py-2 space-y-2">
    <h4 class="text-center p-2 text-white rounded-lg shadow" :style="{ backgroundColor: `#${ruta.route_color}` }"><b>{{ ruta.route_short_name }}</b></h4>
    <BoxComponent :title="t('info_ruta')">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <p><b>{{ t("nombre") }}</b></p>
          <p>{{ ruta.route_long_name }}</p>
        </div>
        <div class="col-span-1">
          <p><b>{{ t("id") }}</b></p>
          <p>{{ ruta.route_id }}</p>
        </div>
        <div class="col-span-1">
          <p><b>{{ t("direccion") }}</b></p>
          <p>{{ ruta.route_type }}</p>
        </div>
        <div class="col-span-1">
          <p><b>{{ t("tipo") }}</b></p>
          <p>{{ ruta.type }}</p>
        </div>
        <div class="col-span-1">
          <p><b>{{ t("axis") }}</b></p>
          <p>{{ ruta.axis }}</p>
        </div>
      </div>
    </BoxComponent>
    <iframe class="rounded-lg border-0 shadow" :src="`https://saldometrobus-app.yizack.com/_mibus/maps/${ruta.route_id}.html`" width="100%" height="500px" loading="lazy" allowfullscreen />
  </UContainer>
</template>
