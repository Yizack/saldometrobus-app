<template>
  <div>
    <h4 class="text-center py-2"><b>{{ STRINGS.get("graficas") }}</b></h4>
    <div class="d-flex justify-content-evenly my-2 align-items-center">
      <span class="small">{{ STRINGS.get("filtrar") }}:</span>
      <button class="btn btn-sm btn-outline-dark rounded-pill" @click="daysBefore = 1">1 day</button>
      <button class="btn btn-sm btn-outline-dark rounded-pill" @click="daysBefore = 7">7 days</button>
      <button class="btn btn-sm btn-outline-dark rounded-pill" @click="daysBefore = 28">28 days</button>
    </div>
    <div v-for="(chart, key) in charts" :key="key" class="bg-white border rounded p-2 mb-2 shadow">
      <canvas ref="chart" class="my-2 w-100" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tarjeta: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dataset: {
        gastos: []
      },
      daysBefore: 28,
      charts: [
        {
          name: "gastos",
          reduce: true,
          monotone: true,
          title: STRINGS.get("grafica_gastos"),
          subtitle: STRINGS.get("gasto_total"),
          color: "danger"
        },
        {
          name: "cambio",
          reduce: false,
          monotone: false,
          title: STRINGS.get("grafica_saldo"),
          subtitle: STRINGS.get("saldo_hasta"),
          stepped: true,
          color: "dark"
        },
        {
          name: "cargas",
          reduce: true,
          monotone: true,
          title: STRINGS.get("grafica_recargas"),
          subtitle: STRINGS.get("recarga_total"),
          color: "success"
        }
      ],
      conditions: {
        gastos (movimiento) {
          return movimiento === "Uso" || movimiento === "Puerta Trasera";
        },
        cargas (movimiento) {
          return movimiento === "Carga" || movimiento === "Transacción de Carga de Monedero con #RA";
        },
        cambio () {
          return true;
        }
      }
    };
  },
  computed: {
    daysBeforeToday () {
      const today = new Date();
      const today_iso = today.toISOString().split("T")[0];
      const today_timestamp = today.getTime();
      const days = [];
      for (let i = 0; i <= this.daysBefore; i++) {
        const day = new Date(today_timestamp - (i * 24 * 60 * 60 * 1000));
        const day_iso = day.toISOString().split("T")[0];
        if (day_iso !== today_iso) {
          days.push({ x: day_iso, y: 0 });
        }
      }
      return days;
    }
  },
  watch: {
    daysBefore () {
      Chart.destroyAll();
      this.render();
    }
  },
  mounted () {
    this.render();
  },
  methods: {
    getData (chart) {
      const map = [];

      this.tarjeta.movimientos.forEach((tarjeta) => {
        const fecha = new Date(Number(tarjeta.fecha) - timeOffSet).toISOString().split("T")[0];
        const fechaTime = new Date(fecha).getTime();
        const startTime = new Date(this.daysBeforeToday[this.daysBefore - 1].x).getTime();
        const endTime = new Date(this.daysBeforeToday[0].x).getTime();

        if (fechaTime > startTime && fechaTime <= endTime) {
          if (this.conditions[chart](tarjeta.movimiento)) {
            const y = chart === "cambio" ? Number(tarjeta.saldo) : Number(tarjeta.monto);
            map.push({ x: fecha, y });
          }
        }
      });

      if (chart === "cambio") {
        if (map.length > 0) {
          const ultimo = map[0];
          const primero = map[map.length - 1];
          const pad = this.daysBeforeToday.map((item) => {
            if (new Date(item.x).getTime() >= new Date(ultimo.x).getTime()) {
              return { x: item.x, y: ultimo.y };
            }
            else {
              return { x: item.x, y: primero.y };
            }
          });
          return map.concat(pad).reverse();
        }
        else {
          return this.daysBeforeToday;
        }
      }
      else {
        return map.concat(this.daysBeforeToday).reverse();
      }
    },
    render () {
      this.charts.forEach((chart, index) => {
        const ctx = this.$refs.chart[index].getContext("2d");
        const chart_instance = new Chart(ctx, this.getData(chart.name));
        chart_instance.render({
          reduce: chart.reduce,
          monotone: chart.monotone,
          title: chart.title,
          subtitle: chart.subtitle,
          stepped: chart.stepped,
          color: colors.light[chart.color],
          color_area: colors.light[`${chart.color}_area`]
        });
      });
    }
  }
};
</script>
