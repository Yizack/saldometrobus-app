<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { OpenStreetMapProvider } from "leaflet-geosearch";
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <div class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <form @submit.prevent="getDirections()">
        <div class="form-floating position-relative">
          <input v-model="form.origin" class="form-control rounded-top" :placeholder="t('location')" required :disabled="directions.routes.length" @keyup="searchPlace($event.target.value, 'origin')">
          <AutocompleteList v-if="search.origin && !search.destination" :loading="loading" :array="autocomplete" :select="selectResultOrigin" property="label" />
          <label>{{ t("location") }}</label>
        </div>
        <div class="form-floating position-relative">
          <input v-model="form.destination" class="form-control rounded-top-0" :placeholder="t('destino')" required :disabled="directions.routes.length" @keyup="searchPlace($event.target.value, 'destination')">
          <AutocompleteList v-if="search.destination && !search.origin" :loading="loading" :array="autocomplete" :select="selectResultDestination" property="label" />
          <label>{{ t("destino") }}</label>
        </div>
        <div class="d-grid mt-2">
          <button class="btn btn-primary" type="submit">{{ directions.routes.length ? t("nueva_busqueda") : t("buscar") }}</button>
        </div>
      </form>
    </div>
    <template v-if="directions.routes.length">
      <iframe class="rounded border" :src="`https://www.google.com/maps/embed/v1/directions?origin=place_id:${directions.geocoded_waypoints[0].place_id}&destination=place_id:${directions.geocoded_waypoints[1].place_id}&mode=transit&units=metric&language=${t('lang_code')}&region=pa&key=${apiKey}`" width="100%" height="400px" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
      <div class="d-grid">
        <button class="btn btn-primary mb-2" type="button" @click="CAPACITOR.openBrowser(`https://www.google.com/maps/dir/?api=1&origin=${form.origin}&origin_place_id=${directions.geocoded_waypoints[0].place_id}&destination=${form.destination}&destination_place_id=${directions.geocoded_waypoints[1].place_id}&travelmode=transit`)">{{ t("open_map") }}</button>
      </div>
      <div v-for="(route, route_i) in directions.routes" :key="route_i" class="mb-2" role="button" @click="selectRoute(route_i)">
        <div class="d-flex rutas-mibus bg-body-tertiary border rounded rounded p-2">
          <div v-for="(leg, legs_i) in route.legs" :key="legs_i" class="flex-grow-1">
            <h5 class="fw-bold m-0">{{ leg.departure_time.text }} - {{ leg.arrival_time.text }}</h5>
            <div class="d-flex align-items-center flex-wrap">
              <div v-for="(step, key) in leg.steps" :key="key" class="d-flex align-items-center flex-wrap">
                <template v-if="key < leg.steps.length - 1">
                  <template v-if="step.travel_mode === 'WALKING'">
                    <img class="travel_icon" src="https://maps.gstatic.com/mapfiles/transit/iw2/6/walk.png" width="20" height="20">
                  </template>
                  <template v-if="step.travel_mode === 'TRANSIT'">
                    <div class="d-flex align-items-center flex-wrap">
                      <img class="travel_icon" :src="step.transit.line.vehicle.icon" width="20" height="20">
                      <div v-if="step.transit">
                        <div class="my-2 small">
                          <span class="px-1 rounded shadow-sm" :style="{backgroundColor: step.transit.line.color, color: step.transit.line.text_color }">{{ step.transit.line.short_name }}</span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <Icon v-if="key < leg.steps.length - 2" name="material-symbols:chevron-right" />
                </template>
              </div>
            </div>
          </div>
          <div class="text-end">
            <h4 class="text-primary-emphasis fw-bold m-0">{{ route.legs[0].duration.text }}</h4>
            <p class="small m-0">({{ route.legs[0].distance.text }})</p>
          </div>
        </div>
        <Transition name="t" mode="out-in">
          <div v-if="route_i === selected">
            <div v-for="(leg, legs_i) in route.legs" :key="legs_i" class="bg-body-tertiary rounded border shadow p-3 mt-1">
              <div v-for="(step, key) in leg.steps" :key="key" class="d-flex position-relative">
                <div class="h-100 me-2">
                  <template v-if="key < leg.steps.length - 1">
                    <div v-if="step.travel_mode === 'WALKING'" class="me-2 rounded position-absolute bg-primary" :style="{ width: '10px', left: '3px', bottom: 0, top: '1.5rem', height: 'calc(100% - 1.5rem)' }" />
                    <div v-if="step.travel_mode === 'TRANSIT'" class="me-2 rounded position-absolute" :style="{ backgroundColor: step.transit.line.color || 'var(--border)', width: '10px', left: '3px', bottom: 0, top: '1.5rem', height: 'calc(100% - 1.5rem)' }" />
                  </template>
                  <Icon v-if="key < leg.steps.length - 1" name="ic:outline-circle" />
                  <Icon v-else name="ic:baseline-radio-button-checked" />
                </div>
                <div class="w-100">
                  <div>
                    <div class="fw-bold">{{ step.instructions }}</div>
                    <div class="small">{{ step.duration.text }} ({{ step.distance.text }})</div>
                  </div>
                  <div v-if="step.transit">
                    <div class="my-2 d-flex align-items-center">
                      <div class="p-1 rounded shadow-sm fw-bold me-2" :style="{ backgroundColor: step.transit.line.color, color: step.transit.line.text_color }">{{ step.transit.line.short_name }}</div>
                      <div class="border-start ps-2">
                        <div class="fw-bold">{{ step.transit.line.name }}</div>
                        <div class="small">
                          <p class="m-0">{{ t("departure") }}: {{ step.transit.departure_stop.name }}</p>
                          <p class="m-0">{{ t("arrival") }}: {{ step.transit.arrival_stop.name }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul v-if="step.steps && step.steps.length > 1" class="list-group list-group-flush small pt-2">
                    <li v-for="(in_step, in_key) in step.steps" :key="in_key" class="list-group-item bg-body-tertiary">
                      <!-- eslint-disable-next-line vue/no-v-html -->
                      <div v-html="in_step.instructions" />
                      <div class="small"> ({{ in_step.distance.text }})</div>
                    </li>
                  </ul>
                  <hr v-if="key < leg.steps.length - 1">
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </template>
    <div class="text-center mt-3">
      <p class="small m-0"><small>{{ t("aviso_dir") }}</small></p>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      apiKey: "",
      form: {
        origin: "",
        destination: ""
      },
      directions: {
        geocoded_waypoints: [],
        routes: []
      },
      selected: null,
      provider: new OpenStreetMapProvider({
        params: {
          countrycodes: "pa", // limit search results to Panama
          email: Auth().user.email
        }
      }),
      search: {
        origin: false,
        destination: false
      },
      autocomplete: [],
      debounce: null,
      loading: false
    };
  },
  methods: {
    selectResultOrigin (result) {
      this.selectResult(result, "origin");
    },
    selectResultDestination (result) {
      this.selectResult(result, "destination");
    },
    selectResult (result, field) {
      this.form[field] = result.label;
      this.search[field] = false;
    },
    searchPlace (input, field) {
      Object.keys(this.search).forEach((key) => {
        this.search[key] = key === field;
      });
      this.loading = true;
      if (this.debounce) {
        clearTimeout(this.debounce);
        this.debounce = null;
      }
      if (input) {
        this.debounce = setTimeout(async () => {
          this.autocomplete = await this.provider.search({ query: input });
          this.loading = false;
        }, 2000);
      }
      else {
        this.autocomplete = [];
        this.search[field] = false;
        this.loading = false;
      }
    },
    async getDirections () {
      if (CAPACITOR.isOnline()) {
        if (!this.directions.routes.length) {
          this.apiKey = !this.apiKey ? await API.googleKey() : this.apiKey;
          this.form.origin = this.form.origin.trim();
          this.form.destination = this.form.destination.trim();

          const loader = new Loader({
            apiKey: this.apiKey,
            version: "weekly"
          });

          try {
            const google = await loader.load();
            const directionsService = new google.maps.DirectionsService();
            const options = {
              origin: this.form.origin,
              destination: this.form.destination,
              travelMode: "TRANSIT",
              unitSystem: google.maps.UnitSystem.METRIC,
              region: "pa",
              provideRouteAlternatives: true,
              language: t("lang_code")
            };

            directionsService.route(options, (response, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.directions = response;
              }
              else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
                CAPACITOR.showToast(t("no_direcciones"));
              }
            });
          }
          catch {
            CAPACITOR.showToast(t("error"));
          }
        }
        else {
          this.form.origin = "";
          this.form.destination = "";
          this.directions.routes = [];
          this.directions.geocoded_waypoints = [];
        }
      }
      else {
        CAPACITOR.showToast(t("error_conexion"));
      }
    },
    selectRoute (route_i) {
      this.selected = this.selected !== route_i ? route_i : null;
    }
  }
};
</script>
