<template>
  <ul class="absolute top-full z-20 max-h-75 w-full list-none overflow-y-auto rounded-b-lg border border-default bg-default px-0 py-2 shadow-lg">
    <template v-if="loading">
      <li class="flex justify-center px-3 py-2" role="status">
        <Icon name="spinner" class="animate-spin text-primary" size="1.5rem" />
        <span class="sr-only">Loading...</span>
      </li>
    </template>
    <template v-else>
      <li v-for="(result, index) in array" :key="index" role="button" class="cursor-pointer border-b border-default px-3 py-2 last:border-b-0 hover:bg-elevated" @click="select(result)">
        {{ result[prop] }} <template v-if="descprop">({{ result[descprop] }})</template>
      </li>
      <li v-if="text" role="button" class="cursor-pointer border-b border-default px-3 py-2 last:border-b-0 hover:bg-elevated" @click="selectText(text)">{{ t("use") }}: <strong>{{ text }}</strong></li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    text: {
      type: [String, Number],
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    array: {
      type: Array,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    descprop: {
      type: String,
      default: null
    }
  },
  emits: ["select"],
  methods: {
    select (result) {
      this.$emit("select", result);
    },
    selectText (text) {
      const obj = {};
      obj[this.prop] = String(text).trim();
      this.$emit("select", obj);
    }
  }
};
</script>
