<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

defineProps<{
  id: string;
  name?: string;
  type?: InputHTMLAttributes["type"];
  icon?: string;
  placeholder: string;
  autocomplete?: InputHTMLAttributes["autocomplete"];
  required?: boolean;
  value?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  modelModifiers?: {
    number?: boolean;
    trim?: boolean;
  };
}>();

const emit = defineEmits<{
  change: [string];
  focus: [FocusEvent];
  blur: [FocusEvent];
}>();

const [model, modifiers] = defineModel<string | number>();

const applyModifiers = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (modifiers.trim && typeof model.value === "string") {
    input.value = model.value.trim();
  }

  emit("change", input.value);
};
</script>

<template>
  <div class="form-input-floating w-full" :class="{ 'form-input-icon': icon }">
    <Icon v-if="icon" :name="icon" class="input-icon h-5 w-5 text-primary" />
    <input
      v-if="!value"
      :id="id"
      v-model="model"
      :name="name"
      :type="type || 'text'"
      placeholder=""
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      class="from-input peer"
      @change="applyModifiers"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
    <input
      v-else
      :id="id"
      :name="name"
      :value="value"
      :type="type || 'text'"
      placeholder=""
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      class="from-input peer"
      @change="applyModifiers"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
    <label :for="id" :class="{ 'pl-8': icon }">
      {{ placeholder }}
    </label>
  </div>
</template>
