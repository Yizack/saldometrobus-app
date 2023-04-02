<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <div class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ STRINGS.get("nombre") }}</b></h4>
      <div class="m-2">
        <input :value="readonly.nombre" class="form-control" type="text" readonly>
      </div>
    </div>
    <div class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ STRINGS.get("correo") }}</b></h4>
      <div class="m-2">
        <input :value="readonly.email" class="form-control" type="text" readonly>
      </div>
    </div>
    <div class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ STRINGS.get("tarjetas_vinculadas") }}</b></h4>
      <div class="m-2">
        <p v-for="tarjeta in readonly.tarjetas" :key="tarjeta.numero" class="m-0"><Icon name="material-symbols:credit-card-outline" /> {{ tarjeta.numero }} ({{ tarjeta.nombre }})</p>
      </div>
    </div>
    <div v-if="!AUTH.isGuest" class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ STRINGS.get("password") }}</b></h4>
      <div class="m-2">
        <form novalidate @submit.prevent="updatePass()">
          <div class="mb-3 position-relative">
            <input ref="current" class="form-control" :class="{ 'is-invalid': form.error}" type="password" autocomplete="password" :placeholder="STRINGS.get('current_pass')" :value="form.current_password" required @input="form.current_password = $event.target.value" @keyup="form.error = false">
            <div class="invalid-tooltip">
              {{ STRINGS.get("pass_error") }}
            </div>
          </div>
          <div class="mb-3">
            <input class="form-control" :class="{'is-valid': isPasswordValid}" type="password" autocomplete="new-password" :placeholder="STRINGS.get('new_pass')" :value="form.new_password" required @input="form.new_password = $event.target.value">
          </div>
          <div class="mb-3">
            <input class="form-control" :class="{'is-valid': isPasswordCheckValid}" type="password" autocomplete="off" :placeholder="STRINGS.get('password_check')" :value="form.password_check" required @input="form.password_check = $event.target.value">
          </div>
          <div class="d-grid">
            <input class="btn btn-primary" type="submit" role="button" :value="STRINGS.get('change_pass')">
          </div>
        </form>
      </div>
    </div>
    <div v-if="AUTH.isGuest" class="text-center mt-3">
      <p class="small m-0"><small>{{ STRINGS.get("nota") }}</small></p>
    </div>
    <ProgressDialog :message="STRINGS.get('updating_pass')" />
  </section>
</template>

<script>
export default {
  data () {
    return {
      readonly: {
        nombre: AUTH.user.nombre,
        email: AUTH.user.email,
        tarjetas: []
      },
      form: {
        current_password: "",
        new_password: "",
        password_check: "",
        error: false
      }
    };
  },
  computed: {
    isPasswordValid () {
      return this.form.new_password.length >= 3 && this.form.current_password !== this.form.new_password && this.form.current_password.length > 0;
    },
    isPasswordCheckValid () {
      return this.isPasswordValid && this.form.new_password === this.form.password_check;
    }
  },
  async mounted () {
    this.readonly.tarjetas = await DB.getTarjetas();
  },
  methods: {
    async updatePass () {
      if (this.isPasswordValid && this.isPasswordCheckValid) {
        showModal("progress-dialog");
        const { error, error_key } = await API.userPassUpdate({
          current_password: await sha256(this.form.current_password),
          new_password: await sha256(this.form.new_password),
          email: AUTH.user.email,
          token: AUTH.user.token
        });
        if (!error) {
          await CAPACITOR.showToast(STRINGS.get("pass_updated"), "long");
          this.form = {
            current_password: "",
            new_password: "",
            password_check: ""
          };
        }
        else {
          if (error_key === "pass_error") {
            this.form.error = true;
            const current_input = this.$refs.current;
            current_input.focus();
          }
          await CAPACITOR.showToast(STRINGS.get(error_key), "long");
        }
      }
      await sleep(0.5);
      hideModal("progress-dialog");
    }
  }
};
</script>
