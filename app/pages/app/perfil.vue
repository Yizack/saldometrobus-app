<script setup lang="ts">
definePageMeta({ layout: "main" });
const auth = Auth();

const progressTitle = ref("");
const showProgress = ref(false);
const edit = ref({
  nombre: false
});

const user = ref({
  nombre: auth.user.nombre,
  email: auth.user.email,
  token: auth.user.token,
  tarjetas: [] as SaldometrobusTarjeta[]
});

const form = useFormState({
  current_password: "",
  new_password: "",
  password_check: "",
  error: false
});

const passwordFocus = ref(false);
const isValidPass = ref(false);
const isValidCheck = computed(() => isValidPasswordCheck(form.value.new_password, form.value.password_check));

const nombreInput = useTemplateRef("nombre");
const editName = async () => {
  user.value.nombre = user.value.nombre.trim();
  if (!edit.value.nombre) {
    const end = user.value.nombre.length;
    edit.value.nombre = true;
    nextTick(() => {
      nombreInput.value?.inputRef?.setSelectionRange(end, end);
      nombreInput.value?.inputRef?.focus();
    });
  }
  else {
    if (user.value.nombre !== auth.user.nombre) {
      const { error, error_key } = await API.updateName({
        nombre: user.value.nombre,
        email: auth.user.email,
        token: auth.user.token || ""
      });

      if (!error) {
        auth.updateName(user.value.nombre);
        await CAPACITOR.showToast(t("name_updated"));
      }
      else {
        user.value.nombre = auth.user.nombre;
        await CAPACITOR.showToast(t(error_key));
      }
    }
    edit.value.nombre = false;
    nombreInput.value?.inputRef?.blur();
  }
};

const current = ref<HTMLInputElement>();
const updatePass = async () => {
  if (isValidPass.value && isValidCheck.value) {
    progressTitle.value = t("updating_pass");
    showProgress.value = true;
    const { error, error_key } = await API.userPassUpdate({
      current_password: form.value.current_password,
      new_password: form.value.new_password,
      email: auth.user.email,
      token: auth.user.token
    });
    if (!error) {
      await CAPACITOR.showToast(t("pass_updated"), "long");
      form.reset();
    }
    else {
      if (error_key === "pass_error") {
        form.value.error = true;
        current.value?.focus();
      }
      await CAPACITOR.showToast(t(error_key), "long");
    }
  }
  showProgress.value = false;
};

const copyToken = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement;
  input.select();
  CAPACITOR.writeToClipboard(user.value.token);
};

const deleteAccount = async () => {
  const confirm = await CAPACITOR.confirm(t("delete_account"), t("delete_account_sure"));
  if (confirm) {
    progressTitle.value = t("deleting_account");
    showProgress.value = true;
    const { error, error_key } = await API.deleteAccount({
      email: auth.user.email,
      token: auth.user.token
    });
    if (!error) {
      await DB.deleteAll();
      await auth.logout();
      await CAPACITOR.showToast(t("account_deleted"));
      showProgress.value = false;
      navigateTo("/", { replace: true });
    }
    else {
      await CAPACITOR.showToast(t(error_key));
      showProgress.value = false;
    }
  }
};

onMounted(async () => {
  user.value.tarjetas = await DB.getTarjetas();
});
</script>

<template>
  <UContainer class="py-2">
    <BoxComponent :title="t('perfil')">
      <UFieldGroup class="w-full">
        <UInput
          ref="nombre"
          v-model="user.nombre"
          :disabled="!edit.nombre"
        />
        <UButton
          v-if="!auth.isGuest"
          class="w-12"
          :color="edit.nombre ? 'success' : 'secondary'"
          @click="editName()"
        >
          <Transition name="tab" mode="out-in">
            <Icon v-if="edit.nombre" name="check" />
            <Icon v-else name="edit" />
          </Transition>
        </UButton>
      </UFieldGroup>
    </BoxComponent>
    <BoxComponent :title="t('correo')">
      <UInput
        :value="user.email"
        type="email"
        disabled
      />
    </BoxComponent>
    <BoxComponent :title="t('tarjetas_vinculadas')">
      <template v-if="user.tarjetas.length">
        <div v-for="tarjeta in user.tarjetas" :key="tarjeta.numero" class="flex items-center gap-4">
          <Icon name="card" />
          <p>{{ tarjeta.numero }} ({{ tarjeta.nombre }})</p>
        </div>
      </template>
      <p v-else>{{ t("no_tarjetas") }}</p>
    </BoxComponent>
    <BoxComponent v-if="!auth.isGuest" :title="t('password')">
      <form novalidate class="space-y-2" @submit.prevent="updatePass">
        <input type="text" class="hidden" name="email" :value="auth.user.email" autocomplete="email">
        <ValidationTooltip :invalid="form.error" :text="t('pass_error')">
          <InputFloating
            id="current-password"
            v-model="form.current_password"
            type="password"
            autocomplete="password"
            :placeholder="t('current_pass')"
            required
            name="current-password"
            @keyup="form.error = false"
          />
        </ValidationTooltip>
        <div class="relative">
          <ValidationTooltip :invalid="!isValidPass && !!form.new_password" :text="t('password_not_valid')">
            <InputFloating
              id="new-password"
              v-model="form.new_password"
              type="password"
              autocomplete="new-password"
              :placeholder="t('new_pass')"
              required
              name="new-password"
              @focus="passwordFocus = true"
              @blur="passwordFocus = false"
            />
          </ValidationTooltip>
          <Transition name="tab" mode="out-in">
            <PasswordRequirements v-if="passwordFocus" v-model="isValidPass" :password="form.new_password" />
          </Transition>
        </div>
        <ValidationTooltip :invalid="!isValidCheck && (!!form.new_password || !!form.password_check)" :text="t('password_check_error')">
          <InputFloating
            id="password-check"
            v-model="form.password_check"
            type="password"
            autocomplete="off"
            :placeholder="t('password_check')"
            name="password-check"
            required
          />
        </ValidationTooltip>
        <UButton
          class="btn btn-primary"
          type="submit"
          :label="t('change_pass')"
          block
        />
      </form>
    </BoxComponent>
    <BoxComponent v-if="!auth.isGuest" :title="t('account_id')">
      <UInput
        :value="user.token"
        readonly
        @click="copyToken($event)"
      />
    </BoxComponent>
    <div v-if="!auth.isGuest" class="d-grid">
      <UButton
        :label="t('delete_account')"
        color="error"
        block
        @click="deleteAccount"
      />
    </div>
    <div v-if="auth.isGuest" class="text-center mt-3">
      <p class="text-sm">{{ t("nota") }}</p>
    </div>
    <ProgressDialog v-model="showProgress" :message="progressTitle" />
  </UContainer>
</template>
