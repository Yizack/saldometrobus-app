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
  <div class="text-start absolute z-3 shadow mt-2 bg-default rounded-lg border border-accented px-5 p-4 text-xs space-y-2">
    <h4 class="text-sm">{{ t("pass_req") }}:</h4>
    <div class="space-y-1">
      <div class="flex items-center gap-2" :class="requirements.hasLength ? 'text-success' : 'text-muted'">
        <Icon :name="requirements.hasLength ? 'check' : 'chevron-right'" size="1.2rem" />
        <span>{{ t("pass_req_caracteres") }}</span>
      </div>
      <div class="flex items-center gap-2" :class="requirements.hasUppercase ? 'text-success' : 'text-muted'">
        <Icon :name="requirements.hasUppercase ? 'check' : 'chevron-right'" size="1.2rem" />
        <span>{{ t("pass_req_mayus") }} (A-Z)</span>
      </div>
      <div class="flex items-center gap-2" :class="requirements.hasLowercase ? 'text-success' : 'text-muted'">
        <Icon :name="requirements.hasLowercase ? 'check' : 'chevron-right'" size="1.2rem" />
        <span>{{ t("pass_req_minus") }} (a-z)</span>
      </div>
      <div class="flex items-center gap-2" :class="requirements.hasNumber ? 'text-success' : 'text-muted'">
        <Icon :name="requirements.hasNumber ? 'check' : 'chevron-right'" size="1.2rem" />
        <span>{{ t("pass_req_num") }} (0-9)</span>
      </div>
      <div class="flex items-center gap-2" :class="requirements.hasSpecial ? 'text-success' : 'text-muted'">
        <Icon :name="requirements.hasSpecial ? 'check' : 'chevron-right'" size="1.2rem" />
        <span>{{ t("pass_req_especial") }} (!@#$%^&*(),.?'":{}|&lt;&gt;)</span>
      </div>
    </div>
  </div>
</template>
