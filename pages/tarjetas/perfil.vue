<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <div class="bg-white border rounded p-2 mb-2 shadow">
      <h4 class="text-primary m-0"><b>{{ STRINGS.get("nombre") }}</b></h4>
      <div class="m-2">
        <input :value="form.nombre" class="form-control" type="text" readonly>
      </div>
    </div>
    <div class="bg-white border rounded p-2 mb-2 shadow">
      <h4 class="text-primary m-0"><b>{{ STRINGS.get("correo") }}</b></h4>
      <div class="m-2">
        <input :value="form.email" class="form-control" type="text" readonly>
      </div>
    </div>
    <div class="bg-white border rounded p-2 mb-2 shadow">
      <h4 class="text-primary m-0"><b>{{ STRINGS.get("tarjetas_vinculadas") }}</b></h4>
      <div class="m-2">
        <p v-for="tarjeta in form.tarjetas" :key="tarjeta.numero" class="m-0"><Icon name="material-symbols:credit-card-outline" /> {{ tarjeta.numero }} ({{ tarjeta.nombre }})</p>
      </div>
    </div>
    <div class="text-center mt-3">
      <p class="small m-0"><small>{{ STRINGS.get("nota") }}</small></p>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      form: {
        nombre: AUTH.user.nombre,
        email: AUTH.user.email,
        tarjetas: []
      }
    };
  },
  async mounted () {
    this.form.tarjetas = await DB.getTarjetas();
  }
};
</script>
