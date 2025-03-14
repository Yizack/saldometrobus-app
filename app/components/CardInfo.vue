<template>
  <div class="mt-1">
    <BoxComponent :title="tarjeta.nombre" title-center>
      <div class="text-center py-2">
        <img class="img-fluid mb-3" :src="`/images/${getCardImage(tarjeta.tipo, true)}`" :width="size.width" :height="size.height">
        <h3 class="m-0"><b>{{ tarjeta.numero }}</b></h3>
      </div>
    </BoxComponent>
    <BoxComponent :title="t('saldo')">
      <h3 class="m-0"><b>B/. {{ tarjeta.saldo }}</b></h3>
    </BoxComponent>
    <BoxComponent :title="t('info_tarjeta')">
      <div class="row row-gap-3">
        <div class="col-6">
          <p class="m-0"><b>{{ t("numero_tarjeta") }}</b></p>
          <p class="m-0">{{ tarjeta.numero }}</p>
        </div>
        <div class="col-6">
          <p class=" m-0"><b>{{ t("estado") }}</b></p>
          <p class="m-0">{{ tarjeta.estado }}</p>
        </div>
        <div class="col-6">
          <p class="m-0"><b>{{ t("fecha") }}</b></p>
          <p class="m-0">{{ tarjeta.fecha }}</p>
        </div>
        <div class="col-6">
          <p class="m-0"><b>{{ t("tipo_tarjeta") }}</b></p>
          <p class="m-0">{{ tarjeta.tipo }}</p>
        </div>
      </div>
    </BoxComponent>
    <BoxComponent :title="t('balance')">
      <div class="d-flex justify-content-between">
        <h4 class="small"><b>Actual: B/. {{ tarjeta.saldo }}</b></h4>
        <h4 class="small"><b>B/. {{ Number(tarjeta.saldo) > 50 ? tarjeta.saldo : "50.00" }}</b></h4>
      </div>
      <div class="progress" role="progressbar" :aria-label="t('balance')" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" :class="`bg-${color}`" :style="`width: ${percent}%`" />
      </div>
    </BoxComponent>
    <div class="d-flex">
      <div class="flex-fill">
        <div class="d-grid">
          <button class="btn btn-primary btn-block me-2" role="button" data-bs-toggle="modal" data-bs-target="#edit-dialog">
            <i class="fas fa-sync-alt" />
            <span>{{ t("editar") }}</span>
          </button>
        </div>
      </div>
      <div class="flex-fill">
        <div class="d-grid">
          <button class="btn btn-danger btn-block ms-1" @click="deleteCard()">
            <i class="fas fa-sync-alt" />
            <span>{{ t("eliminar") }}</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Edit Dialog -->
    <div id="edit-dialog" class="modal fade" tabindex="-1" aria-labelledby="edit-dialog-label" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 id="edit-dialog-label" class="modal-title fs-5 text-primary-emphasis">
              <strong>{{ t("editar_tarjeta") }}</strong>
            </h1>
          </div>
          <div class="modal-body text-center">
            <form ref="edit" novalidate @submit.prevent="editCard()">
              <div class="mb-3 position-relative form-floating">
                <input v-model="form.nombre" class="form-control" type="text" :placeholder="t('nombre')" required>
                <label>{{ t("nombre") }}</label>
                <div class="invalid-tooltip">
                  {{ t("obligatorio") }}
                </div>
              </div>
              <div class="mb-3 position-relative form-floating">
                <input class="form-control" type="number" :value="tarjeta.numero" :placeholder="t('numero_tarjeta')" disabled>
                <label disabled>{{ t("numero_tarjeta") }}</label>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-danger me-2" type="button" data-bs-dismiss="modal">{{ t("cancel") }}</button>
                <button class="btn btn-primary" type="submit" role="button">{{ t("editar") }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ProgressDialog :message="dialog" />
  </div>
</template>

<script>
export default {
  name: "InfoTarjeta",
  props: {
    tarjeta: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      size: {
        width: 250,
        height: 158
      },
      saldoBar: {
        percent: 0,
        color: ""
      },
      dialog: "",
      form: {
        nombre: ""
      }
    };
  },
  computed: {
    percent () {
      const saldo = Number(this.tarjeta.saldo);
      return (saldo / 50) * 100;
    },
    color () {
      const saldo = Number(this.tarjeta.saldo);
      if (Number(saldo) <= 2) {
        return "danger";
      }
      else if (Number(saldo) > 2 && Number(saldo) < 5) {
        return "warning";
      }
      else {
        return "success";
      }
    }
  },
  mounted () {
    this.form.nombre = this.tarjeta.nombre;
  },
  methods: {
    async editCard () {
      const form = this.$refs.edit;
      if (form.checkValidity()) {
        hideModal("edit-dialog");
        this.dialog = t("editando");
        showModal("progress-dialog");
        const nombre_trimmed = this.form.nombre.trim();
        const { error, error_key } = !Auth().isGuest ? await API.updateTarjeta({
          email: Auth().user.email,
          token: Auth().user.token,
          numero: this.tarjeta.numero,
          nombre: nombre_trimmed
        }) : { error: false };

        const changes = await DB.updateNombreTarjeta(this.tarjeta.numero, nombre_trimmed);

        if (!error && changes > 0) {
          await CAPACITOR.showToast(`${t("editada")}: ${this.tarjeta.numero}`);
          await sleep(0.5);
          hideModal("progress-dialog");
          this.$router.replace("/app/");
        }
        else {
          await CAPACITOR.showToast(t(error_key));
          await sleep(0.5);
          hideModal("progress-dialog");
        }
        form.classList.remove("was-validated");
      }
      else {
        form.classList.add("was-validated");
      }
    },
    async deleteCard () {
      const confirm = await CAPACITOR.confirm(t("eliminar_tarjeta"), t("eliminar_seguro"));
      if (confirm) {
        this.dialog = t("eliminando");
        showModal("progress-dialog");
        const { error, error_key } = !Auth().isGuest ? await API.deleteTarjeta({
          email: Auth().user.email,
          token: Auth().user.token,
          numero: this.tarjeta.numero
        }) : { error: false };

        const changes = await DB.deleteTarjeta(this.tarjeta.numero);

        if (!error && changes > 0) {
          await CAPACITOR.showToast(`${t("eliminada")}: ${this.tarjeta.numero}`);
          await sleep(0.5);
          hideModal("progress-dialog");
          this.$router.replace("/app/");
        }
        else {
          await CAPACITOR.showToast(t(error_key));
          await sleep(0.5);
          hideModal("progress-dialog");
        }
      }
    }
  }
};
</script>
