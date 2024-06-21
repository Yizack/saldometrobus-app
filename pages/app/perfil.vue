<script setup>
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <div class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ t("nombre") }}</b></h4>
      <div class="input-group p-2">
        <input ref="nombre" v-model="user.nombre" class="form-control py-2" type="text" readonly>
        <button v-if="!Auth().isGuest" class="btn btn-sm" :class="edit.nombre ? 'btn-success' : 'btn-primary'" :style="{ width: '3rem' }" @click="editName()">
          <Transition name="tab" mode="out-in">
            <Icon v-if="edit.nombre" name="check" />
            <Icon v-else name="edit" />
          </Transition>
        </button>
      </div>
    </div>
    <div class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ t("correo") }}</b></h4>
      <div class="m-2">
        <input :value="user.email" class="form-control py-2" type="text" readonly>
      </div>
    </div>
    <div class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ t("tarjetas_vinculadas") }}</b></h4>
      <div class="m-2">
        <template v-if="user.tarjetas.length">
          <div v-for="tarjeta in user.tarjetas" :key="tarjeta.numero" class="d-flex align-items-center">
            <Icon name="card" />
            <p class="ms-2 my-0">{{ tarjeta.numero }} ({{ tarjeta.nombre }})</p>
          </div>
        </template>
        <p v-else class="m-0">{{ t("no_tarjetas") }}</p>
      </div>
    </div>
    <div v-if="!Auth().isGuest" class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ t("password") }}</b></h4>
      <div class="m-2">
        <form novalidate @submit.prevent="updatePass()">
          <div class="mb-3 position-relative form-floating">
            <input ref="current" class="form-control" :class="{ 'is-invalid': form.error }" type="password" autocomplete="password" :placeholder="t('current_pass')" :value="form.current_password" required @input="form.current_password = $event.target.value" @keyup="form.error = false">
            <label>{{ t("current_pass") }}</label>
            <div class="invalid-tooltip">
              {{ t("pass_error") }}
            </div>
          </div>
          <div class="mb-3 form-floating">
            <input class="form-control" :class="{ 'is-valid': isPasswordValid }" type="password" autocomplete="new-password" :placeholder="t('new_pass')" :value="form.new_password" required @input="form.new_password = $event.target.value">
            <label>{{ t("new_pass") }}</label>
          </div>
          <div class="mb-3 form-floating">
            <input class="form-control" :class="{ 'is-valid': isPasswordCheckValid }" type="password" autocomplete="off" :placeholder="t('password_check')" :value="form.password_check" required @input="form.password_check = $event.target.value">
            <label>{{ t("password_check") }}</label>
          </div>
          <div class="d-grid">
            <button class="btn btn-primary" type="submit" role="button">{{ t("change_pass") }}</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="!Auth().isGuest" class="bg-body-tertiary border rounded p-2 shadow">
      <h4 class="text-primary-emphasis m-0"><b>{{ t("account_id") }}</b></h4>
      <div class="m-2">
        <input :value="user.token" class="form-control py-2" type="text" readonly @click="copyToken($event)">
      </div>
    </div>
    <div v-if="!Auth().isGuest" class="d-grid">
      <button class="btn btn-danger mt-2" @click="deleteAccount()">{{ t("delete_account") }}</button>
    </div>
    <div v-if="Auth().isGuest" class="text-center mt-3">
      <p class="small m-0"><small>{{ t("nota") }}</small></p>
    </div>
    <ProgressDialog :message="dialog" />
  </section>
</template>

<script>
export default {
  data () {
    return {
      dialog: "",
      edit: {
        nombre: false
      },
      user: {
        nombre: Auth().user.nombre,
        email: Auth().user.email,
        token: Auth().user.token,
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
    this.user.tarjetas = await DB.getTarjetas();
  },
  methods: {
    async editName () {
      this.edit.nombre = !this.edit.nombre;
      this.user.nombre = this.user.nombre.trim();
      const input = this.$refs.nombre;
      if (this.edit.nombre) {
        const end = this.user.nombre.length;
        input.setSelectionRange(end, end);
        input.focus();
        input.removeAttribute("readonly");
      }
      else {
        if (this.user.nombre !== Auth().user.nombre) {
          const { error, error_key } = await API.updateName({
            nombre: this.user.nombre,
            email: Auth().user.email,
            token: Auth().user.token
          });

          if (!error) {
            Auth().updateName(this.user.nombre);
            await CAPACITOR.showToast(t("name_updated"));
          }
          else {
            this.user.nombre = Auth().user.nombre;
            await CAPACITOR.showToast(t(error_key));
          }
        }
        input.setAttribute("readonly", true);
        input.blur();
      }
    },
    async updatePass () {
      if (this.isPasswordValid && this.isPasswordCheckValid) {
        this.dialog = t("updating_pass");
        showModal("progress-dialog");
        const { error, error_key } = await API.userPassUpdate({
          current_password: this.form.current_password,
          new_password: this.form.new_password,
          email: Auth().user.email,
          token: Auth().user.token
        });
        if (!error) {
          await CAPACITOR.showToast(t("pass_updated"), "long");
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
          await CAPACITOR.showToast(t(error_key), "long");
        }
      }
      await sleep(0.5);
      hideModal("progress-dialog");
    },
    copyToken (event) {
      const input = event.target;
      input.select();
      CAPACITOR.writeToClipboard(this.user.token);
    },
    async deleteAccount () {
      const confirm = await CAPACITOR.confirm(t("delete_account"), t("delete_account_sure"));
      if (confirm) {
        this.dialog = t("deleting_account");
        showModal("progress-dialog");
        const { error, error_key } = await API.deleteAccount({
          email: Auth().user.email,
          token: Auth().user.token
        });
        if (!error) {
          await DB.deleteAll();
          await Auth().logout();
          await CAPACITOR.showToast(t("account_deleted"));
          await sleep(0.5);
          hideModal("progress-dialog");
          this.$router.replace("/");
        }
        else {
          await CAPACITOR.showToast(t(error_key));
          await sleep(0.5);
          hideModal("progress-dialog");
        }
      }
    }
  }
};
</script>
