<template>
  <section>
    <div class="container-fluid text-center text-dark">
      <div class="my-5">
        <img width="100" height="100" src="/images/logo.png">
        <h1><b>{{ STRINGS.get("app_name") }}</b></h1>
        <p>{{ STRINGS.get("enter_email_password") }}</p>
      </div>
      <form ref="login_form">
        <div class="mb-3">
          <input v-model="form.email" class="form-control" type="email" :placeholder="STRINGS.get('correo')" required>
        </div>
        <div class="mb-3">
          <input v-model="form.password" class="form-control" type="password" :placeholder="STRINGS.get('password')" required>
        </div>
        <div class="d-grid gap-2 mt-5 mt-auto">
          <a class="btn btn-primary mb-4" role="button" @click="login()">{{ STRINGS.get("login") }}</a>
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
      this.$refs.login_form.reportValidity();
      if (this.$refs.login_form.checkValidity()) {
        const login_response = await AUTH.login({
          email: this.form.email,
          password: await sha256(this.form.password)
        });
        if (login_response) {
          await sleep(0.5);
          hideModal("progress-dialog");
          this.$router.push("/main/");
        }
      }
    }
  }
};
</script>
