<template>
  <div>
    <h4 class="text-center py-2"><b>{{ STRINGS.get("graficas") }}</b></h4>
    <p>*{{ STRINGS.get("grafica_nota") }}</p>
    <div class="d-flex align-items-center my-3">
      <span>{{ STRINGS.get("filtrar") }}:</span>
      <div class="d-flex justify-content-evenly flex-grow-1 filters">
        <button class="btn btn-sm btn-outline-dark rounded-pill text-nowrap" :class="{ active: daysBefore === 1}" @click="daysBefore = 1">{{ STRINGS.get("d1") }}</button>
        <button class="btn btn-sm btn-outline-dark rounded-pill text-nowrap" :class="{ active: daysBefore === 7}" @click="daysBefore = 7">{{ STRINGS.get("d7") }}</button>
        <button class="btn btn-sm btn-outline-dark rounded-pill text-nowrap" :class="{ active: daysBefore === 28}" @click="daysBefore = 28">{{ STRINGS.get("d28") }}</button>
      </div>
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
          color: "danger",
          condition: movimiento => movimiento === "Uso" || movimiento === "Puerta Trasera"
        },
        {
          name: "cambio",
          reduce: false,
          monotone: false,
          title: STRINGS.get("grafica_saldo"),
          subtitle: STRINGS.get("saldo_hasta"),
          stepped: true,
          color: "dark",
          condition: () => true
        },
        {
          name: "cargas",
          reduce: true,
          monotone: true,
          title: STRINGS.get("grafica_recargas"),
          subtitle: STRINGS.get("recarga_total"),
          color: "success",
          condition: movimiento => movimiento === "Carga" || movimiento === "Transacción de Carga de Monedero con #RA"
        }
      ]
    };
  },
  computed: {
    getDaysBefore () {
      const today_timestamp = new Date() - timeOffSet;
      const days = [];
      for (let i = 1; i <= this.daysBefore; i++) {
        const day = new Date(today_timestamp - (i * 24 * 60 * 60 * 1000));
        const day_iso = day.toISOString().split("T")[0];
        days.push({ x: day_iso, y: 0 });
      }
      return days;
    },
    get24hours () {
      const days = [];
      for (let i = 23; i >= 0; i--) {
        days.push({ x: String(i), y: 0 });
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
      const data = [];
      const template = this.daysBefore > 1 ? this.getDaysBefore : this.get24hours;
      const length = template.length;
      const startTime = new Date(template[length - 1].x).getTime();
      const endTime = new Date(template[0].x).getTime();

      this.tarjeta.movimientos.forEach((tarjeta, index) => {
        const fecha = new Date(Number(tarjeta.fecha) - timeOffSet).toISOString().split("T")[0];
        const fechaTime = new Date(fecha).getTime();
        const condition = this.charts.find(item => item.name === chart).condition(tarjeta.movimiento);
        const y = chart === "cambio" ? Number(tarjeta.saldo) : Number(tarjeta.monto);
        if (this.daysBefore > 1) {
          if (fechaTime > startTime && fechaTime <= endTime) {
            const condition = this.charts.find(item => item.name === chart).condition(tarjeta.movimiento);
            if (condition) {
              data.push({ x: fecha, y });
            }
          }
        }
        else if (fecha === this.getDaysBefore[0].x) {
          if (condition) {
            const hour = new Date(Number(tarjeta.fecha)).getHours();
            data.push({ x: String(hour), y });
          }
        }
      });

      if (chart === "cambio") {
        if (data.length > 0) {
          const ultimo = data[0];
          const primero = data[data.length - 1];
          const pad = template.map((item) => {
            if (item.x < primero.x) {
              return { x: item.x, y: primero.y };
            }
            else if (item.x > ultimo.x) {
              return { x: item.x, y: ultimo.y };
            }
            else if (item.x > primero.x) {
              const filler = data.find(d => d.x < item.x);
              return { x: item.x, y: filler.y };
            }
            return { x: item.x, y: 0 };
          });
          return data.concat(pad).reverse();
        }
        return template.map(item => ({ x: item.x, y: Number(this.tarjeta.saldo) }));
      }
      return data.concat(template).reverse();
    },
    render () {
      this.charts.forEach((chart, index) => {
        const ctx = this.$refs.chart[index].getContext("2d");
        const dataset = this.getData(chart.name).map(d => ({ x: this.daysBefore > 1 ? formatFecha(d.x, "chart", "es") : formatHour(d.x), y: d.y }));
        const chart_instance = new Chart(ctx, dataset);
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
