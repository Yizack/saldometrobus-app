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
        <p class="m-0">{{ credito.description }}</p>
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
          description: "The Intuitive Vue Framework",
          version: CONST.devDependencies.nuxt
        },
        {
          name: "Capacitor.js",
          link: "https://capacitorjs.com",
          description: "Build cross-platform Native Progressive Web Apps for iOS, Android, and the Web",
          version: CONST.devDependencies["@capacitor/core"]
        },
        {
          name: "Bootstrap",
          link: "https://getbootstrap.com",
          description: "The world's most popular front-end open source toolkit",
          version: CONST.dependencies.bootstrap
        },
        {
          name: "Chart.js",
          link: "https://www.chartjs.org",
          description: "Simple yet flexible JavaScript charting for designers & developers",
          version: CONST.dependencies["chart.js"]
        },
        {
          name: "Google Maps JavaScript API Loader",
          link: "https://github.com/googlemaps/js-api-loader",
          description: "Create custom maps with the JavaScript Maps API",
          version: CONST.dependencies["@googlemaps/js-api-loader"]
        },
        {
          name: "Leaflet.GeoSearch",
          link: "https://github.com/smeijer/leaflet-geosearch",
          description: "GeoSearch plugin for Leaflet",
          version: CONST.dependencies["leaflet-geosearch"]
        },
        {
          name: "Pinia: Nuxt",
          link: "https://github.com/vuejs/pinia/tree/v2/packages/nuxt#readme",
          description: "Intuitive, type safe, light and flexible Store for Vue using the composition api with DevTools support",
          version: CONST.dependencies["@pinia/nuxt"]
        },
        {
          name: "jeep-sqlite",
          link: "https://github.com/jepiqueau/jeep-sqlite",
          description: "Stencil component to create SQLite database and query it in the browser",
          version: CONST.devDependencies["jeep-sqlite"]
        },
        {
          name: "Capacitor Community: SQLite",
          link: "https://github.com/capacitor-community/sqlite",
          description: "Capacitor Community SQLite Plugin",
          version: CONST.devDependencies["@capacitor-community/sqlite"]
        },
        {
          name: "Nuxt Icon",
          link: "https://github.com/nuxt-modules/icon",
          description: "Nuxt module to easily add icons to your nuxt project",
          version: CONST.devDependencies["nuxt-icon"]
        }
      ]
    };
  }
};
</script>
