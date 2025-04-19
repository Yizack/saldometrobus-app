<script setup lang="ts">
const props = defineProps<{
  password: string;
}>();

const model = defineModel<boolean>({ required: true });

const requirements = computed(() => getPasswordRequirements(props.password));
const isValid = computed(() => isValidPassword(props.password, requirements.value));

watch(() => props.password, () => {
  model.value = isValid.value;
});
</script>

<template>
  <div class="text-start position-absolute z-3 shadow mt-2 bg-body-tertiary rounded border p-4 small">
    <h4 class="fs-6 fw-medium mb-2">{{ t("pass_req") }}:</h4>
    <div class="d-flex align-items-center gap-2" :class="requirements.hasLength ? 'text-success' : 'text-muted'">
      <Icon :name="requirements.hasLength ? 'check' : 'right_chevron'" />
      <span>{{ t("pass_req_caracteres") }}</span>
    </div>
    <div class="d-flex align-items-center gap-2" :class="requirements.hasUppercase ? 'text-success' : 'text-muted'">
      <Icon :name="requirements.hasUppercase ? 'check' : 'right_chevron'" />
      <span>{{ t("pass_req_mayus") }} (A-Z)</span>
    </div>
    <div class="d-flex align-items-center gap-2" :class="requirements.hasLowercase ? 'text-success' : 'text-muted'">
      <Icon :name="requirements.hasLowercase ? 'check' : 'right_chevron'" />
      <span>{{ t("pass_req_minus") }} (a-z)</span>
    </div>
    <div class="d-flex align-items-center gap-2" :class="requirements.hasNumber ? 'text-success' : 'text-muted'">
      <Icon :name="requirements.hasNumber ? 'check' : 'right_chevron'" />
      <span>{{ t("pass_req_num") }} (0-9)</span>
    </div>
    <div class="d-flex align-items-center gap-2" :class="requirements.hasSpecial ? 'text-success' : 'text-muted'">
      <Icon :name="requirements.hasSpecial ? 'check' : 'right_chevron'" />
      <span>{{ t("pass_req_special") }} (!@#$%^&*(),.?'":{}|&lt;&gt;)</span>
    </div>
  </div>
</template>
