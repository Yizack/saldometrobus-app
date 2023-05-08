<template>
  <ul class="autocomplete-list position-absolute top-100 rounded-bottom border bg-body-tertiary py-2 px-0 shadow w-100 m-0">
    <template v-if="loading">
      <div class="text-center">
        <div class="spinner-border text-primary-emphasis spinner-border-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
    <template v-else>
      <li v-for="(result, index) in array" :key="index" role="button" class="py-2 px-3 hover border-bottom" @click="select(result)">
        {{ result[property] }}
      </li>
      <li role="button" class="py-2 px-3 hover border-bottom" @click="select({ label: `${text.trim()}, ${t('panama')}` })">{{ t("use") }}: <strong>{{ text }}</strong></li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    select: {
      type: Function,
      required: true
    },
    array: {
      type: Array,
      required: true
    },
    property: {
      type: String,
      required: true
    }
  }
};
</script>
