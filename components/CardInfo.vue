<template>
  <div class="text-center py-2">
    <h4><b>{{ tarjeta.nombre }}</b></h4>
  </div>
  <div class="bg-white border rounded p-2 mb-2 shadow text-center">
    <img v-if="tarjeta.tipo === 'Tarjeta Rapipass'" class="img-fluid" src="/images/rapipass_brand.webp" :width="size" :height="size">
    <img v-else-if="tarjeta.tipo === 'Tarjeta Normal'" class="img-fluid" src="/images/metro_metrobus_brand.webp" :width="size" :height="size">
    <img v-else src="/images/metrobus_brand.webp" class="img-fluid" :width="size" :height="size">
    <h3><b>{{ tarjeta.numero }}</b></h3>
  </div>
  <div class="bg-white border rounded p-2 mb-2 shadow">
    <h4 class="text-primary m-0"><b>{{ STRINGS.get("saldo") }}</b></h4>
    <div class="m-2">
      <h3><b>B/. {{ tarjeta.saldo }}</b></h3>
    </div>
  </div>
  <div class="bg-white border rounded p-2 mb-2 shadow">
    <h4 class="text-primary m-0"><b>{{ STRINGS.get("info_tarjeta") }}</b></h4>
    <div class="p-2">
      <div class="row">
        <div class="col-6">
          <p class="m-0"><b>{{ STRINGS.get("numero_tarjeta") }}</b></p>
          <p>{{ tarjeta.numero }}</p>
        </div>
        <div class="col-6">
          <p class=" m-0"><b>{{ STRINGS.get("estado") }}</b></p>
          <p>{{ tarjeta.estado }}</p>
        </div>
        <div class="col-6">
          <p class="m-0"><b>{{ STRINGS.get("fecha") }}</b></p>
          <p>{{ tarjeta.fecha }}</p>
        </div>
        <div class="col-6">
          <p class="m-0"><b>{{ STRINGS.get("tipo_tarjeta") }}</b></p>
          <p>{{ tarjeta.tipo }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white border rounded p-2 mb-2 shadow">
    <h4 class="text-primary m-0"><b>{{ STRINGS.get("balance") }}</b></h4>
    <div class="ms-2">
      <div class="d-flex justify-content-between">
        <h4 class="small"><b>Actual: B/. {{ tarjeta.saldo }}</b></h4>
        <h4 class="small"><b>B/. {{ Number(tarjeta.saldo) > 50 ? tarjeta.saldo : "50.00" }}</b></h4>
      </div>
      <div class="progress" role="progressbar" :aria-label="STRINGS.get('balance')" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" :class="`bg-${color}`" :style="`width: ${percent}%`" />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-6 d-grid pe-1">
      <button class="btn btn-primary btn-block">
        <i class="fas fa-sync-alt" />
        <span class="ms-2">{{ STRINGS.get("editar") }}</span>
      </button>
    </div>
    <div class="col-6 d-grid ps-1">
      <button class="btn btn-danger btn-block">
        <i class="fas fa-sync-alt" />
        <span class="ms-2">{{ STRINGS.get("eliminar") }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationCard",
  props: {
    tarjeta: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      size: 200,
      saldoBar: {
        percent: 0,
        color: ""
      }
    };
  },
  computed: {
    percent () {
      const saldo = Number(this.tarjeta.saldo);
      return (saldo / 50) * 100;
    },
    color () {
      const saldo = Number(this.tarjeta.saldo);
      if (Number(saldo) <= 2) {
        return "danger";
      }
      else if (Number(saldo) > 2 && Number(saldo) < 5) {
        return "warning";
      }
      else {
        return "success";
      }
    }
  }
};
</script>
