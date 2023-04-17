<template>
  <div>
    <h4 class="text-center py-2"><b>{{ t("saldos") }}</b></h4>
    <p class="m-0">{{ t("mov_4_semanas") }}</p>
    <div class="table-responsive">
      <table v-if="tarjeta.movimientos.length > 0" class="table table-hover shadow small">
        <thead class="bg-primary">
          <tr class="text-white small">
            <th scope="col">{{ t("tipo") }}</th>
            <th scope="col">{{ t("fecha_mov") }}</th>
            <th class="pe-0" />
            <th class="ps-0" scope="col">{{ t("monto") }}</th>
            <th scope="col">{{ t("saldo") }}</th>
          </tr>
        </thead>
        <tbody class="bg-body-tertiary">
          <tr v-for="movimiento in tarjeta.movimientos" :key="movimiento.id" class="small" role="button">
            <td>{{ movimiento.movimiento }}</td>
            <td :title="movimiento.fecha" class="text-nowrap">{{ formatFecha(Number(movimiento.fecha)) }}</td>
            <td class="pe-0 text-end" :class="`text-${movimiento.color}`">{{ movimiento.sign }}</td>
            <td class="ps-0 text-nowrap ps-0" :class="`text-${movimiento.color}`">B/. {{ movimiento.monto }}</td>
            <td class="text-nowrap">B/. {{ movimiento.saldo }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-center my-4"><i>{{ t("mov_notfound") }}.</i></p>
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
