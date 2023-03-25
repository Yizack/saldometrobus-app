<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <ul id="pills-tab" class="nav nav-pills mb-2 sticky-top" role="tablist">
      <li class="nav-item flex-fill" role="presentation">
        <div class="d-grid gap-2">
          <a id="pills-info-tab" class="nav-link active rounded-0 text-uppercase text-center" data-bs-toggle="pill" data-bs-target="#pills-info" role="button" aria-controls="pills-info" aria-selected="true">{{ STRINGS.get("informacion") }}</a>
        </div>
      </li>
      <li class="nav-item flex-fill" role="presentation">
        <div class="d-grid gap-2">
          <a id="pills-mov-tab" class="nav-link rounded-0 text-uppercase text-center" data-bs-toggle="pill" data-bs-target="#pills-mov" role="button" aria-controls="pills-mov" aria-selected="false">{{ STRINGS.get("movimientos") }}</a>
        </div>
      </li>
      <li class="nav-item flex-fill" role="presentation">
        <div class="d-grid gap-2">
          <a id="pills-graphs-tab" class="nav-link rounded-0 text-uppercase text-center" data-bs-toggle="pill" data-bs-target="#pills-graphs" role="button" aria-controls="pills-graphs" aria-selected="false">{{ STRINGS.get("graficas") }}</a>
        </div>
      </li>
    </ul>
    <div id="pills-tabContent" class="tab-content">
      <div id="pills-info" class="tab-pane fade show active" role="tabpanel" aria-labelledby="pills-info-tab" tabindex="0">
        <CardInfo :tarjeta="tarjeta" />
      </div>
      <div id="pills-mov" class="tab-pane fade" role="tabpanel" aria-labelledby="pills-mov-tab" tabindex="0">
        <CardMov :tarjeta="tarjeta" />
      </div>
      <div id="pills-graphs" class="tab-pane fade" role="tabpanel" aria-labelledby="pills-graphs-tab" tabindex="0">...</div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      tarjeta: {}
    };
  },
  async mounted () {
    const numero = this.$route.params.tarjeta;
    this.tarjeta = await DB.getTarjeta(numero);
    this.tarjeta.movimientos = await DB.getMovimientos(numero);
  }
};
</script>
