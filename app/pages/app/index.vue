<script setup lang="ts">
definePageMeta({ layout: "main" });
const auth = Auth();

const tarjetas = ref<SaldometrobusTarjeta[]>([]);
const fetched = ref(0);
const fetchLimit = ref(4);
const progress = ref("");

const form = useFormState({
  numero: "",
  nombre: ""
});

const size = { width: 100, height: 63 };

const isFetchLimited = computed(() => fetched.value > fetchLimit.value);
const openCard = (tarjeta: SaldometrobusTarjeta) => {
  if (!tarjeta.saldo) return CAPACITOR.showToast(t("actualiza_tarjeta"), "long");
  navigateTo(`/app/${tarjeta.numero}`);
};

const addTarjeta = async (event: Event) => {
  progress.value = t("adding_tarjeta");
  const addForm = event.currentTarget as HTMLFormElement;
  if (!addForm.checkValidity()) {
    return addForm.classList.add("was-validated");
  }

  hideModal("add-dialog");
  showModal("progress-dialog");
  const { tarjeta, error, error_key } = await API.getTarjetaAPI(form.value.numero);
  if (tarjeta && !error) {
    tarjeta.nombre = form.value.nombre;
    tarjeta.fecha_added = new Date().toISOString().replace("T", " ").replace("Z", "");
    const tarjetaExists = await DB.tarjetaExists(tarjeta.numero);
    if (!tarjetaExists) {
      const { error, error_key } = !auth.isGuest ? await API.addTarjeta({
        nombre: tarjeta.nombre,
        numero: tarjeta.numero,
        email: auth.user.email,
        token: auth.user.token
      }) : { error: false };
      const changes = await DB.insertTarjeta(tarjeta);
      if (changes > 0 && !error) {
        await DB.insertMovimientos(tarjeta);
        await CAPACITOR.showToast(`${t("tarjeta_added")}: ${tarjeta.numero}`);
      }
      else {
        await CAPACITOR.showToast(t(error_key));
      }
      tarjetas.value = await DB.getTarjetas();
    }
    else {
      await CAPACITOR.showToast(`${t("existe_tarjeta")}: ${tarjeta.numero}`);
    }
    form.reset();
  }
  else {
    await CAPACITOR.showToast(t(error_key || "error"), "long");
  }
  await sleep(0.5);
  hideModal("progress-dialog");
  addForm.classList.remove("was-validated");
};

const updateTarjeta = async (event: Event, numero: string) => {
  event.stopPropagation();
  progress.value = t("actualizando_tarjeta");
  showModal("progress-dialog");
  const { tarjeta, error, error_key } = await API.getTarjetaAPI(numero, true);
  if (tarjeta && !error) {
    const changes = await DB.updateTarjeta(tarjeta);
    if (changes > 0) {
      await DB.deleteMovimientos(numero);
      await DB.insertMovimientos(tarjeta);
      await CAPACITOR.showToast(`${t("tarjeta_actualizada")}: ${tarjeta.numero}`);
      tarjetas.value = await DB.getTarjetas();
    }
  }
  else {
    await CAPACITOR.showToast(t(error_key || "error"), "long");
  }
  await sleep(0.5);
  hideModal("progress-dialog");
};

onMounted(async () => {
  if (!auth.exists) return;
  tarjetas.value = await DB.getTarjetas();
  if (tarjetas.value.length || auth.user.updated || auth.isGuest) return;

  progress.value = t("adding_tarjetas");
  await sleep(0.5);
  showModal("progress-dialog");
  const { email, token } = auth.user;
  const { error, error_key, tarjetas: tarjetasAPI } = await API.getTarjetas({ email, token }) || [];
  let tarjetasDetalles = [];

  if (error) {
    await CAPACITOR.showToast(t(error_key), "long");
  }

  if (tarjetasAPI) {
    fetched.value = tarjetasAPI.length;
    if (isFetchLimited.value) {
      tarjetasDetalles = tarjetasAPI || [];
    }
    else {
      tarjetasDetalles = await API.getDetallesTarjetas(tarjetasAPI) || [];
    }
  }

  for (const tarjeta of tarjetasDetalles) {
    const changes = await DB.insertTarjeta(tarjeta);
    if (changes > 0 && !isFetchLimited.value) {
      await DB.insertMovimientos(tarjeta);
    }
  }

  const getTarjetas = await DB.getTarjetas();

  for (const tarjeta of getTarjetas) {
    tarjetas.value.push(tarjeta);
    if (tarjeta.saldo) {
      await CAPACITOR.showToast(`${t("tarjeta_added")}: ${tarjeta.numero}`);
    }
    await sleep(0.5);
  }

  await auth.setUpdated();
  await sleep(0.5);
  hideModal("progress-dialog");
  if (isFetchLimited.value) {
    await sleep(0.5);
    showModal("limit-dialog");
  }
});
</script>

<template>
  <section>
    <TransitionGroup name="tab">
      <div v-for="tarjeta in tarjetas" :key="tarjeta.numero" class="bg-body-tertiary border rounded d-flex p-2 mb-2 shadow" role="button" @click="openCard(tarjeta)">
        <div class="flex-grow-1">
          <h4 class="text-primary-emphasis m-0"><b>{{ tarjeta.nombre }}</b></h4>
          <div class="info mx-2 small">
            <p class="m-0"><b>{{ t("numero") }}: {{ tarjeta.numero }}</b></p>
            <Transition name="fade" mode="out-in">
              <div v-if="tarjeta.saldo">
                <p class="m-0">{{ t("estado") }}: {{ tarjeta.estado }}</p>
                <p class="m-0">{{ t("tipo") }}: {{ tarjeta.tipo }}</p>
                <p class="m-0">{{ t("fecha") }}: {{ tarjeta.fecha }}</p>
                <h3 class="text-nowrap"><b>{{ t("saldo") }}: B/. {{ tarjeta.saldo }}</b></h3>
              </div>
              <div v-else>
                <p class="placeholder-glow m-0"><span class="placeholder col-6" /></p>
                <p class="placeholder-glow m-0"><span class="placeholder col-5" /></p>
                <p class="placeholder-glow m-0"><span class="placeholder col-7" /></p>
                <h3 class="placeholder-glow"><span class="placeholder col-6" /></h3>
              </div>
            </Transition>
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
            <form novalidate @submit.prevent="addTarjeta">
              <div class="mb-3 position-relative form-floating">
                <input v-model.trim="form.nombre" class="form-control" type="text" :placeholder="t('nombre')" required>
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
