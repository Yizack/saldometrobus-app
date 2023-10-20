<template>
  <div>
    <h4 class="text-center mt-1 py-2"><b>{{ t("saldos") }}</b></h4>
    <p class="m-0">{{ t("mov_4_semanas") }}<span v-if="tarjeta.movimientos.length">. {{ t("mov_note") }}</span></p>
    <div class="table-responsive">
      <table v-if="tarjeta.movimientos.length" class="table table-hover shadow small">
        <thead class="table-primary">
          <tr class="small">
            <th scope="col">{{ t("tipo") }}</th>
            <th scope="col">{{ t("fecha_mov") }}</th>
            <th class="pe-0" />
            <th class="ps-0" scope="col">{{ t("monto") }}</th>
            <th scope="col">{{ t("saldo") }}</th>
          </tr>
        </thead>
        <tbody class="bg-body-tertiary">
          <tr v-for="(movimiento, i) in tarjeta.movimientos" :key="movimiento.id" class="small" role="button" data-bs-toggle="modal" data-bs-target="#mov-dialog" @click="current = i">
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
    <!-- Movimiento Dialog -->
    <div id="mov-dialog" class="modal fade" tabindex="-1" aria-labelledby="add-dialog-label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="add-dialog-label" class="modal-title fs-5 text-primary-emphasis">
              <strong>{{ t("movimiento") }}</strong>
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div class="modal-body">
            <div class="p-2">
              <div class="row">
                <div class="col-6">
                  <p class="m-0"><b>{{ t("tipo") }}</b></p>
                  <p>{{ tarjeta.movimientos[current]?.movimiento }}</p>
                </div>
                <div class="col-6">
                  <p class=" m-0"><b>{{ t("fecha_mov") }}</b></p>
                  <p>{{ formatFecha(Number(tarjeta.movimientos[current]?.fecha)) }}</p>
                </div>
                <div class="col-6">
                  <p class="m-0"><b>{{ t("monto") }}</b></p>
                  <p :class="`text-${tarjeta.movimientos[current]?.color}`">{{ tarjeta.movimientos[current]?.sign }}{{ tarjeta.movimientos[current]?.monto }}</p>
                </div>
                <div class="col-6">
                  <p class="m-0"><b>{{ t("saldo") }}</b></p>
                  <p>{{ tarjeta.movimientos[current]?.saldo }}</p>
                </div>
                <hr>
                <div class="col-6">
                  <p class="m-0"><b>{{ t("transaccion_n") }}</b></p>
                  <p>{{ tarjeta.movimientos[current]?.transaccion }}</p>
                </div>
                <div class="col-6">
                  <p class="m-0"><b>{{ t("lugar") }}</b></p>
                  <p>{{ tarjeta.movimientos[current]?.lugar }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  },
  data () {
    return {
      current: 0
    };
  }
};
</script>
