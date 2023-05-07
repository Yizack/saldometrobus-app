<template>
  <div>
    <h4 class="text-center mt-1 py-2"><b>{{ t("graficas") }}</b></h4>
    <p>{{ t("grafica_nota") }}</p>
    <div class="d-flex align-items-center my-3">
      <span>{{ t("filtrar") }}:</span>
      <div class="d-flex justify-content-evenly flex-grow-1 filters">
        <button v-for="(filter, key) in filters" :key="key" class="btn btn-sm rounded-pill text-nowrap" :class="{ 'active': daysBefore === filter, 'btn-outline-dark': !CONFIG.dark, 'btn-outline-light': CONFIG.dark }" @click="daysBefore = filter">{{ t(key) }}</button>
      </div>
    </div>
    <div v-for="(chart, key) in charts" :key="key" class="bg-body-tertiary border rounded p-2 mb-2 shadow">
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
      filters: {
        d1: 1,
        d7: 7,
        d28: 28
      },
      daysBefore: 28,
      charts: [
        {
          name: "gastos",
          reduce: true,
          monotone: true,
          title: t("grafica_gastos"),
          subtitle: t("gasto_total"),
          color: "danger",
          condition: movimiento => movimiento === t("uso") || movimiento === t("puerta_trasera")
        },
        {
          name: "cambio",
          reduce: false,
          monotone: false,
          title: t("grafica_saldo"),
          subtitle: t("saldo_hasta"),
          stepped: true,
          color: "dark",
          condition: () => true
        },
        {
          name: "cargas",
          reduce: true,
          monotone: true,
          title: t("grafica_recargas"),
          subtitle: t("recarga_total"),
          color: "success",
          condition: movimiento => movimiento === t("carga") || movimiento === t("carga_online")
        }
      ]
    };
  },
  computed: {
    getDaysBefore () {
      const today_timestamp = PanamaDate().getTime();
      const days = [];
      for (let i = this.daysBefore; i > 0; i--) {
        const day = new Date(today_timestamp - timeOffSet - (i * 24 * 60 * 60 * 1000));
        const day_iso = day.toISOString().split("T")[0];
        days.push({ x: day_iso, y: 0 });
      }
      return days;
    },
    get24hours () {
      const days = [];
      for (let i = 0; i < 24; i++) {
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
      const endTime = new Date(template[length - 1].x).getTime();
      const startTime = new Date(template[0].x).getTime();
      let previous_day = { x: "", y: 0 };

      this.tarjeta.movimientos.forEach((tarjeta) => {
        const fecha = new Date(Number(tarjeta.fecha) - timeOffSet).toISOString().split("T")[0];
        const fechaTime = new Date(fecha).getTime();
        const condition = this.charts.find(item => item.name === chart).condition(tarjeta.movimiento);
        const y = chart === "cambio" ? Number(tarjeta.saldo) : Number(tarjeta.monto);
        if (this.daysBefore > 1) {
          if (fechaTime > startTime && fechaTime <= endTime) {
            const condition = this.charts.find(item => item.name === chart).condition(tarjeta.movimiento);
            if (condition) {
              if (chart === "cambio") {
                data.unshift({ x: fecha, y });
              }
              else {
                data.push({ x: fecha, y });
              }
            }
          }
          if (fechaTime < startTime && !previous_day.y && chart === "cambio") {
            if (condition) {
              previous_day = { x: template[0].x, y };
            }
          }
        }
        else if (fecha === this.getDaysBefore[0].x) {
          if (condition) {
            const hour = new Date(Number(tarjeta.fecha)).getHours();
            if (chart === "cambio") {
              data.unshift({ x: String(hour), y });
            }
            else {
              data.push({ x: String(hour), y });
            }
          }
        }
        else if (fecha < this.getDaysBefore[0].x && !previous_day.y && chart === "cambio") {
          if (condition) {
            previous_day = { x: template[0].x, y };
          }
        }
      });

      if (chart === "cambio") {
        if (data.length > 0) {
          if (previous_day.y) {
            data.unshift(previous_day);
          }
          const primero = data[0];
          const ultimo = data[data.length - 1];

          const pad = template.map((item) => {
            const x = this.daysBefore > 1 ? item.x : Number(item.x);
            if (x < primero.x) {
              return { x, y: primero.y };
            }
            else if (x > ultimo.x) {
              return { x, y: ultimo.y };
            }
            else if (x > primero.x) {
              const filler = data.findLast((d) => {
                const dx = this.daysBefore > 1 ? d.x : Number(d.x);
                return dx < x;
              });
              return { x, y: filler.y };
            }
            return { x, y: 0 };
          });
          return pad.concat(data);
        }
        return template.map(item => ({ x: item.x, y: Number(this.tarjeta.saldo) }));
      }
      return template.concat(data);
    },
    render () {
      this.charts.forEach((chart, index) => {
        const ctx = this.$refs.chart[index].getContext("2d");
        const dataset = this.getData(chart.name).map(d => ({ x: this.daysBefore > 1 ? formatFecha(d.x, "chart", CONFIG.lang) : formatHour(d.x), y: d.y }));
        const chart_instance = new Chart(ctx, dataset);
        const theme = CONFIG.dark ? "dark" : "light";
        const colors = CONST.colors;
        chart_instance.render({
          reduce: chart.reduce,
          monotone: chart.monotone,
          title: chart.title,
          subtitle: chart.subtitle,
          stepped: chart.stepped,
          color: colors[theme][chart.color],
          color_area: colors[theme][`${chart.color}_area`],
          text_color: colors[theme].text,
          tick_color: colors[theme].tick
        });
      });
    }
  }
};
</script>
