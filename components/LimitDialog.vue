<template>
  <!-- Limit Dialog -->
  <div id="limit-dialog" class="modal fade" tabindex="-1" aria-labelledby="progress-dialog-label" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="progress-dialog-label" class="modal-title text-primary-emphasis">
            <strong>{{ t("limit_tittle") }}</strong>
          </h5>
        </div>
        <div class="modal-body">
          <p class="m-0">{{ t("limit_message") }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary w-100" type="button" data-bs-dismiss="modal">{{ t("entendido") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
