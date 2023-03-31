<template>
  <div id="about" class="modal fade" tabindex="-1" aria-labelledby="aboutLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center p-3">
            <img class="img-fluid shadow-sm mb-3 p-2 rounded" width="90" height="90" src="/images/logo.webp">
            <div style="white-space: pre-wrap;">
              {{ STRINGS.get("about_message") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
