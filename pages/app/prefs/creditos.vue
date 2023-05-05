<script setup>
definePageMeta({ layout: "back", nav_title: "creditos" });
</script>

<template>
  <section>
    <div v-for="(credito, i) in creditos" :key="i" class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <a :href="credito.link" target="_blank" class="text-decoration-none">
        <h4 class="text-primary-emphasis m-0"><strong>{{ credito.name }}</strong></h4>
      </a>
      <div class="small mx-2">
        <p class="text-muted m-0">{{ t("version") }}: {{ String(credito.version).replace("^", "") }}</p>
        <p class="m-0">{{ credito.description[t("lang_code")] }}.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      creditos: [
        {
          name: "Nuxt.js",
          link: "https://nuxtjs.com",
          description: {
            en: "The Intuitive Vue Framework",
            es: "El Framework Intuitivo de Vue"
          },
          version: CONST.devDependencies.nuxt
        },
        {
          name: "Capacitor.js",
          link: "https://capacitorjs.com",
          description: {
            en: "Build cross-platform Native Progressive Web Apps for iOS, Android, and the Web",
            es: "Construye aplicaciones web progresivas nativas multiplataforma para iOS, Android y la Web"
          },
          version: CONST.devDependencies["@capacitor/core"]
        },
        {
          name: "Bootstrap",
          link: "https://getbootstrap.com",
          description: {
            en: "The world's most popular front-end open source toolkit",
            es: "El kit de herramientas de código abierto más popular del mundo para el desarrollo de front-end"
          },
          version: CONST.dependencies.bootstrap
        },
        {
          name: "Chart.js",
          link: "https://www.chartjs.org",
          description: {
            en: "Simple yet flexible JavaScript charting for designers & developers",
            es: "Gráficos JavaScript simples pero flexibles para diseñadores y desarrolladores"
          },
          version: CONST.dependencies["chart.js"]
        },
        {
          name: "Google Maps JavaScript API Loader",
          link: "https://github.com/googlemaps/js-api-loader",
          description: {
            en: "Create custom maps with the JavaScript Maps API",
            es: "Cree mapas personalizados con la API de JavaScript Maps"
          },
          version: CONST.dependencies["@googlemaps/js-api-loader"]
        },
        {
          name: "Leaflet.GeoSearch",
          link: "https://github.com/smeijer/leaflet-geosearch",
          description: {
            en: "GeoSearch plugin for Leaflet",
            es: "Plugin GeoSearch para Leaflet"
          },
          version: CONST.dependencies["leaflet-geosearch"]
        },
        {
          name: "Pinia: Nuxt",
          link: "https://github.com/vuejs/pinia/tree/v2/packages/nuxt#readme",
          description: {
            en: "Intuitive, type safe, light and flexible Store for Vue using the composition api with DevTools support",
            es: "Store intuitivo, seguro, ligero y flexible para Vue utilizando la API de composición con soporte para DevTools"
          },
          version: CONST.dependencies["@pinia/nuxt"]
        },
        {
          name: "jeep-sqlite",
          link: "https://github.com/jepiqueau/jeep-sqlite",
          description: {
            en: "Stencil component to create SQLite database and query it in the browser",
            es: "Componente Stencil para crear una base de datos SQLite y consultarla en el navegador"
          },
          version: CONST.devDependencies["jeep-sqlite"]
        },
        {
          name: "Capacitor Community: SQLite",
          link: "https://github.com/capacitor-community/sqlite",
          description: {
            en: "Capacitor Community SQLite Plugin",
            es: "Plugin SQLite de la Comunidad Capacitor"
          },
          version: CONST.devDependencies["@capacitor-community/sqlite"]
        },
        {
          name: "Nuxt Icon",
          link: "https://github.com/nuxt-modules/icon",
          description: {
            en: "Nuxt module to easily add icons to your nuxt project",
            es: "Módulo Nuxt para agregar fácilmente iconos a su proyecto nuxt"
          },
          version: CONST.devDependencies["nuxt-icon"]
        }
      ]
    };
  }
};
</script>
