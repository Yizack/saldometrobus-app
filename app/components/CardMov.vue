<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

interface Movimiento {
  id: string;
  movimiento: string;
  fecha: string;
  color: string;
  sign: string;
  monto: string;
  saldo: string;
  transaccion: string;
  lugar: string;
}

const props = defineProps<{
  tarjeta: {
    numero: string;
    nombre: string;
    saldo: string;
    estado: string;
    fecha: string;
    tipo: string;
    movimientos: Movimiento[];
  };
}>();

const current = ref(0);
const currentMov = computed(() => props.tarjeta.movimientos[current.value]);
const showDetails = ref(false);

const tableColumns: TableColumn<Movimiento>[] = [
  {
    accessorKey: "tipo",
    header: t("tipo")
  },
  {
    accessorKey: "fecha",
    header: t("fecha_mov")
  },
  {
    accessorKey: "monto",
    header: t("monto")
  },
  {
    accessorKey: "saldo",
    header: t("saldo")
  }
];

const selectMov = (row: { index: number }) => {
  current.value = row.index;
  showDetails.value = true;
};
</script>

<template>
  <div>
    <h4 class="text-center text-xl mb-4 font-bold">{{ t("saldos") }}</h4>
    <UAlert
      description="Debido al cambio reciente en el sistema de cobros de SONDA, Metro de Panamá y MiBus, en este momento no es posible mostrar los movimientos de sus tarjetas. Actualmente estoy investigando una solución para restablecer esta funcionalidad pero no lo puedo garantizar. Recuerde que esta no es una aplicación oficial y es desarrollada de manera independiente."
      color="warning"
      variant="subtle"
    />
    <p>{{ t("mov_4_semanas") }}<span v-if="tarjeta.movimientos.length">. {{ t("mov_note") }}</span></p>
    <UTable
      v-if="tarjeta.movimientos.length"
      :data="tarjeta.movimientos"
      :columns="tableColumns"
      :ui="{
        th: 'p-2 text-xs',
        td: 'tabular-nums p-2 text-xs text-default',
      }"
      @select="(e, row) => selectMov(row)"
    >
      <template #tipo-cell="{ row }">
        {{ row.original.movimiento }}
      </template>
      <template #fecha-cell="{ row }">
        {{ formatFecha(Number(row.original.fecha)) }}
      </template>
      <template #monto-cell="{ row }">
        <span :class="`text-nowrap text-${row.original.color}`">
          <span v-if="row.original.sign">{{ row.original.sign }}</span>
          <span v-else>&nbsp;</span>
          <span>B/. {{ row.original.monto }}</span>
        </span>
      </template>
      <template #saldo-cell="{ row }">
        <span class="text-nowrap">B/. {{ row.original.saldo }}</span>
      </template>
    </UTable>
    <p v-else class="text-center my-4"><i>{{ t("mov_notfound") }}.</i></p>
    <!-- Movimiento Dialog -->
    <UModal v-model:open="showDetails" :title="t('movimiento')">
      <template #body>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p><b>{{ t("tipo") }}</b></p>
              <p>{{ currentMov?.movimiento }}</p>
            </div>
            <div>
              <p><b>{{ t("fecha_mov") }}</b></p>
              <p>{{ formatFecha(Number(currentMov?.fecha)) }}</p>
            </div>
            <div>
              <p><b>{{ t("monto") }}</b></p>
              <p :class="`text-${currentMov?.color}`">{{ currentMov?.sign }}B/. {{ currentMov?.monto }}</p>
            </div>
            <div>
              <p><b>{{ t("saldo") }}</b></p>
              <p>B/. {{ currentMov?.saldo }}</p>
            </div>
          </div>
          <USeparator />
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p><b>{{ t("operador") }}</b></p>
              <p>{{ currentMov?.transaccion }}</p>
            </div>
            <div>
              <p><b>{{ t("lugar") }}</b></p>
              <p>{{ currentMov?.lugar }}</p>
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
