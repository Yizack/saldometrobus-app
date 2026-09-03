<script setup lang="ts">
const auth = Auth();

const form = useFormState({
  email: "",
  password: ""
});

const validation = useFormValidation(form);

const showProgress = ref(false);

const googleLogin = async () => {
  showProgress.value = true;
  const result = await auth.googleLogin();
  showProgress.value = false;

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
  if (!validation.validate(loginForm)) return;

  showProgress.value = true;
  const { error, error_key } = await auth.login({
    email: form.value.email,
    password: form.value.password
  });
  showProgress.value = false;
  if (!error) {
    loginForm.classList.add("was-validated");
    navigateTo("/app/", { replace: true });
  }
  else {
    await CAPACITOR.showToast(t(error_key), "long");
    loginForm.classList.remove("was-validated");
  }

  validation.reset();
};

const guestLogin = async () => {
  await auth.guestLogin();
  navigateTo("/app/", { replace: true });
};
</script>

<template>
  <UMain class="py-10 space-y-2">
    <div class="text-center space-y-2 mb-6">
      <div class="flex items-center justify-center mb-2">
        <img class="shadow p-2.5 rounded-lg bg-default border border-default" width="90" height="90" src="/images/logo.webp">
      </div>
      <h1 class="font-bold text-2xl">{{ t("app_name") }}</h1>
    </div>
    <form novalidate @submit.prevent="userLogin">
      <div class="space-y-2 bg-elevated py-6 px-4 rounded-lg">
        <p class="text-center">{{ t("enter_email_password") }}</p>
        <ValidationTooltip :invalid="validation.invalidFields.email" :text="t('correo_incorrecto')">
          <InputFloating
            id="email"
            v-model="form.email"
            class="w-full"
            type="email"
            :placeholder="t('correo')"
            name="email"
            autocomplete="email"
            required
          />
        </ValidationTooltip>
        <ValidationTooltip :invalid="validation.invalidFields.password" :text="t('password_limit')">
          <InputFloating
            id="password"
            v-model="form.password"
            class="w-full"
            type="password"
            :placeholder="t('password')"
            name="password"
            autocomplete="current-password"
            minlength="3"
            required
          />
        </ValidationTooltip>
        <UButton
          type="submit"
          :label="t('login')"
          block
        />
        <UButton
          icon="google"
          color="neutral"
          :label="t('google_login')"
          variant="outline"
          block
          @click="googleLogin"
        />
      </div>
    </form>
    <div class="space-y-2 text-center">
      <ULink class="text-primary" @click="CAPACITOR.openBrowser(`${CONST.url}/cuenta?s=restaurar`)">{{ t("olvido_pass") }}</ULink>
      <UButton to="/registro/" :label="t('registrate')" block />
      <UButton color="secondary" :label="t('no_registro')" block @click="guestLogin" />
    </div>
    <div class="mt-4 text-sm text-muted text-center">
      <i>{{ t("version") }}: {{ CONST.version }}</i>
    </div>
    <ProgressDialog v-model="showProgress" :message="t('iniciando_sesion')" />
  </UMain>
</template>
