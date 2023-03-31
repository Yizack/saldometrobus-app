<template>
  <!-- Progress Dialog -->
  <div id="progress-dialog" class="modal modal-sm fade" tabindex="-1" aria-labelledby="progress-dialog-label" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="progress-dialog-label" class="modal-title fs-5 text-primary-emphasis">{{ message }}</h1>
        </div>
        <div class="modal-body text-center">
          <div class="spinner-border text-primary-emphasis" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressDialog",
  props: {
    message: {
      type: String,
      default: "Loading..."
    }
  }
};
</script>
