<template>
  <section>
    <div class="container-fluid text-center">
      <div class="py-4">
        <img class="img-fluid shadow-sm my-3 p-2 rounded bg-body" width="90" height="90" src="/images/logo.webp">
        <h1><b>{{ t("app_name") }}</b></h1>
        <p>{{ t("enter_email_password") }}</p>
      </div>
      <form ref="login" novalidate @submit.prevent="login()">
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
          <a class="text-primary my-2" role="button" @click="CAPACITOR.openBrowser(`${CONST.url}/cuenta?s=restaurar`)">{{ t("olvido_pass") }}</a>
          <NuxtLink class="btn btn-success" role="button" to="/registro/">{{ t("registrate") }}</NuxtLink>
          <button class="btn btn-secondary" type="button" role="button" @click="guestLogin()">{{ t("no_registro") }}</button>
        </div>
      </form>
      <div class="mt-4 small">
        <i>{{ t("version") }}: {{ CONST.version }}</i>
      </div>
    </div>
    <ProgressDialog :message="t('iniciando_sesion')" />
  </section>
</template>

<script>
export default {
  name: "LoginPage",
  data () {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login () {
      const form = this.$refs.login;
      if (form.checkValidity()) {
        showModal("progress-dialog");
        const { error, error_key } = await Auth().login({
          email: this.form.email,
          password: await sha256(this.form.password)
        });
        await sleep(0.5);
        hideModal("progress-dialog");
        if (!error) {
          form.classList.add("was-validated");
          this.$router.replace("/app/");
        }
        else {
          await CAPACITOR.showToast(t(error_key), "long");
          form.classList.remove("was-validated");
        }
      }
      else {
        form.classList.add("was-validated");
      }
    },
    async guestLogin () {
      await Auth().guestLogin();
      this.$router.replace("/app/");
    }
  }
};
</script>
