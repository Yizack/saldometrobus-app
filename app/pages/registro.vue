<script setup lang="ts">
definePageMeta({ layout: "back", nav_title: "registrate" });
const auth = Auth();

const form = useFormState({
  nombre: "",
  email: "",
  password: "",
  passwordCheck: "",
  error: false
});

const passwordFocus = ref(false);
const isValidPass = ref(false);

const email = useTemplateRef<HTMLInputElement>("email");

const googleRegistro = async () => {
  showModal("progress-dialog");
  const { error, error_key } = await auth.googleRegistro();
  await sleep(0.5);
  hideModal("progress-dialog");

  if (error) {
    await CAPACITOR.showToast(t(error_key), "long");
    return;
  }

  navigateTo("/app/", { replace: true });
};

const registro = async () => {
  if (!(isValidName(form.value.nombre) && isValidEmail(form.value.email) && isValidPass.value && isValidPasswordCheck(form.value.password, form.value.passwordCheck))) return;
  showModal("progress-dialog");
  const { error, error_key } = await auth.registro({
    nombre: form.value.nombre,
    email: form.value.email,
    password: form.value.password
  });
  await sleep(0.5);
  hideModal("progress-dialog");
  if (!error) {
    navigateTo("/app/", { replace: true });
  }
  else {
    if (error_key === "correo_existe") {
      form.value.error = true;
      email.value?.focus();
    }
    await CAPACITOR.showToast(t(error_key), "long");
  }
};
</script>

<template>
  <section>
    <div class="container-fluid text-center">
      <div class="py-2">
        <img class="img-fluid shadow-sm my-3 rounded bg-body" width="90" height="90" src="/images/logo2.webp">
        <p>{{ t("enter_account_info") }}</p>
      </div>
      <form novalidate @submit.prevent="registro">
        <div class="mb-3 form-floating">
          <input v-model.trim="form.nombre" class="form-control" :class="{ 'is-valid': isValidName(form.nombre) }" type="text" :placeholder="t('nombre')" required>
          <label>{{ t("nombre") }}</label>
        </div>
        <div class="mb-3 position-relative form-floating">
          <input ref="email" v-model.trim="form.email" class="form-control" :class="{ 'is-valid': isValidEmail(form.email), 'is-invalid': form.error }" type="email" :placeholder="t('correo')" autocomplete="email" required @keyup="form.error = false">
          <label>{{ t("correo") }}</label>
          <div v-if="form.error" class="invalid-tooltip">
            {{ t("correo_existe") }}
          </div>
        </div>
        <div class="mb-3 form-floating">
          <input v-model="form.password" class="form-control" :class="passwordClass(isValidPass, form)" type="password" :placeholder="t('password')" autocomplete="new-password" required @focus="passwordFocus = true" @blur="passwordFocus = false">
          <label>{{ t("password") }}</label>
          <Transition name="tab" mode="out-in">
            <PasswordRequirements v-if="passwordFocus" v-model="isValidPass" :password="form.password" />
          </Transition>
        </div>
        <div class="mb-3 form-floating">
          <input v-model="form.passwordCheck" class="form-control" :class="passwordCheckClass(isValidPass, form)" type="password" :placeholder="t('password_check')" autocomplete="off" required>
          <label>{{ t("password_check") }}</label>
        </div>
        <div class="d-grid my-4 gap-2">
          <input class="btn btn-primary" type="submit" role="button" :value="t('registrate')">
          <span>{{ t("or") }}</span>
          <button class="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2 text-decoration-none d-flex align-items-center gap-2" type="button" role="button" @click="googleRegistro">
            <Icon name="google" size="sm" />
            <span>{{ t("google_signup") }}</span>
          </button>
        </div>
      </form>
      <p class="mb-3">{{ t("tiene_cuenta") }} <NuxtLink class="text-primary" to="/">{{ t("ingresa") }}</NuxtLink></p>
      <p class="mb-3"><small>{{ t("nota2") }}</small></p>
    </div>
    <ProgressDialog :message="t('iniciando_sesion')" />
  </section>
</template>
