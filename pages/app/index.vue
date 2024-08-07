<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <TransitionGroup name="tab">
      <div v-for="tarjeta in tarjetas" :key="tarjeta.numero" class="bg-body-tertiary border rounded d-flex p-2 mb-2 shadow" role="button" @click="openCard(tarjeta.numero)">
        <div class="flex-grow-1">
          <h4 class="text-primary-emphasis m-0"><b>{{ tarjeta.nombre }}</b></h4>
          <div class="info mx-2 small">
            <p class="m-0">{{ t("numero") }}: {{ tarjeta.numero }}</p>
            <p class="m-0">{{ t("estado") }}: {{ tarjeta.estado }}</p>
            <p class="m-0">{{ t("tipo") }}: {{ tarjeta.tipo }}</p>
            <p class="m-0">{{ t("fecha") }}: {{ tarjeta.fecha }}</p>
            <h3 class="text-nowrap"><b>{{ t("saldo") }}: B/. {{ tarjeta.saldo }}</b></h3>
          </div>
        </div>
        <div class="actions d-flex flex-column">
          <div class="image mb-2 mt-2">
            <img class="img-fluid rounded shadow-sm" :src="`/images/${getCardImage(tarjeta.tipo)}`" :width="size.width" :height="size.height">
          </div>
          <div class="d-grid">
            <button class="btn btn-primary btn-sm" role="button" @click="updateTarjeta($event, tarjeta.numero)"><Icon name="refresh" size="md" /></button>
          </div>
        </div>
      </div>
    </TransitionGroup>
    <div v-if="tarjetas.length" class="text-center mt-3">
      <p class="small m-0"><small>{{ t("tarjetas_note") }}</small></p>
    </div>
    <div class="position-fixed bottom-0 end-0 m-3">
      <button class="btn btn-primary rounded-circle p-1 shadow" role="button" data-bs-toggle="modal" data-bs-target="#add-dialog"><Icon name="plus" size="lg" /></button>
    </div>
    <!-- Add Dialog -->
    <div id="add-dialog" class="modal fade" tabindex="-1" aria-labelledby="add-dialog-label" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="add-dialog-label" class="modal-title fs-5 text-primary-emphasis">
              <strong>{{ t("add_tarjeta") }}</strong>
            </h1>
          </div>
          <div class="modal-body text-center">
            <form ref="add" novalidate @submit.prevent="addTarjeta()">
              <div class="mb-3 position-relative form-floating">
                <input v-model="form.nombre" class="form-control" type="text" :placeholder="t('nombre')" required>
                <label>{{ t("nombre") }}</label>
                <div class="invalid-tooltip">
                  {{ t("obligatorio") }}
                </div>
              </div>
              <div class="mb-3 position-relative form-floating">
                <input v-model="form.numero" class="form-control" type="number" pattern="[0-9]" :placeholder="t('numero_tarjeta')" required>
                <label>{{ t("numero_tarjeta") }}</label>
                <div class="invalid-tooltip">
                  {{ t("error_tarjeta") }}
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-danger me-2" type="button" data-bs-dismiss="modal">{{ t("cancel") }}</button>
                <button class="btn btn-primary" type="submit" role="button">{{ t("add") }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ProgressDialog :message="progress" />
    <LimitDialog />
  </section>
</template>

<script>
export default {
  name: "AppPage",
  data () {
    return {
      tarjetas: [],
      size: {
        width: 100,
        height: 63
      },
      fetched: 0,
      fetchLimit: 4,
      form: {
        numero: "",
        nombre: ""
      },
      progress: ""
    };
  },
  computed: {
    isFetchLimited () {
      return this.fetched > this.fetchLimit;
    }
  },
  async mounted () {
    if (Auth().exists) {
      this.tarjetas = await DB.getTarjetas();
      if (!Auth().user.updated && !this.tarjetas.length && !Auth().isGuest) {
        this.progress = t("adding_tarjetas");
        await sleep(0.5);
        showModal("progress-dialog");
        const { email, token } = Auth().user;
        const { error, error_key, tarjetas } = await API.getTarjetas({ email, token }) || [];
        let tarjetasApi = [];

        if (error) {
          await CAPACITOR.showToast(t(error_key), "long");
        }

        if (tarjetas) {
          this.fetched = tarjetas.length;
          if (this.isFetchLimited) {
            tarjetasApi = tarjetas || [];
          }
          else {
            tarjetasApi = await API.getDetallesTarjetas(tarjetas) || [];
          }
        }

        for (const tarjeta of tarjetasApi) {
          const { changes } = await DB.insertTarjeta(tarjeta);
          if (changes > 0 && !this.isFetchLimited) {
            await DB.insertMovimientos(tarjeta);
          }
        }

        const getTarjetas = await DB.getTarjetas();
        const entries = (getTarjetas).entries();

        for (const [i, tarjeta] of entries) {
          this.tarjetas.push(tarjeta);
          await CAPACITOR.showToast(`${t("tarjeta_added")}: ${tarjeta.numero}`);
          if (getTarjetas.length - 1 === i) break;
          await sleep(0.5);
        }

        await Auth().setUpdated();
        await sleep(0.5);
        hideModal("progress-dialog");
        if (this.isFetchLimited) {
          await sleep(0.5);
          showModal("limit-dialog");
        }
      }
    }
  },
  methods: {
    async addTarjeta () {
      this.progress = t("adding_tarjeta");
      const form = this.$refs.add;
      if (form.checkValidity()) {
        hideModal("add-dialog");
        showModal("progress-dialog");
        const { nombre, numero } = this.form;
        const { tarjeta, error, error_key } = await API.getTarjetaAPI(numero);
        if (tarjeta && !error) {
          tarjeta.nombre = String(nombre).trim();
          tarjeta.fecha_added = new Date().toISOString().replace("T", " ").replace("Z", "");
          const tarjetaExists = await DB.tarjetaExists(tarjeta.numero);
          if (!tarjetaExists) {
            const { error, error_key } = !Auth().isGuest ? await API.addTarjeta({
              nombre: tarjeta.nombre,
              numero: tarjeta.numero,
              email: Auth().user.email,
              token: Auth().user.token
            }) : { error: false };
            const { changes } = await DB.insertTarjeta(tarjeta);
            if (changes > 0 && !error) {
              await DB.insertMovimientos(tarjeta);
              await CAPACITOR.showToast(`${t("tarjeta_added")}: ${tarjeta.numero}`);
            }
            else {
              await CAPACITOR.showToast(t(error_key));
            }
            this.tarjetas = await DB.getTarjetas();
          }
          else {
            await CAPACITOR.showToast(`${t("existe_tarjeta")}: ${tarjeta.numero}`);
          }
          this.form = { numero: "", nombre: "" };
        }
        else {
          await CAPACITOR.showToast(t(error_key), "long");
        }
        await sleep(0.5);
        hideModal("progress-dialog");
        form.classList.remove("was-validated");
      }
      else {
        form.classList.add("was-validated");
      }
    },
    openCard (numero) {
      this.$router.push(`${numero}`);
    },
    async updateTarjeta (e, numero) {
      e.stopPropagation();
      this.progress = t("actualizando_tarjeta");
      showModal("progress-dialog");
      const { tarjeta, error, error_key } = await API.getTarjetaAPI(numero);
      if (tarjeta && !error) {
        const { changes } = await DB.updateTarjeta(tarjeta);
        if (changes > 0) {
          await DB.deleteMovimientos(numero);
          await DB.insertMovimientos(tarjeta);
          await CAPACITOR.showToast(`${t("tarjeta_actualizada")}: ${tarjeta.numero}`);
          this.tarjetas = await DB.getTarjetas();
        }
      }
      else {
        await CAPACITOR.showToast(t(error_key), "long");
      }
      await sleep(0.5);
      hideModal("progress-dialog");
    }
  }
};
</script>
