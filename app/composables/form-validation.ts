type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export const useFormValidation = <T extends Record<string, unknown>>(object: Ref<T>) => {
  const invalidFields = ref<Record<keyof T, boolean>>(
    Object.fromEntries(
      Object.keys(object.value).map(fieldName => [fieldName, false] as [keyof T, boolean])
    ) as Record<keyof T, boolean>
  );

  const updateField = (control: FormControl) => {
    if (Object.keys(object.value).includes(control.name)) {
      invalidFields.value[control.name] = !control.checkValidity();
    }
  };

  const validate = (form: HTMLFormElement) => {
    const isValid = form.checkValidity();
    for (const control of form.querySelectorAll<FormControl>("[name]")) {
      updateField(control);
    }
    return isValid;
  };

  const reset = () => {
    for (const fieldName of Object.keys(object.value)) {
      invalidFields.value[fieldName] = false;
    }
  };

  return {
    invalidFields: invalidFields.value,
    validate,
    reset
  };
};
