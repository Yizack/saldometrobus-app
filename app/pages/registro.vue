<script setup lang="ts">
definePageMeta({ layout: "back", nav_title: "registrate" });
const auth = Auth();

const form = useFormState({
  nombre: "",
  email: "",
  password: "",
  passwordCheck: "",
  error: false
});

const passwordFocus = ref(false);
const isValidPass = ref(false);
const isValidCheck = computed(() => isValidPasswordCheck(form.value.password, form.value.passwordCheck));
const showProgress = ref(false);

const email = useTemplateRef<HTMLInputElement>("email");

const googleRegistro = async () => {
  showProgress.value = true;
  const result = await auth.googleRegistro();
  showProgress.value = false;

  if (!result) return;
  const { error, error_key } = result;

  if (error) {
    await CAPACITOR.showToast(t(error_key), "long");
    return;
  }

  navigateTo("/app/", { replace: true });
};

const registro = async () => {
  if (!(isValidName(form.value.nombre) && isValidEmail(form.value.email) && isValidPass.value && isValidCheck.value)) return;
  showProgress.value = true;
  const { error, error_key } = await auth.registro({
    nombre: form.value.nombre,
    email: form.value.email,
    password: form.value.password
  });
  showProgress.value = false;
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
};
</script>

<template>
  <UMain class="py-10">
    <div class="text-center space-y-2 mb-6">
      <div class="flex items-center justify-center mb-2">
        <img class="shadow rounded-lg bg-default border border-default" width="90" height="90" src="/images/logo2.webp">
      </div>
      <p>{{ t("enter_account_info") }}</p>
    </div>
    <form novalidate @submit.prevent="registro">
      <div class="space-y-2 bg-elevated py-6 px-4 rounded-lg">
        <UFormField>
          <InputFloating
            id="nombre"
            v-model.trim="form.nombre"
            class="w-full"
            :placeholder="t('nombre')"
            name="nombre"
            autocomplete="name"
            required
          />
        </UFormField>
        <ValidationTooltip :invalid="form.error" :text=" t('correo_existe')">
          <InputFloating
            id="email"
            ref="email"
            v-model.trim="form.email"
            class="w-full"
            type="email"
            :placeholder="t('correo')"
            name="email"
            autocomplete="email"
            required
            @keyup="form.error = false"
          />
        </ValidationTooltip>
        <div class="relative">
          <ValidationTooltip :invalid="!isValidPass && !!form.password" :text="t('password_not_valid')">
            <InputFloating
              id="password"
              v-model="form.password"
              class="w-full"
              type="password"
              :placeholder="t('password')"
              name="password"
              autocomplete="new-password"
              required
              @focus="passwordFocus = true"
              @blur="passwordFocus = false"
            />
          </ValidationTooltip>
          <Transition name="tab" mode="out-in">
            <PasswordRequirements v-if="passwordFocus" v-model="isValidPass" :password="form.password" />
          </Transition>
        </div>
        <ValidationTooltip :invalid="!isValidCheck && (!!form.password || !!form.passwordCheck)" :text="t('password_check_error')">
          <InputFloating
            id="password-check"
            v-model="form.passwordCheck"
            class="w-full"
            type="password"
            :placeholder="t('password_check')"
            name="passwordCheck"
            autocomplete="off"
            required
          />
        </ValidationTooltip>
        <UButton
          type="submit"
          :label="t('registrate')"
          block
        />
        <div class="text-center text-muted">
          {{ t("or") }}
        </div>
        <UButton
          icon="google"
          color="neutral"
          :label="t('google_signup')"
          variant="outline"
          block
          @click="googleRegistro"
        />
      </div>
    </form>
    <div class="space-y-4 text-center mt-4">
      <p>{{ t("tiene_cuenta") }} <ULink class="text-primary" to="/">{{ t("ingresa") }}</ULink></p>
    </div>
    <ProgressDialog v-model="showProgress" :message="t('iniciando_sesion')" />
  </UMain>
</template>
