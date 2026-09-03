<script setup lang="ts">
definePageMeta({ layout: "main" });
</script>

<template>
  <UContainer class="py-2">
    <div class="border border-default rounded-lg p-2 mb-2 shadow">
      <h4 class="text-primary text-xl font-bold flex gap-2">
        <Icon class="text-error" name="donate" />
        <span>{{ t("donacion") }}</span>
      </h4>
      <div class="m-2">{{ t("donar_desc") }}</div>
    </div>
    <div class="donate-buttons space-y-2">
      <template v-for="(donate, name) in donate_options" :key="name">
        <div v-if="donate.external && 'link' in donate" class="donate-option rounded-lg shadow" :class="name" @click="CAPACITOR.openBrowser(donate.link)">
          <img :src="`/images/${name}.svg`">
        </div>
        <UModal v-else title="Banco General">
          <div class="donate-option rounded-lg shadow" :class="name" :data-bs-target="`#${name}`">
            <img :src="`/images/${name}.svg`">
          </div>
          <template #body>
            <div class="space-y-2">
              <p>{{ t("donar_bgeneral") }}</p>
              <div v-for="(field, key) in donate_options.bgeneral.info" :key="key">
                <InputFloating :id="`bgeneral-${key}`" :value="field" :placeholder="t(key)" readonly />
              </div>
              <UButton :label="t('copiar_n')" block @click="copyBgeneral()" />
            </div>
          </template>
        </UModal>
      </template>
    </div>
  </UContainer>
</template>

<script lang="ts">
export default {
  data () {
    return {
      donate_options: {
        bgeneral: {
          external: false,
          info: {
            nombre: CONST.dev.name,
            n_cuenta: CONST.dev.bgeneral.numero,
            tipo: CONST.dev.bgeneral.tipo
          }
        },
        paypal: {
          external: true,
          link: CONST.dev.paypal
        }
      }
    };
  },
  methods: {
    copyBgeneral () {
      CAPACITOR.writeToClipboard(this.donate_options.bgeneral.info.n_cuenta);
    }
  }
};
</script>

<style>
.paypal {
  background-color: #009cde;
  padding: 0.8rem;
}

.paypal:hover {
  background-color: #04a2e6;
}

.bgeneral {
  background-color: #005696;
  padding: 0.6rem;
}

.bgeneral:hover {
  background-color: #035b9e;
}

.donate-buttons .donate-option {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.donate-buttons img {
  width: 100%;
  max-height: 100%;
}
</style>
