<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

definePageMeta({ layout: "main" });

const buscar = ref({ input: "", results: [] });
const tipos = [
  { nombre: t("rutas_corredores"), rutas: MIBUS.getRutas("Corredor") },
  { nombre: t("rutas_troncales"), rutas: MIBUS.getRutas("Troncal") },
  { nombre: t("rutas_complementarias"), rutas: MIBUS.getRutas("Complementaria") }
];

const tiposFiltered = computed(() => {
  if (!buscar.value.input) {
    return tipos;
  }

  const filterRuta = (rutas: typeof tipos[number]["rutas"]) => {
    const busqueda = String(buscar.value.input).trim().toLowerCase();
    return rutas.filter((ruta) => {
      const wordsMatch = busqueda.split(" ").map(str => String(ruta.route_long_name.toLowerCase()).includes(str)).every(Boolean);
      const idMatch = String(ruta.route_short_name.toLowerCase()).includes(busqueda);
      return wordsMatch || idMatch;
    });
  };

  return tipos.map((tipo) => {
    const rutas = filterRuta(tipo.rutas);
    return { ...tipo, rutas };
  });
});

const openRoute = async (route_id: string) => {
  if (import.meta.dev || await CAPACITOR.isOnline()) {
    navigateTo(`/app/mibus/${route_id}`);
  }
  else {
    CAPACITOR.showToast(t("error_conexion"));
  }
};

const items = computed<AccordionItem[]>(() => {
  return tiposFiltered.value.map(tipo => ({
    label: tipo.nombre,
    rutas: tipo.rutas
  }));
});

const openItems = ref<string[]>([]);

watch(() => buscar.value.input, () => {
  openItems.value = buscar.value.input ? tiposFiltered.value.map(tipo => tipo.nombre) : [];
});
</script>

<template>
  <UContainer class="py-2 space-y-2">
    <InputFloating id="search" icon="search" :placeholder="t('buscar')" @keyup="buscar.input = $event.target.value" />
    <UAccordion
      v-model="openItems"
      type="multiple"
      value-key="label"
      :items="items"
      :ui="{
        trigger: 'font-bold px-3',
        root: 'rounded-lg border border-default shadow',
      }"
    >
      <template #content="{ item: tipo }">
        <template v-if="tipo.rutas.length">
          <div v-for="ruta in tipo.rutas" :key="ruta.route_id" class="border-t border-default px-4 py-3 hover:bg-elevated">
            <div class="flex items-center" @click="openRoute(ruta.route_id)">
              <p
                class="p-2 text-white rounded-lg text-center shadow text-sm"
                :style="{ backgroundColor: `#${ruta.route_color}`, minWidth: '3.7rem' } "
              >
                {{ ruta.route_short_name }}
              </p>
              <div class="p-2">
                <p class="text-muted text-sm">{{ ruta.route_type }}</p>
                <p class="font-bold">{{ ruta.route_long_name }}</p>
              </div>
            </div>
          </div>
        </template>
        <p v-else class="p-2 text-muted text-sm text-center">{{ t("results_notfound") }}</p>
      </template>
    </UAccordion>
    <div class="text-center mt-3">
      <p class="text-sm">{{ t("mibus_info") }}: <a class="text-primary font-bold" href="https://www.mibus.com.pa/red-de-rutas/" target="_blank">mibus.com.pa/red-de-rutas/</a></p>
    </div>
  </UContainer>
</template>
