<script setup lang="ts">
definePageMeta({ layout: "main" });
const auth = Auth();

const tarjetas = ref<SaldometrobusTarjeta[]>([]);
const fetched = ref(0);
const fetchLimit = ref(4);
const showProgress = ref(false);
const progressTitle = ref("");
const showLimit = ref(false);
const showAdd = ref(false);

const form = useFormState({
  numero: "",
  nombre: ""
});
const validation = useFormValidation(form);

const size = { width: 100, height: 63 };

const isFetchLimited = computed(() => fetched.value > fetchLimit.value);
const openCard = (tarjeta: SaldometrobusTarjeta) => {
  if (!tarjeta.saldo) return CAPACITOR.showToast(t("actualiza_tarjeta"), "long");
  navigateTo(`/app/${tarjeta.numero}`);
};

const addTarjeta = async (event: Event) => {
  progressTitle.value = t("adding_tarjeta");
  const addForm = event.currentTarget as HTMLFormElement;
  if (!validation.validate(addForm)) return;

  showAdd.value = false;
  showProgress.value = true;
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
  showProgress.value = false;
  validation.reset();
};

const updateTarjeta = async (event: Event, numero: string) => {
  event.stopPropagation();
  progressTitle.value = t("actualizando_tarjeta");
  showProgress.value = true;
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
    if (error_key === "error_tarjeta") {
      tarjetas.value = tarjetas.value.filter(t => t.numero !== numero);
      if (!auth.isGuest) {
        await API.deleteTarjeta({
          email: auth.user.email,
          token: auth.user.token,
          numero
        });
      }
      await DB.deleteTarjeta(numero);
    }
    await CAPACITOR.showToast(t(error_key || "error"), "long");
  }
  showProgress.value = false;
};

onMounted(async () => {
  if (!auth.exists) return;
  tarjetas.value = await DB.getTarjetas();
  if (tarjetas.value.length || auth.user.updated || auth.isGuest) return;

  progressTitle.value = t("adding_tarjetas");
  showProgress.value = true;
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
    if (changes > 0 && !isFetchLimited.value && tarjeta.movimientos?.length) {
      await DB.insertMovimientos(tarjeta);
    }
  }

  const getTarjetas = await DB.getTarjetas();

  for (const tarjeta of getTarjetas) {
    tarjetas.value.push(tarjeta);
    if (tarjeta.saldo) {
      await CAPACITOR.showToast(`${t("tarjeta_added")}: ${tarjeta.numero}`);
    }
  }

  await auth.setUpdated();
  showProgress.value = false;
  if (isFetchLimited.value) {
    showLimit.value = true;
  }
});
</script>

<template>
  <UContainer class="py-2">
    <TransitionGroup name="tab">
      <BoxComponent v-for="tarjeta in tarjetas" :key="tarjeta.numero" :title="tarjeta.nombre" p2 role="button" @click="openCard(tarjeta)">
        <div class="flex">
          <div class="grow">
            <div class="info me-2 text-sm">
              <Transition name="fade" mode="out-in">
                <div v-if="tarjeta.saldo" class="space-y-2">
                  <div>
                    <div class="font-bold">{{ t("tipo") }}</div>
                    <div>{{ tarjeta.tipo }}</div>
                  </div>
                  <div>
                    <div class="font-bold">{{ t("fecha") }}</div>
                    <div class="text-nowrap">{{ tarjeta.fecha }}</div>
                  </div>
                  <div class="text-primary rounded ps-3 py-1 border-s-3">
                    <div class="font-bold">{{ t("saldo") }}</div>
                    <div class="text-nowrap font-bold text-xl">B/. {{ tarjeta.saldo }}</div>
                  </div>
                </div>
                <div v-else class="space-y-2">
                  <div class="space-y-0.5">
                    <USkeleton class="h-5 w-8 rounded-full" />
                    <USkeleton class="h-5 w-24 rounded-full" />
                  </div>
                  <div class="space-y-0.5">
                    <USkeleton class="h-5 w-25 rounded-full" />
                    <USkeleton class="h-5 w-30 rounded-full" />
                  </div>
                  <div class="space-y-0.5 text-primary rounded ps-3 py-1 border-s-3">
                    <USkeleton class="h-5 w-12 rounded-full" />
                    <USkeleton class="h-5.5 w-12 rounded-full" />
                  </div>
                </div>
              </Transition>
            </div>
          </div>
          <div class="actions flex flex-col space-y-1">
            <img class="rounded-md shadow-sm border border-default" :src="`/images/${getCardImage(tarjeta.tipo)}`" :width="size.width" :height="size.height">
            <p class="bg-elevated rounded-lg px-2 font-bold text-center">{{ tarjeta.numero }}</p>
            <UButton icon="refresh" color="secondary" :ui="{ base: 'justify-center py-2.5' }" @click="updateTarjeta($event, tarjeta.numero)" />
          </div>
        </div>
      </BoxComponent>
    </TransitionGroup>
    <div v-if="tarjetas.length" class="text-center mt-3">
      <p class="text-sm">{{ t("tarjetas_note") }}</p>
    </div>
    <div class="fixed bottom-0 right-0 m-6">
      <UModal v-model:open="showAdd" :title="t('add_tarjeta')" :dismissible="false">
        <UButton class="rounded-full shadow transition-transform duration-200 hover:scale-110" icon="plus" :ui="{ leadingIcon: 'size-12' }" />
        <template #body="{ close }">
          <form novalidate class="space-y-2" @submit.prevent="addTarjeta">
            <ValidationTooltip :invalid="validation.invalidFields.nombre" :text="t('obligatorio')">
              <InputFloating
                id="nombre"
                v-model="form.nombre"
                :placeholder="t('nombre')"
                name="nombre"
                required
              />
            </ValidationTooltip>
            <ValidationTooltip :invalid="validation.invalidFields.numero" :text="t('error_tarjeta')">
              <InputFloating
                id="numero"
                v-model="form.numero"
                :placeholder="t('numero_tarjeta')"
                name="numero"
                type="number"
                pattern="[0-9]"
                required
              />
            </ValidationTooltip>
            <div class="flex gap-2">
              <UButton type="button" color="error" :label="t('cancel')" block @click="close" />
              <UButton type="submit" :label="t('add')" block />
            </div>
          </form>
        </template>
      </UModal>
    </div>
    <ProgressDialog v-model="showProgress" :message="progressTitle" />
    <LimitDialog v-model="showLimit" />
  </UContainer>
</template>
