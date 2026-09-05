<script setup lang="ts">
definePageMeta({ layout: "main" });

const tarjeta = ref({} as any);

const numero = useRoute().params.tarjeta;
tarjeta.value = await DB.getTarjeta(numero);
tarjeta.value.movimientos = await DB.getMovimientos(numero);

const tabs = [
  {
    label: t("informacion"),
    icon: "card",
    slot: "card"
  },
  {
    label: t("movimientos"),
    icon: "list",
    slot: "movimientos"
  },
  {
    label: t("graficas"),
    icon: "graph",
    slot: "graficas"
  }
];
</script>

<template>
  <UMain>
    <UTabs
      :items="tabs"
      :ui="{
        root: 'gap-0',
        leadingIcon: 'size-6',
        list: 'justify-around sticky top-16 py-2 shadow border border-default z-1 rounded-none',
        indicator: 'rounded-xl',
        trigger: 'grow flex-col gap-1 py-1',
        label: 'uppercase text-[10px]/3',
      }"
    >
      <template #card>
        <UContainer class="py-2">
          <CardInfo v-model="tarjeta" />
        </UContainer>
      </template>
      <template #movimientos>
        <UContainer class="py-2">
          <CardMov :tarjeta="tarjeta" />
        </UContainer>
      </template>
      <template #graficas>
        <UContainer class="py-2">
          <CardGraphs :tarjeta="tarjeta" />
        </UContainer>
      </template>
    </UTabs>
  </UMain>
</template>
