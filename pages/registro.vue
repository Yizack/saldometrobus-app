<script setup>
definePageMeta({ layout: "back", nav_title: "registrate" });
</script>

<template>
  <section>
    <div class="container-fluid text-center">
      <div class="py-2">
        <img class="img-fluid shadow-sm my-3 rounded bg-body" width="90" height="90" src="/images/logo2.webp">
        <p>{{ t("enter_account_info") }}</p>
      </div>
      <form ref="registro" novalidate @submit.prevent="registro()">
        <div class="mb-3 form-floating">
          <input class="form-control" :class="{ 'is-valid': isNombreValid }" type="text" :placeholder="t('nombre')" required @input="form.nombre = $event.target.value">
          <label>{{ t("nombre") }}</label>
        </div>
        <div class="mb-3 position-relative form-floating">
          <input ref="email" class="form-control" :class="{ 'is-valid': isEmailValid, 'is-invalid': form.error }" type="email" :placeholder="t('correo')" autocomplete="email" required @input="form.email = $event.target.value" @keyup="form.error = false">
          <label>{{ t("correo") }}</label>
          <div v-if="form.error" class="invalid-tooltip">
            {{ t("correo_existe") }}
          </div>
        </div>
        <div class="mb-3 form-floating">
          <input class="form-control" :class="{ 'is-valid': isPasswordValid }" type="password" :placeholder="t('password')" autocomplete="new-password" required @input="form.password = $event.target.value">
          <label>{{ t("password") }}</label>
        </div>
        <div class="mb-3 form-floating">
          <input class="form-control" :class="{ 'is-valid': isPasswordCheckValid }" type="password" :placeholder="t('password_check')" autocomplete="off" required @input="form.password_check = $event.target.value">
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

<script>
export default {
  name: "SignupPage",
  data () {
    return {
      form: {
        nombre: "",
        email: "",
        password: "",
        password_check: "",
        error: false
      }
    };
  },
  computed: {
    isNombreValid () {
      const nombre = this.form.nombre.trim();
      return nombre.length > 0 && nombre.length <= 50;
    },
    isPasswordValid () {
      return this.form.password.length >= 3;
    },
    isPasswordCheckValid () {
      return this.isPasswordValid && this.form.password === this.form.password_check;
    },
    isEmailValid () {
      const input = document.createElement("input");
      input.type = "email";
      input.required = true;
      input.value = this.form.email;
      return input.checkValidity();
    }
  },
  methods: {
    async registro () {
      if (this.isNombreValid && this.isEmailValid && this.isPasswordValid && this.isPasswordCheckValid) {
        showModal("progress-dialog");
        this.form.submitted = true;
        const { error, error_key } = await Auth().registro({
          nombre: this.form.nombre.trim(),
          email: this.form.email,
          password: this.form.password
        });
        await sleep(0.5);
        hideModal("progress-dialog");
        if (!error) {
          this.$router.replace("/app/");
        }
        else {
          if (error_key === "correo_existe") {
            this.form.error = true;
            const email_input = this.$refs.email;
            email_input.focus();
          }
          await CAPACITOR.showToast(t(error_key), "long");
        }
      }
    }
  }
};
</script>
