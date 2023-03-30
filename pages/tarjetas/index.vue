<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <div v-for="tarjeta in tarjetas" :key="tarjeta.numero" class="bg-white border rounded d-flex p-2 mb-2 shadow" role="button" @click="openCard(tarjeta.numero)">
      <div class="flex-grow-1">
        <h4 class="text-primary m-0"><b>{{ tarjeta.nombre }}</b></h4>
        <div class="info mx-2 small">
          <p class="m-0">{{ STRINGS.get("numero") }}: {{ tarjeta.numero }}</p>
          <p class="m-0">{{ STRINGS.get("estado") }}: {{ tarjeta.estado }}</p>
          <p class="m-0">{{ STRINGS.get("tipo") }}: {{ tarjeta.tipo }}</p>
          <p class="m-0">{{ STRINGS.get("fecha") }}: {{ tarjeta.fecha }}</p>
          <h3><b>{{ STRINGS.get("saldo") }}: B/. {{ tarjeta.saldo }}</b></h3>
        </div>
      </div>
      <div class="actions">
        <div class="image">
          <img v-if="tarjeta.tipo === 'Tarjeta Rapipass'" class="img-fluid" src="/images/rapipass.webp" :width="size" :height="size">
          <img v-else-if="tarjeta.tipo === 'Tarjeta Normal'" class="img-fluid" src="/images/metro_metrobus.webp" :width="size" :height="size">
          <img v-else src="/images/metrobus.webp" class="img-fluid" :width="size" :height="size">
        </div>
        <div class="d-grid gap-2">
          <button class="btn btn-primary btn-sm" role="button"><Icon name="material-symbols:refresh" width="1.5em" height="1.5em" /></button>
        </div>
      </div>
    </div>
    <div v-if="tarjetas.length" class="text-center mt-3">
      <p class="small m-0"><small>*{{ STRINGS.get("tarjetas_note") }}</small></p>
    </div>
    <div class="position-absolute bottom-0 end-0 m-3">
      <button class="btn btn-primary rounded-circle p-1 shadow" role="button" data-bs-toggle="modal" data-bs-target="#add-dialog"><Icon name="material-symbols:add" width="3em" height="3em" /></button>
    </div>
    <!-- Add Dialog -->
    <div id="add-dialog" class="modal fade" tabindex="-1" aria-labelledby="add-dialog-label" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="add-dialog-label" class="modal-title fs-5">{{ STRINGS.get("add_tarjeta") }}</h1>
          </div>
          <div class="modal-body text-center">
            <form ref="add" novalidate @submit.prevent="addTarjeta()">
              <div class="mb-3 position-relative">
                <input v-model="form.nombre" class="form-control" type="text" :placeholder="STRINGS.get('nombre')" required>
                <div class="invalid-tooltip">
                  {{ STRINGS.get("obligatorio") }}
                </div>
              </div>
              <div class="mb-3 position-relative">
                <input v-model="form.numero" class="form-control" type="number" pattern="[0-9]" :placeholder="STRINGS.get('numero_tarjeta')" required>
                <div class="invalid-tooltip">
                  {{ STRINGS.get("error_tarjeta") }}
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-danger me-2" type="button" data-bs-dismiss="modal">{{ STRINGS.get("cancel") }}</button>
                <input class="btn btn-primary" type="submit" role="button" :value="STRINGS.get('add')">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ProgressDialog :message="STRINGS.get('adding_tarjetas')" />
  </section>
</template>

<script>
export default {
  name: "MainPage",
  data () {
    return {
      tarjetas: [],
      size: 100,
      form: {
        numero: "",
        nombre: ""
      }
    };
  },
  async mounted () {
    if (AUTH.exists) {
      this.tarjetas = await DB.getTarjetas();
      if (!this.tarjetas.length) {
        await sleep(0.5);
        showModal("progress-dialog");
        const { email, token } = AUTH.user;
        this.tarjetas = await API.getDetallesTarjetas({ email, token }) || [];
        for (const tarjeta of this.tarjetas) {
          const { changes } = await DB.insertTarjeta(tarjeta);
          await DB.insertMovimientos(tarjeta);
          if (changes > 0) {
            await CAPACITOR.showToast(`${STRINGS.get("tarjeta_added")}: ${tarjeta.numero}`);
          }
        }
        await sleep(0.5);
        hideModal("progress-dialog");
      }
    }
  },
  methods: {
    async addTarjeta () {
      const form = this.$refs.add;
      if (form.checkValidity()) {
        hideModal("add-dialog");
        await sleep(0.5);
        showModal("progress-dialog");
        const { email, token } = AUTH.user;
        const { nombre, numero } = this.form;
        const { tarjeta } = await API.getTarjeta(numero);
        if (tarjeta) {
          tarjeta.nombre = String(nombre).trim();
          try {
            const res = await Promise.all([
              DB.insertTarjeta(tarjeta),
              API.addTarjeta({ nombre, numero, email, token })
            ]);
            const { changes } = res[0];
            const { error, error_key } = res[1];
            if (changes > 0 && !error) {
              await DB.insertMovimientos(tarjeta);
              this.tarjetas.unshift(tarjeta);
              CAPACITOR.showToast(`${STRINGS.get("tarjeta_added")}: ${tarjeta.numero}`);
            }
            else {
              CAPACITOR.showToast(STRINGS.get(error_key));
            }
          }
          catch (error) {
            CAPACITOR.showToast(STRINGS.get("error"));
            console.warn(error);
          }
          await sleep(0.5);
          hideModal("progress-dialog");
          form.classList.remove("was-validated");
          this.form = { numero: "", nombre: "" };
        }
      }
      else {
        form.classList.add("was-validated");
      }
    },
    openCard (numero) {
      this.$router.push(`${numero}`);
    }
  }
};
</script>
