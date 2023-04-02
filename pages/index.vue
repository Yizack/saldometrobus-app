<template>
  <section>
    <div class="container-fluid text-center">
      <div class="my-5">
        <img class="img-fluid shadow-sm my-3 p-2 rounded" width="90" height="90" src="/images/logo.webp">
        <h1><b>{{ STRINGS.get("app_name") }}</b></h1>
        <p>{{ STRINGS.get("enter_email_password") }}</p>
      </div>
      <form ref="login" novalidate @submit.prevent="login()">
        <div class="mb-3 position-relative">
          <input v-model="form.email" class="form-control" type="email" :placeholder="STRINGS.get('correo')" name="email" autocomplete="email" required>
          <div class="invalid-tooltip">
            {{ STRINGS.get("correo_incorrecto") }}
          </div>
        </div>
        <div class="mb-3 position-relative">
          <input v-model="form.password" class="form-control" type="password" :placeholder="STRINGS.get('password')" name="password" autocomplete="current-password" minlength="3" required>
          <div class="invalid-tooltip">
            {{ STRINGS.get("password_limit") }}
          </div>
        </div>
        <div class="d-grid gap-2 mt-5 mt-auto">
          <input class="btn btn-primary mb-4" type="submit" role="button" :value="STRINGS.get('login')">
          <NuxtLink class="btn btn-success" role="button" to="/registro/">{{ STRINGS.get("registrate") }}</NuxtLink>
          <input class="btn btn-secondary" type="button" role="button" to="/app/" :value="STRINGS.get('no_registro')" @click="guestLogin()">
        </div>
      </form>
      <div class="mt-4 small">
        <i>{{ STRINGS.get("version") }}: {{ CONST.version }}</i>
      </div>
    </div>
    <ProgressDialog :message="STRINGS.get('iniciando_sesion')" />
  </section>
</template>

<script>
export default {
  name: "LoginPage",
  async beforeRouteEnter (to, from, next) {
    if (from.meta.layout === "main") {
      await DB.deleteAll();
      await AUTH.logout();
      document.body.removeAttribute("style");
    }
    await AUTH.restore();
    next();
  },
  data () {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  mounted () {
    if (AUTH.exists) {
      this.$router.replace("/app/");
    }
  },
  methods: {
    async login () {
      const form = this.$refs.login;
      if (form.checkValidity()) {
        showModal("progress-dialog");
        const { error, error_key } = await AUTH.login({
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
          await CAPACITOR.showToast(STRINGS.get(error_key), "long");
          form.classList.remove("was-validated");
        }
      }
      else {
        form.classList.add("was-validated");
      }
    },
    async guestLogin () {
      await AUTH.guestLogin();
      this.$router.replace("/app/");
    }
  }
};
</script>
