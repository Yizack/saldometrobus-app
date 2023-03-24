<template>
  <section>
    <div class="container-fluid text-center text-dark">
      <div class="my-5">
        <img width="100" height="100" src="/images/logo.png">
        <h1><b>{{ STRINGS.get("app_name") }}</b></h1>
        <p>{{ STRINGS.get("enter_email_password") }}</p>
      </div>
      <form @submit.prevent="login()">
        <div class="mb-3">
          <input v-model="form.email" class="form-control" type="email" :placeholder="STRINGS.get('correo')" required>
        </div>
        <div class="mb-3">
          <input v-model="form.password" class="form-control" type="password" :placeholder="STRINGS.get('password')" required>
        </div>
        <div class="d-grid gap-2 mt-5 mt-auto">
          <input class="btn btn-primary mb-4" type="submit" role="button" :value="STRINGS.get('login')">
          <NuxtLink class="btn btn-success" role="button" to="/registro/">{{ STRINGS.get("registrate") }}</NuxtLink>
          <NuxtLink class="btn btn-secondary" role="button" to="/main/">{{ STRINGS.get("no_registro") }}</NuxtLink>
        </div>
      </form>
    </div>
    <ProgressDialog :message="STRINGS.get('iniciando_sesion')" />
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
      showModal("progress-dialog");
      const { error, error_key } = await AUTH.login({
        email: this.form.email,
        password: await sha256(this.form.password)
      });
      await sleep(0.5);
      hideModal("progress-dialog");
      if (!error) {
        this.$router.push("/main/");
      }
      else {
        CAPACITOR.showToast(STRINGS.get(error_key), "long");
      }
    }
  }
};
</script>
