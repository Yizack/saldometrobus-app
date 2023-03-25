<template>
  <div class="text-center">
    <h4><b>{{ STRINGS.get("saldos") }}</b></h4>
  </div>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">
          <p><b>{{ STRINGS.get("tipo") }}</b></p>
        </th>
        <th scope="col">
          <p><b>{{ STRINGS.get("fecha_mov") }}</b></p>
        </th>
        <th scope="col">
          <p><b>{{ STRINGS.get("monto") }}</b></p>
        </th>
        <th scope="col">
          <p><b>{{ STRINGS.get("saldo") }}</b></p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movimiento in tarjeta.movimientos" :key="movimiento.id">
        <td>{{ movimiento.movimiento }}</td>
        <td>{{ formatFecha(Number(movimiento.fecha)) }}</td>
        <td>B/. {{ movimiento.monto }}</td>
        <td>B/. {{ movimiento.saldo }}</td>
      </tr>
    </tbody>
  </table>
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
  }
};
</script>
