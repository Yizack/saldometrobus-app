<script setup lang="ts">
definePageMeta({ layout: "main" });
</script>

<template>
  <section>
    <div class="bg-body-tertiary border rounded p-2 mb-2 shadow">
      <h4 class="text-primary-emphasis m-0"><Icon class="me-1 text-danger" name="donate" /><b>{{ t("donacion") }}</b></h4>
      <div class="m-2">{{ t("donar_desc") }}</div>
    </div>
    <div class="donate-buttons">
      <template v-for="(donate, name) in donate_options" :key="name">
        <div v-if="donate.external && 'link' in donate" class="donate-option rounded-pill shadow mb-2" :class="name" @click="CAPACITOR.openBrowser(donate.link)">
          <img class="img-fluid" :src="`/images/${name}.svg`">
        </div>
        <div v-else class="donate-option rounded-pill shadow mb-2" :class="name" data-bs-toggle="modal" :data-bs-target="`#${name}`">
          <img class="img-fluid" :src="`/images/${name}.svg`">
        </div>
      </template>
    </div>
    <div id="bgeneral" class="modal fade" tabindex="-1" aria-labelledby="bgeneralLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary-emphasis">
              <strong>Banco General</strong>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div class="modal-body">
            <p class="m-0">{{ t("donar_bgeneral") }}</p>
            <div class="my-3">
              <div v-for="(field, key) in donate_options.bgeneral.info" :key="key" class="form-floating mb-2">
                <input ref="bgeneral" type="text" class="form-control" :value="field" readonly>
                <label>{{ t(key) }}</label>
              </div>
            </div>
            <div class="d-grid">
              <button class="btn btn-primary" @click="copyBgeneral()">{{ t("copiar_n") }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      (this.$refs.bgeneral as HTMLInputElement[])[1]!.focus();
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
