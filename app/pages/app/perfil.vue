<script setup lang="ts">
definePageMeta({ layout: "main" });
const auth = Auth();

const dialog = ref("");
const edit = ref({
  nombre: false
});

const user = ref({
  nombre: auth.user.nombre,
  email: auth.user.email,
  token: auth.user.token,
  tarjetas: [] as SaldometrobusTarjeta[]
});

const form = useFormState({
  current_password: "",
  new_password: "",
  password_check: "",
  error: false
});

const isPasswordValid = computed(() => {
  return form.value.new_password.length >= 3 && form.value.current_password !== form.value.new_password && form.value.current_password.length > 0;
});

const isPasswordCheckValid = computed(() => {
  return isPasswordValid.value && form.value.new_password === form.value.password_check;
});

const nombre = ref<HTMLInputElement>();
const editName = async () => {
  edit.value.nombre = !edit.value.nombre;
  user.value.nombre = user.value.nombre.trim();
  if (edit.value.nombre) {
    const end = user.value.nombre.length;
    nombre.value?.setSelectionRange(end, end);
    nombre.value?.focus();
    nombre.value?.removeAttribute("readonly");
  }
  else {
    if (user.value.nombre !== auth.user.nombre) {
      const { error, error_key } = await API.updateName({
        nombre: user.value.nombre,
        email: auth.user.email,
        token: auth.user.token || ""
      });

      if (!error) {
        auth.updateName(user.value.nombre);
        await CAPACITOR.showToast(t("name_updated"));
      }
      else {
        user.value.nombre = auth.user.nombre;
        await CAPACITOR.showToast(t(error_key));
      }
    }
    nombre.value?.setAttribute("readonly", "true");
    nombre.value?.blur();
  }
};

const current = ref<HTMLInputElement>();
const updatePass = async () => {
  if (isPasswordValid.value && isPasswordCheckValid.value) {
    dialog.value = t("updating_pass");
    showModal("progress-dialog");
    const { error, error_key } = await API.userPassUpdate({
      current_password: form.value.current_password,
      new_password: form.value.new_password,
      email: auth.user.email,
      token: auth.user.token
    });
    if (!error) {
      await CAPACITOR.showToast(t("pass_updated"), "long");
      form.reset();
    }
    else {
      if (error_key === "pass_error") {
        form.value.error = true;
        current.value?.focus();
      }
      await CAPACITOR.showToast(t(error_key), "long");
    }
  }
  await sleep(0.5);
  hideModal("progress-dialog");
};

const copyToken = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement;
  input.select();
  CAPACITOR.writeToClipboard(user.value.token);
};

const deleteAccount = async () => {
  const confirm = await CAPACITOR.confirm(t("delete_account"), t("delete_account_sure"));
  if (confirm) {
    dialog.value = t("deleting_account");
    showModal("progress-dialog");
    const { error, error_key } = await API.deleteAccount({
      email: auth.user.email,
      token: auth.user.token
    });
    if (!error) {
      await DB.deleteAll();
      await auth.logout();
      await CAPACITOR.showToast(t("account_deleted"));
      await sleep(0.5);
      hideModal("progress-dialog");
      navigateTo("/", { replace: true });
    }
    else {
      await CAPACITOR.showToast(t(error_key));
      await sleep(0.5);
      hideModal("progress-dialog");
    }
  }
};

onMounted(async () => {
  user.value.tarjetas = await DB.getTarjetas();
});
</script>

<template>
  <section>
    <BoxComponent :title="t('perfil')">
      <div class="input-group">
        <input ref="nombre" v-model="user.nombre" class="form-control py-2" type="text" readonly>
        <button v-if="!auth.isGuest" class="btn btn-sm" :class="edit.nombre ? 'btn-success' : 'btn-secondary'" :style="{ width: '3rem' }" @click="editName()">
          <Transition name="tab" mode="out-in">
            <Icon v-if="edit.nombre" name="check" />
            <Icon v-else name="edit" />
          </Transition>
        </button>
      </div>
    </BoxComponent>
    <BoxComponent :title="t('correo')">
      <input :value="user.email" class="form-control py-2" type="text" readonly>
    </BoxComponent>
    <BoxComponent :title="t('tarjetas_vinculadas')">
      <template v-if="user.tarjetas.length">
        <div v-for="tarjeta in user.tarjetas" :key="tarjeta.numero" class="d-flex align-items-center">
          <Icon name="card" />
          <p class="ms-2 my-0">{{ tarjeta.numero }} ({{ tarjeta.nombre }})</p>
        </div>
      </template>
      <p v-else class="m-0">{{ t("no_tarjetas") }}</p>
    </BoxComponent>
    <BoxComponent v-if="!auth.isGuest" :title="t('password')">
      <form novalidate @submit.prevent="updatePass">
        <input type="text" class="d-none" name="email" :value="auth.user.email" autocomplete="email">
        <div class="mb-3 position-relative form-floating">
          <input ref="current" v-model="form.current_password" class="form-control" :class="{ 'is-invalid': form.error }" type="password" autocomplete="password" :placeholder="t('current_pass')" required @keyup="form.error = false">
          <label>{{ t("current_pass") }}</label>
          <div class="invalid-tooltip">
            {{ t("pass_error") }}
          </div>
        </div>
        <div class="mb-3 form-floating">
          <input v-model="form.new_password" class="form-control" :class="{ 'is-valid': isPasswordValid }" type="password" autocomplete="new-password" :placeholder="t('new_pass')" required>
          <label>{{ t("new_pass") }}</label>
        </div>
        <div class="mb-3 form-floating">
          <input v-model="form.password_check" class="form-control" :class="{ 'is-valid': isPasswordCheckValid }" type="password" autocomplete="off" :placeholder="t('password_check')" required>
          <label>{{ t("password_check") }}</label>
        </div>
        <div class="d-grid">
          <button class="btn btn-primary" type="submit" role="button">{{ t("change_pass") }}</button>
        </div>
      </form>
    </BoxComponent>
    <BoxComponent v-if="!auth.isGuest" :title="t('account_id')">
      <input :value="user.token" class="form-control py-2" type="text" readonly @click="copyToken($event)">
    </BoxComponent>
    <div v-if="!auth.isGuest" class="d-grid">
      <button class="btn btn-danger mt-2" @click="deleteAccount">{{ t("delete_account") }}</button>
    </div>
    <div v-if="auth.isGuest" class="text-center mt-3">
      <p class="small m-0"><small>{{ t("nota") }}</small></p>
    </div>
    <ProgressDialog :message="dialog" />
  </section>
</template>
