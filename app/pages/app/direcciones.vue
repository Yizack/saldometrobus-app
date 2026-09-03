<script setup>
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { OpenStreetMapProvider } from "leaflet-geosearch";

definePageMeta({ layout: "main" });
</script>

<template>
  <UContainer class="space-y-2 py-2">
    <form class="space-y-2" @submit.prevent="getDirections">
      <div class="relative space-y-1">
        <div class="relative">
          <InputFloating
            id="origin"
            v-model="form.origin"
            icon="location"
            class="w-full"
            :placeholder="t('location')"
            required
            :disabled="Boolean(directions.routes.length)"
            @keyup="searchPlace($event.target.value, 'origin')"
          />
          <AutocompleteList
            v-if="search.origin && !search.destination"
            :text="form.origin"
            :loading="loading"
            :array="autocomplete"
            prop="label"
            @select="selectResult($event, 'origin')"
          />
        </div>
        <div class="relative">
          <InputFloating
            id="destination"
            v-model="form.destination"
            icon="destination"
            class="w-full"
            :placeholder="t('destino')"
            required
            :disabled="Boolean(directions.routes.length)"
            @keyup="searchPlace($event.target.value, 'destination')"
          />
          <AutocompleteList
            v-if="search.destination && !search.origin"
            :text="form.destination"
            :loading="loading"
            :array="autocomplete"
            prop="label"
            @select="selectResult($event, 'destination')"
          />
        </div>
        <Transition name="fade">
          <UButton
            v-if="!search.origin && !search.destination && !directions.routes.length"
            type="button"
            icon="sort"
            size="xl"
            class="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-s-full ps-3 shadow bg-primary!"
            :aria-label="t('intercambiar_direcciones')"
            :title="t('intercambiar_direcciones')"
            @click="swapDirections"
          />
        </Transition>
      </div>
      <UButton
        type="submit"
        block
        :loading="submit"
        :label="submit ? ' ' :directions.routes.length ? t('nueva_busqueda') : t('buscar')"
      />
    </form>
    <template v-if="directions.routes.length">
      <iframe class="block h-100 w-full rounded-lg border-0 shadow-sm" :src="`https://www.google.com/maps/embed/v1/directions?origin=place_id:${directions.geocoded_waypoints[0].place_id}&destination=place_id:${directions.geocoded_waypoints[1].place_id}&mode=transit&units=metric&language=${t('lang_code')}&region=pa&key=${CONST.mapsEmbedKey}`" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
      <UButton
        class="mb-2"
        type="button"
        block
        :label="t('open_map')"
        @click="CAPACITOR.openBrowser(`https://www.google.com/maps/dir/?api=1&origin=${form.origin}&origin_place_id=${directions.geocoded_waypoints[0].place_id}&destination=${form.destination}&destination_place_id=${directions.geocoded_waypoints[1].place_id}&travelmode=transit`)"
      />
      <div
        v-for="(route, route_i) in directions.routes"
        :key="route_i"
        role="button"
        tabindex="0"
        class="space-y-1"
      >
        <UCollapsible class="space-y-1">
          <template #default="{ open }">
            <div
              class="flex items-start gap-3 rounded-lg border border-default p-3 shadow-sm transition-colors hover:bg-muted"
              :class="{ 'border-primary': open }"
            >
              <div v-for="(leg, legs_i) in route.legs" :key="legs_i" class="min-w-0 flex-1">
                <h2 v-if="leg.steps.length > 1" class="font-bold">{{ leg.departure_time.text }} - {{ leg.arrival_time.text }}</h2>
                <h2 v-else class="font-bold">{{ getCurrentHourAndMinute }} - {{ addSecondsToHourAndMinute(route.legs[0].duration.value) }}</h2>
                <div class="flex flex-wrap items-center gap-1">
                  <div v-for="(step, key) in leg.steps" :key="key" class="flex flex-wrap items-center gap-1">
                    <template v-if="key < leg.steps.length - 1 || leg.steps.length === 1">
                      <template v-if="step.travel_mode === 'WALKING'">
                        <img class="size-5 shrink-0 object-contain" src="https://maps.gstatic.com/mapfiles/transit/iw2/6/walk.png" width="20" height="20">
                      </template>
                      <template v-if="step.travel_mode === 'TRANSIT'">
                        <div class="flex flex-wrap items-center gap-1">
                          <img class="size-5 shrink-0 object-contain" :src="step.transit.line.vehicle.icon" width="20" height="20">
                          <div v-if="step.transit" class="my-1 text-xs">
                            <span class="rounded-full px-1 shadow-sm" :style="{ backgroundColor: step.transit.line.color, color: step.transit.line.text_color }">{{ step.transit.line.short_name }}</span>
                          </div>
                        </div>
                      </template>
                      <Icon v-if="key < leg.steps.length - 2" name="chevron-right" size="1rem" class="text-muted" />
                    </template>
                  </div>
                </div>
              </div>
              <div class="shrink-0 text-right">
                <h3 class="text-lg font-bold text-primary">{{ route.legs[0].duration.text }}</h3>
                <p class="text-xs text-muted">({{ route.legs[0].distance.text }})</p>
              </div>
            </div>
          </template>
          <template #content>
            <div class="space-y-2">
              <div v-for="(leg, legs_i) in route.legs" :key="legs_i" class="rounded-lg border border-primary p-3 shadow-sm sm:p-4">
                <div v-for="(step, key) in leg.steps" :key="key" class="flex">
                  <div class="relative mr-2 shrink-0">
                    <template v-if="key < leg.steps.length - 1">
                      <div v-if="step.travel_mode === 'WALKING'" class="absolute bottom-0 left-0.75 top-5 w-2.5 rounded-lg bg-primary" :style="{ height: 'calc(100% - 1.5rem)' }" />
                      <div v-if="step.travel_mode === 'TRANSIT'" class="absolute bottom-0 left-0.75 top-5 w-2.5 rounded-lg" :style="{ backgroundColor: step.transit.line.color || 'var(--ui-border)', height: 'calc(100% - 1.5rem)' }" />
                    </template>
                    <Icon v-if="key < leg.steps.length - 1" name="step" size="1rem" class="relative z-1" />
                    <Icon v-else name="step-end" size="1rem" class="relative z-1" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div>
                      <div class="font-bold">{{ step.instructions }}</div>
                      <div class="text-xs text-muted">{{ step.duration.text }} ({{ step.distance.text }})</div>
                    </div>
                    <div v-if="step.transit">
                      <div class="my-2 flex items-center">
                        <div class="mr-2 rounded-lg p-1 font-bold shadow-sm text-sm" :style="{ backgroundColor: step.transit.line.color, color: step.transit.line.text_color }">{{ step.transit.line.short_name }}</div>
                        <div class="border-l border-default pl-2">
                          <div class="font-bold">{{ step.transit.line.name }}</div>
                          <div class="text-xs text-muted">
                            <p>{{ t("departure") }}: {{ step.transit.departure_stop.name }}</p>
                            <p>{{ t("arrival") }}: {{ step.transit.arrival_stop.name }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul v-if="step.steps && step.steps.length > 1" class="mt-2 space-y-1 border-t border-default pt-2 text-sm">
                      <li v-for="(in_step, in_key) in step.steps" :key="in_key" class="border-b border-default pb-1 last:border-b-0">
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div v-html="in_step.instructions" />
                        <div class="text-xs text-muted">({{ in_step.distance.text }})</div>
                      </li>
                    </ul>
                    <div v-if="key < leg.steps.length - 1" class="my-3 border-t border-default" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </UCollapsible>
      </div>
    </template>
    <div class="mt-3 text-center">
      <p class="text-sm text-muted">{{ t("aviso_dir") }}</p>
    </div>
  </UContainer>
</template>

<script>
export default {
  data () {
    return {
      apiKey: useRuntimeConfig().public.google.apiKey,
      form: {
        origin: "",
        destination: ""
      },
      directions: {
        geocoded_waypoints: [],
        routes: []
      },
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
      loading: false,
      submit: false,
      currentHourTime: null
    };
  },
  computed: {
    getCurrentHourAndMinute () {
      this.currentHourTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      return this.currentHourTime;
    }
  },
  methods: {
    selectResult (result, field) {
      this.form[field] = result.label === this.form[field].trim() ? `${result.label}, ${t("panama")}` : result.label;
      this.search[field] = false;
    },
    searchPlace (input, field) {
      Object.keys(this.search).forEach((key) => {
        const current = key === field;
        this.search[key] = current;
        if (current) {
          this.form[key] = input;
        }
      });
      this.loading = true;
      if (this.debounce) {
        clearTimeout(this.debounce);
        this.debounce = null;
      }
      if (input) {
        this.debounce = setTimeout(async () => {
          try {
            this.autocomplete = await this.provider.search({ query: input });
            this.loading = false;
          }
          catch {
            CAPACITOR.showToast(t("error"));
            this.search[field] = false;
          }
        }, 2000);
      }
      else {
        this.autocomplete = [];
        this.search[field] = false;
        this.loading = false;
      }
    },
    async getDirections () {
      this.submit = true;
      if (CAPACITOR.isOnline()) {
        if (!this.directions.routes.length) {
          this.form.origin = this.form.origin.trim();
          this.form.destination = this.form.destination.trim();

          setOptions({ key: this.apiKey, v: "weekly" });

          try {
            const { DirectionsService, DirectionsStatus, TravelMode } = await importLibrary("routes");
            const { UnitSystem } = await importLibrary("core");

            const directionsService = new DirectionsService();
            const options = {
              origin: this.form.origin,
              destination: this.form.destination,
              travelMode: TravelMode.TRANSIT,
              unitSystem: UnitSystem.METRIC,
              region: "pa",
              provideRouteAlternatives: true,
              language: t("lang_code")
            };

            directionsService.route(options, (response, status) => {
              if (status === DirectionsStatus.OK) {
                this.directions = response;
              }
              else if (status === DirectionsStatus.ZERO_RESULTS) {
                CAPACITOR.showToast(t("no_direcciones"));
              }
              this.submit = false;
            });
          }
          catch {
            this.submit = false;
            CAPACITOR.showToast(t("error"));
          }
        }
        else {
          this.form.origin = "";
          this.form.destination = "";
          this.directions.routes = [];
          this.directions.geocoded_waypoints = [];
          this.submit = false;
        }
      }
      else {
        CAPACITOR.showToast(t("error_conexion"));
      }
    },
    swapDirections () {
      const origin = this.form.origin;
      this.form.origin = this.form.destination;
      this.form.destination = origin;
    },
    addSecondsToHourAndMinute (seconds) {
      const [h, m] = this.currentHourTime.split(":");
      const d = new Date();
      d.setHours(h);
      d.setMinutes(m);
      d.setSeconds(d.getSeconds() + seconds);
      return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    }
  }
};
</script>
