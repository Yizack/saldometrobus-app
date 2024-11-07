<script setup lang="ts">
definePageMeta({ layout: "back", nav_title: "registrate" });
const auth = Auth();

const form = useFormState({
  nombre: "",
  email: "",
  password: "",
  password_check: "",
  error: false
});

const isNombreValid = computed(() => {
  const nombre = form.value.nombre;
  return nombre.length > 0 && nombre.length <= 50;
});

const isPasswordValid = computed(() => {
  return form.value.password.length >= 3;
});

const isPasswordCheckValid = computed(() => {
  return isPasswordValid.value && form.value.password === form.value.password_check;
});

const isEmailValid = computed(() => {
  const input = document.createElement("input");
  input.type = "email";
  input.required = true;
  input.value = form.value.email;
  return input.checkValidity();
});

const email = ref<HTMLInputElement>();
const registro = async () => {
  if (isNombreValid.value && isEmailValid.value && isPasswordValid.value && isPasswordCheckValid.value) {
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
      <form ref="registro" novalidate @submit.prevent="registro">
        <div class="mb-3 form-floating">
          <input v-model.trim="form.nombre" class="form-control" :class="{ 'is-valid': isNombreValid }" type="text" :placeholder="t('nombre')" required>
          <label>{{ t("nombre") }}</label>
        </div>
        <div class="mb-3 position-relative form-floating">
          <input ref="email" v-model.trim="form.email" class="form-control" :class="{ 'is-valid': isEmailValid, 'is-invalid': form.error }" type="email" :placeholder="t('correo')" autocomplete="email" required @keyup="form.error = false">
          <label>{{ t("correo") }}</label>
          <div v-if="form.error" class="invalid-tooltip">
            {{ t("correo_existe") }}
          </div>
        </div>
        <div class="mb-3 form-floating">
          <input v-model="form.password" class="form-control" :class="{ 'is-valid': isPasswordValid }" type="password" :placeholder="t('password')" autocomplete="new-password" required>
          <label>{{ t("password") }}</label>
        </div>
        <div class="mb-3 form-floating">
          <input v-model="form.password_check" class="form-control" :class="{ 'is-valid': isPasswordCheckValid }" type="password" :placeholder="t('password_check')" autocomplete="off" required>
          <label>{{ t("password_check") }}</label>
        </div>
        <div class="d-grid mt-4">
          <input class="btn btn-primary mb-4" type="submit" role="button" :value="t('registrate')">
        </div>
      </form>
      <p class="mb-3">{{ t("tiene_cuenta") }} <NuxtLink class="text-primary" to="/">{{ t("ingresa") }}</NuxtLink></p>
      <p class="mb-3"><small>{{ t("nota2") }}</small></p>
    </div>
    <ProgressDialog :message="t('iniciando_sesion')" />
  </section>
</template>
