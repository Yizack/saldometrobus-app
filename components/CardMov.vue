<template>
  <div>
    <h4 class="text-center py-2"><b>{{ STRINGS.get("saldos") }}</b></h4>
    <p class="m-0">{{ STRINGS.get("mov_4_semanas") }}</p>
    <div class="table-responsive">
      <table v-if="tarjeta.movimientos.length > 0" class="table table-hover shadow small bg-body-tertiary">
        <thead>
          <tr class="bg-primary text-white small">
            <th scope="col">{{ STRINGS.get("tipo") }}</th>
            <th scope="col">{{ STRINGS.get("fecha_mov") }}</th>
            <th class="pe-0" />
            <th class="ps-0" scope="col">{{ STRINGS.get("monto") }}</th>
            <th scope="col">{{ STRINGS.get("saldo") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movimiento in tarjeta.movimientos" :key="movimiento.id" class="small" role="button">
            <td>{{ movimiento.movimiento }}</td>
            <td :title="movimiento.fecha" class="text-nowrap">{{ formatFecha(Number(movimiento.fecha)) }}</td>
            <td class="pe-0 text-end" :class="`text-${movimiento.color}`">{{ movimiento.sign }}</td>
            <td class="ps-0 text-nowrap ps-0" :class="`text-${movimiento.color}`">B/. {{ movimiento.monto }}</td>
            <td class="text-nowrap">B/. {{ movimiento.saldo }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center my-4"><i>{{ STRINGS.get("mov_notfound") }}.</i></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovimientosTarjeta",
  props: {
    tarjeta: {
      type: Object,
      required: true
    }
  }
};
</script>
