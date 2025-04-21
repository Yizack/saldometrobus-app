<script setup lang="ts">
const auth = Auth();

const form = useFormState({
  email: "",
  password: ""
});

const googleLogin = async () => {
  showModal("progress-dialog");
  const result = await auth.googleLogin();
  await sleep(0.5);
  hideModal("progress-dialog");

  if (!result) return;
  const { error, error_key } = result;

  if (error) {
    await CAPACITOR.showToast(t(error_key), "long");
    return;
  }

  navigateTo("/app/", { replace: true });
};

const userLogin = async (event: Event) => {
  const loginForm = event.currentTarget as HTMLFormElement;
  if (!loginForm.checkValidity()) {
    return loginForm.classList.add("was-validated");
  }

  showModal("progress-dialog");
  const { error, error_key } = await auth.login({
    email: form.value.email,
    password: form.value.password
  });
  await sleep(0.5);
  hideModal("progress-dialog");
  if (!error) {
    loginForm.classList.add("was-validated");
    navigateTo("/app/", { replace: true });
  }
  else {
    await CAPACITOR.showToast(t(error_key), "long");
    loginForm.classList.remove("was-validated");
  }
};

const guestLogin = async () => {
  await auth.guestLogin();
  navigateTo("/app/", { replace: true });
};
</script>

<template>
  <section>
    <div class="container-fluid text-center">
      <div class="py-4">
        <img class="img-fluid shadow-sm my-3 p-2 rounded bg-body" width="90" height="90" src="/images/logo.webp">
        <h1><b>{{ t("app_name") }}</b></h1>
        <p>{{ t("enter_email_password") }}</p>
      </div>
      <form novalidate @submit.prevent="userLogin">
        <div class="mb-3 position-relative form-floating">
          <input v-model="form.email" class="form-control" type="email" :placeholder="t('correo')" name="email" autocomplete="email" required>
          <label>{{ t("correo") }}</label>
          <div class="invalid-tooltip">
            {{ t("correo_incorrecto") }}
          </div>
        </div>
        <div class="mb-3 position-relative form-floating">
          <input v-model="form.password" class="form-control" type="password" :placeholder="t('password')" name="password" autocomplete="current-password" minlength="3" required>
          <label>{{ t("password") }}</label>
          <div class="invalid-tooltip">
            {{ t("password_limit") }}
          </div>
        </div>
        <div class="d-grid gap-2 mt-5 mt-auto">
          <button class="btn btn-primary" type="submit" role="button">{{ t("login") }}</button>
          <button class="btn btn-outline-dark d-flex align-items-center justify-content-center gap-2 text-decoration-none d-flex align-items-center gap-2" type="button" role="button" @click="googleLogin">
            <Icon name="google" size="sm" />
            <span>{{ t("google_login") }}</span>
          </button>
          <a class="text-primary my-2" role="button" @click="CAPACITOR.openBrowser(`${CONST.url}/cuenta?s=restaurar`)">{{ t("olvido_pass") }}</a>
          <NuxtLink class="btn btn-success" role="button" to="/registro/">{{ t("registrate") }}</NuxtLink>
          <button class="btn btn-secondary" type="button" role="button" @click="guestLogin">{{ t("no_registro") }}</button>
        </div>
      </form>
      <div class="mt-4 small">
        <i>{{ t("version") }}: {{ CONST.version }}</i>
      </div>
    </div>
    <ProgressDialog :message="t('iniciando_sesion')" />
  </section>
</template>
