<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <form>
      <div class="bg-body-tertiary border rounded p-2 shadow">
        <div class="form-floating mb-2">
          <input v-model="form.nombre" class="form-control" type="text" :placeholder="t('numero_tarjeta')" readonly>
          <label>{{ t("nombre") }}</label>
        </div>
        <div class="form-floating mb-2">
          <input v-model="form.email" class="form-control" type="text" :placeholder="t('numero_tarjeta')" readonly>
          <label>{{ t("correo") }}</label>
        </div>
        <div class="form-floating mb-2">
          <input v-model="form.numero" class="form-control" type="number" :placeholder="t('numero_tarjeta')" @focusin="autocomplete = true">
          <AutocompleteList v-if="autocomplete && tarjetas.length" :text="form.numero" :array="tarjetas" prop="numero" descprop="nombre" @select="selectCard($event)" />
          <label>{{ t("numero_tarjeta") }}</label>
        </div>
        <div class="form-floating mb-2">
          <input v-model="form.monto" class="form-control" type="number" min="0.50" step="0.01" :placeholder="t('monto')">
          <label>{{ t("monto") }}</label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-2">{{ t("buy") }}</button>
    </form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      tarjetas: [],
      autocomplete: false,
      form: {
        nombre: Auth().user.nombre,
        numero: "",
        monto: null,
        email: Auth().user.email
      }
    };
  },
  async mounted () {
    if (Auth().exists) {
      this.tarjetas = await DB.getTarjetas();
    }
  },
  methods: {
    openAutocomplete () {
      this.autocomplete = true;
    },
    selectCard (card) {
      this.autocomplete = false;
      this.form.numero = card.numero;
    }
  }
};
</script>
