<template>
  <div>
    <h4 class="text-center py-2"><b>{{ STRINGS.get("saldos") }}</b></h4>
    <p class="m-0">{{ STRINGS.get("mov_4_semanas") }}</p>
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
      },
      tipos: {
        uso: {
          text: "Uso",
          translation: STRINGS.get("uso")
        },
        carga: {
          text: "Carga",
          translation: STRINGS.get("carga")
        },
        online: {
          text: "Transacción de Carga de Monedero con #RA",
          translation: STRINGS.get("carga_online")
        },
        trasera: {
          text: "Puerta Trasera",
          translation: STRINGS.get("puerta_trasera")
        }
      }
    };
  },
  mounted () {
    this.tarjeta.movimientos.forEach((mov) => {
      const tipo = mov.movimiento;
      if (tipo === this.tipos.uso.text || tipo === this.tipos.trasera.text) {
        mov.movimiento = tipo === this.tipos.uso.text ? this.tipos.uso.translation : this.tipos.trasera.translation;
        if (Number(mov.monto) > 0) {
          mov.sign = "-";
          mov.color = "danger";
        }
        else {
          mov.color = "warning";
        }
      }
      else if (tipo === this.tipos.carga.text || tipo === this.tipos.online.text) {
        mov.movimiento = tipo === this.tipos.carga.text ? this.tipos.carga.translation : this.tipos.online.translation;
        mov.sign = "+";
        mov.color = "success";
      }
    });
  }
};
</script>
