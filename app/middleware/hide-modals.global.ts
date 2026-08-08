export default defineNuxtRouteMiddleware(() => {
  const modals = document.querySelectorAll(".modal");
  if (modals) {
    modals.forEach(({ id }) => {
      hideModal(id);
    });
  }
});
