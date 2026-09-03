<script setup lang="ts">
const props = defineProps<{
  tarjeta: {
    numero: string;
    nombre: string;
    saldo: string;
    estado: string;
    fecha: string;
    tipo: string;
  };
}>();

const router = useRouter();

const form = useFormState({
  nombre: props.tarjeta.nombre
});

const validation = useFormValidation(form);

const progressTitle = ref("");
const showProgress = ref(false);
const showEdit = ref(false);

const editCard = async (event: Event) => {
  const editForm = event.currentTarget as HTMLFormElement;
  if (!validation.validate(editForm)) return;
  showEdit.value = false;
  progressTitle.value = t("editando");
  showProgress.value = true;
  const nombre_trimmed = form.value.nombre.trim();
  const { error, error_key } = !Auth().isGuest ? await API.updateTarjeta({
    email: Auth().user.email,
    token: Auth().user.token,
    numero: props.tarjeta.numero,
    nombre: nombre_trimmed
  }) : { error: false };

  const changes = await DB.updateNombreTarjeta(props.tarjeta.numero, nombre_trimmed);

  if (!error && changes > 0) {
    await CAPACITOR.showToast(`${t("editada")}: ${props.tarjeta.numero}`);
    showProgress.value = false;
    router.replace("/app/");
  }
  else {
    await CAPACITOR.showToast(t(error_key));
    showProgress.value = false;
  }
  validation.reset();
};

const color = computed(() => {
  const saldo = Number(props.tarjeta.saldo);
  return saldo <= 2 ? "error" : saldo > 2 && saldo < 5 ? "warning" : "success";
});

const deleteCard = async () => {
  const confirm = await CAPACITOR.confirm(t("eliminar_tarjeta"), t("eliminar_seguro"));
  if (confirm) {
    progressTitle.value = t("eliminando");
    showProgress.value = true;
    const { error, error_key } = !Auth().isGuest ? await API.deleteTarjeta({
      email: Auth().user.email,
      token: Auth().user.token,
      numero: props.tarjeta.numero
    }) : { error: false };

    const changes = await DB.deleteTarjeta(props.tarjeta.numero);

    if (!error && changes > 0) {
      await CAPACITOR.showToast(`${t("eliminada")}: ${props.tarjeta.numero}`);
      showProgress.value = false;
      router.replace("/app/");
    }
    else {
      await CAPACITOR.showToast(t(error_key));
      showProgress.value = false;
    }
  }
};
</script>

<template>
  <div>
    <BoxComponent :title="tarjeta.nombre" title-center>
      <div class="py-2">
        <div class="flex justify-center">
          <img class="mb-3" :src="`/images/${getCardImage(tarjeta.tipo, true)}`" width="250" height="158">
        </div>
        <h3 class="text-center text-xl"><b>{{ tarjeta.numero }}</b></h3>
      </div>
    </BoxComponent>
    <BoxComponent :title="t('saldo')">
      <h3 class="text-xl font-bold">B/. {{ tarjeta.saldo }}</h3>
    </BoxComponent>
    <BoxComponent :title="t('info_tarjeta')">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p><b>{{ t("numero_tarjeta") }}</b></p>
          <p>{{ tarjeta.numero }}</p>
        </div>
        <div>
          <p><b>{{ t("estado") }}</b></p>
          <p>{{ tarjeta.estado }}</p>
        </div>
        <div>
          <p><b>{{ t("fecha") }}</b></p>
          <p>{{ tarjeta.fecha }}</p>
        </div>
        <div>
          <p><b>{{ t("tipo_tarjeta") }}</b></p>
          <p>{{ tarjeta.tipo }}</p>
        </div>
      </div>
    </BoxComponent>
    <BoxComponent :title="t('balance')">
      <UProgressGroup
        size="xl"
        :items="[{ label: t('balance'), value: Number(tarjeta.saldo), color }]"
        :max="50"
        :ui="{ status: 'text-sm text-default justify-between w-full font-bold' }"
      >
        <template #status>
          <h4>Actual: B/. {{ tarjeta.saldo }}</h4>
          <h4>B/. {{ Number(tarjeta.saldo) > 50 ? tarjeta.saldo : "50.00" }}</h4>
        </template>
        <template #item-trailing><span /></template>
      </UProgressGroup>
    </BoxComponent>
    <div class="flex gap-2">
      <UButton :label="t('eliminar')" color="error" block @click="deleteCard()" />
      <UModal v-model:open="showEdit" :title="t('editar_tarjeta')" :dismissible="false">
        <UButton :label="t('editar')" block />
        <template #body="{ close }">
          <form novalidate class="space-y-2" @submit.prevent="editCard">
            <ValidationTooltip :invalid="validation.invalidFields.nombre" :text="t('obligatorio')">
              <InputFloating
                id="nombre"
                v-model="form.nombre"
                :placeholder="t('nombre')"
                name="nombre"
                required
              />
            </ValidationTooltip>
            <InputFloating
              id="numero"
              :value="tarjeta.numero"
              type="number"
              :placeholder="t('numero_tarjeta')"
              name="numero"
              required
              readonly
            />
            <div class="flex gap-2">
              <UButton color="error" :label="t('cancel')" block @click="close" />
              <UButton type="submit" :label="t('editar')" block />
            </div>
          </form>
        </template>
      </UModal>
    </div>
    <ProgressDialog v-model="showProgress" :message="progressTitle" />
  </div>
</template>
